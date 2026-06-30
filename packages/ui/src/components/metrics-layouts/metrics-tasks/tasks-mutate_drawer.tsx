"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconChevronDown, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectDropdown } from "@/components/select-dropdown";
import { Button } from "@buttons/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@forms/fields/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { showSubmittedData } from "@/lib/show-submitted-data";
import type { Task } from "../data/schema";

type TaskMutateDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow?: Task;
};

type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

const departmentTagOptions = [
  { label: "Revenue Management", value: "revenue_management" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Operations", value: "operations" },
  { label: "Front Office", value: "front_office" },
  { label: "Finance", value: "finance" },
  { label: "Digital Agency", value: "digital_agency" },
  { label: "Ownership", value: "ownership" },
];

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  status: z.string().min(1, "Please select a status."),
  label: z.string().min(1, "Please select a label."),
  priority: z.string().min(1, "Please choose a priority."),
  assignedTo: z.string().optional(),
  assignedDepartment: z.string().optional(),
  dueDate: z.string().optional(),
  checklist: z.array(
    z.object({
      id: z.string(),
      text: z.string().min(1),
      completed: z.boolean(),
    }),
  ),
});
type TaskForm = z.infer<typeof formSchema>;

function getFormDefaults(task?: Task): TaskForm {
  return {
    title: task?.title ?? "",
    status: task?.status ?? "",
    label: task?.label ?? "",
    priority: task?.priority ?? "",
    assignedTo: task?.assignedTo ?? "",
    assignedDepartment: task?.assignedDepartment ?? "",
    dueDate: task?.dueDate ?? "",
    checklist: task?.checklist ?? [],
  };
}

export function TasksMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: TaskMutateDrawerProps) {
  const isUpdate = !!currentRow;

  const form = useForm<TaskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: getFormDefaults(currentRow),
  });
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
    currentRow?.checklist ?? [],
  );
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [checklistOpen, setChecklistOpen] = useState(
    (currentRow?.checklist?.length ?? 0) > 0,
  );

  useEffect(() => {
    if (!open) return;
    const defaults = getFormDefaults(currentRow);
    form.reset(defaults);
    setChecklistItems(defaults.checklist);
    setChecklistOpen(defaults.checklist.length > 0);
    setNewChecklistItem("");
  }, [currentRow, open, form]);

  const syncChecklist = (next: ChecklistItem[]) => {
    setChecklistItems(next);
    form.setValue("checklist", next, { shouldDirty: true });
  };

  const addChecklistItem = () => {
    const text = newChecklistItem.trim();
    if (!text) return;
    const next = [
      ...checklistItems,
      { id: `item-${Date.now()}`, text, completed: false },
    ];
    syncChecklist(next);
    setNewChecklistItem("");
    setChecklistOpen(true);
  };

  const toggleChecklistItem = (id: string, completed: boolean) => {
    syncChecklist(
      checklistItems.map((item) =>
        item.id === id ? { ...item, completed } : item,
      ),
    );
  };

  const removeChecklistItem = (id: string) => {
    syncChecklist(checklistItems.filter((item) => item.id !== id));
  };

  const onSubmit = (data: TaskForm) => {
    // do something with the form data
    onOpenChange(false);
    showSubmittedData({ ...data, checklist: checklistItems });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          const defaults = getFormDefaults(currentRow);
          form.reset(defaults);
          setChecklistItems(defaults.checklist);
          setChecklistOpen(defaults.checklist.length > 0);
          setNewChecklistItem("");
        }
      }}
    >
      <DialogContent
        className="max-h-[90vh] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden p-0"
        style={{ width: "min(92vw, 760px)", maxWidth: "760px" }}
      >
        <DialogHeader className="px-6 pt-6 text-start">
          <DialogTitle>{isUpdate ? "Update" : "Create"} Task</DialogTitle>
          <DialogDescription>
            {isUpdate
              ? "Update the task by providing necessary info."
              : "Add a new task by providing necessary info."}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="min-h-0 overflow-y-auto px-6">
          <Form {...form}>
            <form
              id="tasks-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 pb-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter a title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      isControlled
                      placeholder="Select status"
                      items={[
                        { label: "Not Started", value: "not_started" },
                        { label: "In Progress", value: "in_progress" },
                        { label: "Waiting", value: "waiting" },
                        { label: "Blocked", value: "blocked" },
                        { label: "Complete", value: "complete" },
                        { label: "Canceled", value: "canceled" },
                      ]}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Member Assignment</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Assign to person, team, or owner"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assignedDepartment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department Tag</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      isControlled
                      placeholder="Select department tag"
                      items={departmentTagOptions}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="documentation" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Documentation
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="feature" />
                          </FormControl>
                          <FormLabel className="font-normal">Feature</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="bug" />
                          </FormControl>
                          <FormLabel className="font-normal">Bug</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Priority</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="high" />
                          </FormControl>
                          <FormLabel className="font-normal">High</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="medium" />
                          </FormControl>
                          <FormLabel className="font-normal">Medium</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="low" />
                          </FormControl>
                          <FormLabel className="font-normal">Low</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center">
                          <FormControl>
                            <RadioGroupItem value="critical" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Critical
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-3 rounded-md border p-3">
                <Collapsible
                  open={checklistOpen}
                  onOpenChange={setChecklistOpen}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full justify-between px-0"
                    >
                      <span className="text-sm font-medium">
                        Checklist (
                        {checklistItems.filter((i) => i.completed).length}/
                        {checklistItems.length})
                      </span>
                      <IconChevronDown size={20} stroke={1.5} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-2 pt-1">
                    {checklistItems.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        No checklist items yet.
                      </p>
                    ) : (
                      checklistItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={(checked) =>
                              toggleChecklistItem(item.id, checked === true)
                            }
                          />
                          <span className="flex-1 text-sm">{item.text}</span>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="size-7"
                            onClick={() => removeChecklistItem(item.id)}
                          >
                            <IconTrash size={20} stroke={1.5} />
                          </Button>
                        </div>
                      ))
                    )}
                  </CollapsibleContent>
                </Collapsible>
                <div className="flex items-center gap-2">
                  <Input
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    placeholder="Add checklist item"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addChecklistItem}
                  >
                    <IconPlus size={20} stroke={1.5} className="mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
        <DialogFooter className="gap-2 px-6 pb-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button form="tasks-form" type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
