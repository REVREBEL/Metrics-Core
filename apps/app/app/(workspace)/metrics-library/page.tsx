import { DataLibraryWorkspace } from "../../../features/data-library/data-library-workspace";
import { listDataLibraryTableDefinitions } from "../../../features/data-library/registry";

export default function MetricsLibraryPage() {
  return (
    <DataLibraryWorkspace definitions={listDataLibraryTableDefinitions()} />
  );
}
