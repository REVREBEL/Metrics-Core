import { IconSquareRoundedArrowLeftFilled } from "@tabler/icons-react";
import Link from "next/link";

import tokenMetadata from "@/lib/registry.tokens.json";
import { cn } from "@/lib/utils";

type TokenType = "color" | "font" | "effect" | "value";

type Token = {
  name: string;
  value: string;
  source: string;
  type: TokenType;
};

type TokenGroup = {
  id: string;
  title: string;
  description: string;
  tokens: Token[];
};

type ColorFamily = {
  key: string;
  label: string;
  tokens: Token[];
};

function formatTokenName(name: string) {
  return name
    .replace(/^color-/, "")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function TokenPreview({ token }: { token: Token }) {
  if (token.type === "color") {
    return (
      <div
        className="size-12 rounded border shadow-sm"
        style={{ backgroundColor: token.value }}
      />
    );
  }

  if (token.type === "font") {
    return (
      <div
        className="flex size-12 items-center justify-center rounded border bg-card text-lg"
        style={{ fontFamily: `var(--${token.name})` }}
      >
        Aa
      </div>
    );
  }

  if (token.name.startsWith("shadow")) {
    return (
      <div
        className="size-12 rounded border bg-card"
        style={{ boxShadow: `var(--${token.name})` }}
      />
    );
  }

  return (
    <div className="flex size-12 items-center justify-center rounded border bg-muted text-muted-foreground text-xs">
      var
    </div>
  );
}

function TokenCard({ token }: { token: Token }) {
  return (
    <div className="flex min-w-0 items-center gap-4 rounded-lg border bg-card p-4">
      <TokenPreview token={token} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">
          {formatTokenName(token.name)}
        </div>
        <code className="block truncate font-mono text-muted-foreground text-xs">
          --{token.name}
        </code>
        <code className="mt-1 block truncate font-mono text-[11px] text-muted-foreground/80">
          {token.value}
        </code>
      </div>
    </div>
  );
}

function getColorFamilyKey(tokenName: string) {
  const match = tokenName.match(/^color-([a-z-]+)-(\d{2,3})$/);
  return match ? match[1] : null;
}

function getColorFamilies(tokens: Token[]): {
  families: ColorFamily[];
  singles: Token[];
} {
  const families = new Map<string, Token[]>();
  const singles: Token[] = [];

  for (const token of tokens) {
    const familyKey = getColorFamilyKey(token.name);

    if (!familyKey) {
      singles.push(token);
      continue;
    }

    const current = families.get(familyKey) ?? [];
    current.push(token);
    families.set(familyKey, current);
  }

  return {
    families: Array.from(families.entries())
      .map(([key, familyTokens]) => ({
        key,
        label: formatTokenName(`color-${key}`),
        tokens: familyTokens.sort((left, right) => {
          const leftShade = Number(left.name.split("-").pop() ?? 0);
          const rightShade = Number(right.name.split("-").pop() ?? 0);
          return leftShade - rightShade;
        }),
      }))
      .sort((left, right) => left.label.localeCompare(right.label)),
    singles,
  };
}

function ColorScaleCard({ family }: { family: ColorFamily }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h3 className="font-medium">{family.label}</h3>
          <p className="text-muted-foreground text-xs">
            {family.tokens.length}-step shade scale
          </p>
        </div>
        <span className="rounded-full border px-2 py-1 text-xs">
          {family.tokens.length} shades
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {family.tokens.map((token) => (
          <div key={token.name} className="rounded-lg border bg-background p-3">
            <div className="flex items-start gap-3">
              <div
                className="size-14 shrink-0 rounded-lg border shadow-sm"
                style={{ backgroundColor: token.value }}
              />
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {token.name.split("-").pop()}
                </div>
                <div className="mt-1 break-all text-sm font-medium leading-tight">
                  {token.name}
                </div>
                <code className="mt-1 block break-all font-mono text-[10px] text-muted-foreground">
                  {token.value}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FontSpecimenCard({ token }: { token: Token }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium">{formatTokenName(token.name)}</h3>
          <code className="mt-1 block font-mono text-xs text-muted-foreground">
            --{token.name}
          </code>
        </div>
        <span className="rounded-full border px-2 py-1 text-xs">
          Font token
        </span>
      </div>

      <div className="space-y-4">
        <div
          className="rounded-lg border bg-background p-4"
          style={{ fontFamily: `var(--${token.name})` }}
        >
          <div className="text-sm font-normal">400 Normal</div>
          <div className="mt-2 text-2xl font-medium">REVREBEL Registry</div>
          <div className="mt-2 text-base font-semibold">
            The quick brown fox jumps over the lazy dog.
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <div
            className="rounded-lg border bg-background p-3 text-sm"
            style={{ fontFamily: `var(--${token.name})`, fontWeight: 400 }}
          >
            16px / 400
          </div>
          <div
            className="rounded-lg border bg-background p-3 text-lg"
            style={{ fontFamily: `var(--${token.name})`, fontWeight: 500 }}
          >
            24px / 500
          </div>
          <div
            className="rounded-lg border bg-background p-3 text-2xl"
            style={{ fontFamily: `var(--${token.name})`, fontWeight: 700 }}
          >
            32px / 700
          </div>
        </div>
      </div>
    </div>
  );
}

function TokenSection({ group }: { group: TokenGroup }) {
  const isColorGroup = group.tokens.every((token) => token.type === "color");
  const isFontGroup = group.tokens.every((token) => token.type === "font");
  const colorFamilies = isColorGroup ? getColorFamilies(group.tokens) : null;

  return (
    <section className="mb-12" id={group.id}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-semibold text-xl">{group.title}</h2>
          <p className="mt-1 max-w-3xl text-muted-foreground">
            {group.description}
          </p>
        </div>
        <span className="rounded-full border px-3 py-1 text-muted-foreground text-xs">
          {group.tokens.length} tokens
        </span>
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          group.tokens.length > 8 && "md:grid-cols-2 xl:grid-cols-3",
        )}
      >
        {isColorGroup && colorFamilies ? (
          <>
            {colorFamilies.families.map((family) => (
              <ColorScaleCard key={family.key} family={family} />
            ))}
            {colorFamilies.singles.map((token) => (
              <TokenCard key={token.name} token={token} />
            ))}
          </>
        ) : isFontGroup ? (
          group.tokens.map((token) => (
            <FontSpecimenCard key={token.name} token={token} />
          ))
        ) : (
          group.tokens.map((token) => (
            <TokenCard key={token.name} token={token} />
          ))
        )}
      </div>
    </section>
  );
}

export default function TokensPage() {
  const groups = tokenMetadata.groups as TokenGroup[];
  const total = tokenMetadata.total;

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <Link
          className="mb-4 inline-flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
          href="/"
        >
          <IconSquareRoundedArrowLeftFilled className="mr-2 size-4" />
          Back to Home
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-bold text-3xl tracking-tight">Design Tokens</h1>
            <p className="mt-1 max-w-3xl text-muted-foreground">
              Live token catalog generated from the registry CSS sources,
              including Metrics segment, channel, social, and review tokens.
            </p>
          </div>
          <div className="rounded-lg border bg-card px-4 py-3 text-right">
            <div className="font-semibold text-2xl tabular-nums">{total}</div>
            <div className="text-muted-foreground text-xs">synced tokens</div>
          </div>
        </div>
      </div>

      <nav className="mb-10 flex flex-wrap gap-2">
        {groups.map((group) => (
          <a
            className="rounded-full border px-3 py-1.5 text-sm hover:bg-muted"
            href={`#${group.id}`}
            key={group.id}
          >
            {group.title}
          </a>
        ))}
      </nav>

      {groups.map((group) => (
        <TokenSection group={group} key={group.id} />
      ))}
    </div>
  );
}
