"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SelectDropdown } from "@/components/select-dropdown";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { Workstream } from "../data/schema";
import { useTasks } from "./tasks-provider";

type WorkstreamMutateDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initiativeId?: string | null;
};

const formSchema = z.object({
  responsibleEntityName: z.string().min(1, "Entity name is required."),
  responsibleEntityType: z.string().min(1, "Please select an entity type."),
  responsibilitySummary: z
    .string()
    .min(1, "Responsibility summary is required."),
  status: z.string().min(1, "Please select a status."),
  dueDate: z.string().optional(),
  ownerType: z.enum(["app_user", "external_assignee", "none", ""]).optional(),
  ownerExternalAssigneeId: z.string().optional(),
  ownerName: z.string().optional(),
  notes: z.string().optional(),
});

type WorkstreamForm = z.infer<typeof formSchema>;

const entityTypeOptions = [
  { label: "Internal Department", value: "internal_department" },
  { label: "Third-Party Agency", value: "third_party_agency" },
  { label: "Ownership", value: "ownership" },
  { label: "Vendor", value: "vendor" },
  { label: "Brand / Corporate", value: "brand_corporate" },
  { label: "Management Company", value: "management_company" },
  { label: "Hotel Team", value: "hotel_team" },
  { label: "Other", value: "other" },
];

const statusOptions = [
  { label: "Not Started", value: "not_started" },
  { label: "In Progress", value: "in_progress" },
  { label: "Waiting", value: "waiting" },
  { label: "Blocked", value: "blocked" },
  { label: "Complete", value: "complete" },
];

export function WorkstreamMutateDrawer({
  open,
  onOpenChange,
  initiativeId,
}: WorkstreamMutateDrawerProps) {
  const { externalAssignees, addWorkstream } = useTasks();

  const form = useForm<WorkstreamForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responsibleEntityName: "",
      responsibleEntityType: "",
      responsibilitySummary: "",
      status: "not_started",
      dueDate: "",
      ownerType: "",
      ownerExternalAssigneeId: "",
      ownerName: "",
      notes: "",
    },
  });

  const ownerType = form.watch("ownerType");

  const externalAssigneeItems = externalAssignees.map((a) => ({
    label: a.name,
    value: a.id,
  }));

  const onSubmit = (data: WorkstreamForm) => {
    if (!initiativeId) return;

    addWorkstream({
      initiativeId,
      responsibleEntityType:
        data.responsibleEntityType as Workstream["responsibleEntityType"],
      responsibleEntityName: data.responsibleEntityName,
      responsibilitySummary: data.responsibilitySummary,
      status: data.status as Workstream["status"],
      dueDate: data.dueDate || undefined,
      ownerExternalAssigneeId:
        data.ownerType === "external_assignee"
          ? data.ownerExternalAssigneeId || undefined
          : undefined,
      ownerUserId:
        data.ownerType === "app_user" ? data.ownerName || undefined : undefined,
      ownerName:
        data.ownerType === "app_user" ? data.ownerName || undefined : undefined,
      notes: data.notes || undefined,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        form.reset();
      }}
    >
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="text-start">
          <SheetTitle>Add Workstream</SheetTitle>
          <SheetDescription>
            Define a workstream and assign it to an internal team or external
            vendor / agency. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id="workstream-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 space-y-5 overflow-y-auto px-4"
          >
            <FormField
              control={form.control}
              name="responsibleEntityName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Digital Marketing Team"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibleEntityType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity Type</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select entity type"
                    items={entityTypeOptions}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibilitySummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibility Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe what this workstream is responsible for..."
                      rows={3}
                    />
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
                    placeholder="Select status"
                    items={statusOptions}
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
                  <FormLabel>Due Date (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Owner Assignment */}
            <div className="space-y-3 border-t pt-4">
              <p className="text-sm font-medium">Owner Assignment</p>

              <FormField
                control={form.control}
                name="ownerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Type</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value ?? ""}
                      onValueChange={(val) => {
                        field.onChange(val);
                        form.setValue("ownerExternalAssigneeId", "");
                        form.setValue("ownerName", "");
                      }}
                      placeholder="Select owner type (optional)"
                      items={[
                        { label: "App User", value: "app_user" },
                        {
                          label: "External Vendor / Agency",
                          value: "external_assignee",
                        },
                        { label: "No specific owner", value: "none" },
                      ]}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {ownerType === "external_assignee" && (
                <FormField
                  control={form.control}
                  name="ownerExternalAssigneeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vendor / Agency</FormLabel>
                      {externalAssigneeItems.length > 0 ? (
                        <SelectDropdown
                          defaultValue={field.value ?? ""}
                          onValueChange={field.onChange}
                          placeholder="Select a vendor or agency"
                          items={externalAssigneeItems}
                        />
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          No vendors or agencies registered yet. Use Manage
                          Vendors to add some first.
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {ownerType === "app_user" && (
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Jane Smith" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Any additional context or notes..."
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="gap-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button form="workstream-form" type="submit" disabled={!initiativeId}>
            Save Workstream
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
