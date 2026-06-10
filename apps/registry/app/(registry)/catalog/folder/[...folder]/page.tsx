import { CatalogView } from "../../catalog-view";

export default async function CatalogFolderPage({
  params,
}: {
  params: Promise<{ folder: string[] }>;
}) {
  const { folder } = await params;

  return <CatalogView folderFilter={folder.join("/")} />;
}
