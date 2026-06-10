export async function generateStaticParams() {
  return [];
}

export default async function DemoPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return (
    <div className="flex h-screen w-full items-center justify-center bg-card p-6">
      <div className="max-w-md rounded-lg border bg-background p-6 text-center">
        <h1 className="font-semibold text-lg">Demo preview unavailable</h1>
        <p className="mt-2 text-muted-foreground text-sm">
          The <code>{name}</code> demo route is temporarily metadata-only while
          registry demos are normalized away from broad source barrels.
        </p>
      </div>
    </div>
  );
}
