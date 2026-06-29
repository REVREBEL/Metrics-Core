import { ConfirmDialog } from "@/components/confirm-dialog";
import { showSubmittedData } from "@/lib/show-submitted-data";
import { TasksImportDialog } from "./tasks-import-dialog";
import { TasksMutateDrawer } from "./tasks-mutate-drawer";
import { useTasks } from "./tasks-provider";

export function TasksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useTasks();
  return (
    <>
      <TasksMutateDrawer
        key="task-create"
        open={open === "create"}
        onOpenChange={(nextOpen) => setOpen(nextOpen ? "create" : null)}
      />

      <TasksImportDialog
        key="tasks-import"
        open={open === "import"}
        onOpenChange={(nextOpen) => setOpen(nextOpen ? "import" : null)}
      />

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === "update"}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen ? "update" : null);
              if (!nextOpen) {
                setCurrentRow(null);
              }
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key="task-delete"
            destructive
            open={open === "delete"}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen ? "delete" : null);
              if (!nextOpen) {
                setCurrentRow(null);
              }
            }}
            handleConfirm={() => {
              setOpen(null);
              setCurrentRow(null);
              showSubmittedData(
                currentRow,
                "The following task has been deleted:",
              );
            }}
            className="max-w-md"
            title={`Delete this task: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{" "}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  );
}
