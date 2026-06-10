"use client";

import React, { useCallback, useEffect, useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import {
  createExternalAssigneeAction,
  deleteExternalAssigneeAction,
  listExternalAssigneesAction,
  rowToAssignee,
  updateExternalAssigneeAction,
} from "../actions";
import type { ExternalAssignee, Task, Workstream } from "../data/schema";
import {
  externalAssignees as mockExternalAssignees,
  workstreams as mockWorkstreams,
} from "../data/tasks";

type TasksDialogType = "create" | "update" | "delete" | "import";

type TasksContextType = {
  open: TasksDialogType | null;
  setOpen: (str: TasksDialogType | null) => void;
  currentRow: Task | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Task | null>>;
  hotelId: string | null;
  externalAssignees: ExternalAssignee[];
  isLoadingAssignees: boolean;
  addExternalAssignee: (
    assignee: Omit<ExternalAssignee, "id" | "createdAt">,
  ) => Promise<{ ok: boolean; message: string }>;
  updateExternalAssignee: (
    id: string,
    assignee: Partial<ExternalAssignee>,
  ) => Promise<{ ok: boolean; message: string }>;
  deleteExternalAssignee: (id: string) => Promise<void>;
  workstreams: Workstream[];
  addWorkstream: (
    workstream: Omit<Workstream, "id" | "createdAt" | "updatedAt">,
  ) => void;
};

const TasksContext = React.createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<TasksDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Task | null>(null);
  const hotelId = null;
  const isResolvingProperty = false;

  const [workstreams, setWorkstreams] = useState<Workstream[]>(mockWorkstreams);
  const [externalAssignees, setExternalAssignees] = useState<
    ExternalAssignee[]
  >([]);
  const [isLoadingAssignees, setIsLoadingAssignees] = useState(true);

  const addWorkstream = useCallback(
    (workstream: Omit<Workstream, "id" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const newWorkstream: Workstream = {
        ...workstream,
        id: `ws-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      setWorkstreams((prev) => [...prev, newWorkstream]);
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadAssignees() {
      setIsLoadingAssignees(true);

      if (hotelId) {
        try {
          const rows = await listExternalAssigneesAction(hotelId);
          if (!cancelled) {
            setExternalAssignees(rows.map(rowToAssignee));
          }
        } catch {
          if (!cancelled) {
            setExternalAssignees([]);
          }
        }
      } else if (!isResolvingProperty) {
        if (!cancelled) {
          setExternalAssignees(mockExternalAssignees);
        }
      }

      if (!cancelled) {
        setIsLoadingAssignees(false);
      }
    }

    if (!isResolvingProperty) {
      void loadAssignees();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const addExternalAssignee = useCallback(
    async (
      assignee: Omit<ExternalAssignee, "id" | "createdAt">,
    ): Promise<{ ok: boolean; message: string }> => {
      if (hotelId) {
        const result = await createExternalAssigneeAction({
          hotelId,
          name: assignee.name,
          entityType: assignee.entityType,
          contactEmail: assignee.contactEmail,
        });
        if (result.ok && result.data) {
          const data = result.data;
          setExternalAssignees((prev) => [...prev, rowToAssignee(data)]);
        }
        return { ok: result.ok, message: result.message };
      }

      const newAssignee: ExternalAssignee = {
        ...assignee,
        id: `ext-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setExternalAssignees((prev) => [...prev, newAssignee]);
      return { ok: true, message: "Added (offline mode)." };
    },
    [],
  );

  const updateExternalAssignee = useCallback(
    async (
      id: string,
      updates: Partial<ExternalAssignee>,
    ): Promise<{ ok: boolean; message: string }> => {
      if (hotelId) {
        const current = externalAssignees.find((a) => a.id === id);
        if (!current) return { ok: false, message: "Record not found." };

        const result = await updateExternalAssigneeAction({
          id,
          hotelId,
          name: updates.name ?? current.name,
          entityType: updates.entityType ?? current.entityType,
          contactEmail: updates.contactEmail ?? current.contactEmail,
        });
        if (result.ok && result.data) {
          const data = result.data;
          setExternalAssignees((prev) =>
            prev.map((a) => (a.id === id ? rowToAssignee(data) : a)),
          );
        }
        return { ok: result.ok, message: result.message };
      }

      setExternalAssignees((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
      );
      return { ok: true, message: "Updated (offline mode)." };
    },
    [externalAssignees],
  );

  const deleteExternalAssignee = useCallback(
    async (id: string): Promise<void> => {
      if (hotelId) {
        await deleteExternalAssigneeAction(id, hotelId);
      }
      setExternalAssignees((prev) => prev.filter((a) => a.id !== id));
    },
    [],
  );

  return (
    <TasksContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        hotelId,
        externalAssignees,
        isLoadingAssignees,
        addExternalAssignee,
        updateExternalAssignee,
        deleteExternalAssignee,
        workstreams,
        addWorkstream,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const tasksContext = React.useContext(TasksContext);

  if (!tasksContext) {
    throw new Error("useTasks has to be used within <TasksContext>");
  }

  return tasksContext;
};
