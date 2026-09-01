import { getRegistryItem, getRegistryItems } from "@lib/registry";
import { getPrompt } from "@lib/utils";
import { IconSquareRoundedArrowLeftFilled } from "@tabler/icons-react";

import { ComponentCard } from "@ui-registry";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getRegistryItems().map(({ name }) => ({
    name,
  }));
}

export default async function RegistryItemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const component = getRegistryItem(name);

  if (!component) {
    notFound();
  }
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            className="mb-4 inline-flex items-center rounded-md px-3 py-2 text-sm hover:bg-muted"
            href="/"
          >
            <IconSquareRoundedArrowLeftFilled className="mr-2 size-4" />
            Back to Home
          </Link>
          <h1 className="font-bold text-3xl tracking-tight">
            {component.title ?? component.name}
          </h1>
        </div>
      </div>

      <ComponentCard
        component={component}
        baseUrl={process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}
        prompt={getPrompt()}
        hasDemo={false}
      />

      <RegistryMetadataPanel metadata={component.metadata} />
    </div>
  );
}
