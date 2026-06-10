import { z } from "zod";

// Initiative schema from spec
export const initiativeSchema = z.object({
  id: z.string(),
  propertyId: z.string().optional(),
  propertyGroupId: z.string().optional(),
  meetingId: z.string().optional(),
  title: z.string(),
  strategyType: z.string(),
  objective: z.string().optional(),
  background: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]),
  status: z.enum([
    "discussed",
    "planning",
    "active",
    "blocked",
    "at_risk",
    "completed",
    "canceled",
    "archived",
  ]),
  targetLaunchDate: z.string().optional(),
  targetCompletionDate: z.string().optional(),
  bookingStartDate: z.string().optional(),
  bookingEndDate: z.string().optional(),
  stayStartDate: z.string().optional(),
  stayEndDate: z.string().optional(),
  leadDepartment: z.string().optional(),
  leadOwnerUserId: z.string().optional(),
  leadOwnerExternalAssigneeId: z.string().optional(),
  expectedImpact: z.string().optional(),
  ownerFacingSummary: z.string().optional(),
  risksBlockers: z.string().optional(),
  nextSteps: z.string().optional(),
  createdByUserId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Initiative = z.infer<typeof initiativeSchema> & {
  tasks?: Task[];
};

// Task schema from spec
export const taskSchema = z.object({
  id: z.string(),
  initiativeId: z.string(),
  workstreamId: z.string().optional(),
  parentTaskId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  status: z.enum([
    "not_started",
    "in_progress",
    "waiting",
    "blocked",
    "complete",
    "canceled",
  ]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  dueDate: z.string().optional(),
  completedAt: z.string().optional(),
  dependencyNotes: z.string().optional(),
  blockerNotes: z.string().optional(),
  ownerUpdate: z.string().optional(),
  internalNotes: z.string().optional(),
  externalUpdateEnabled: z.boolean(),
  reminderEnabled: z.boolean(),
  assignedTo: z.string().optional(),
  assignedDepartment: z.string().optional(),
  assigneeType: z
    .enum([
      "app_user",
      "external_assignee",
      "department_placeholder",
      "entity_placeholder",
    ])
    .optional(),
  createdByUserId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  // Additional display properties
  label: z.string().optional(),
  checklist: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        completed: z.boolean(),
      }),
    )
    .optional(),
});

export type Task = z.infer<typeof taskSchema>;

// External assignee schema for vendors/agencies tied to a property
export const externalAssigneeSchema = z.object({
  id: z.string(),
  propertyId: z.string().optional(),
  hotelId: z.string().optional(),
  name: z.string(),
  entityType: z.enum([
    "third_party_agency",
    "ownership",
    "vendor",
    "brand_corporate",
    "management_company",
    "hotel_team",
    "other",
  ]),
  contactEmail: z.string().optional(),
  createdAt: z.string(),
});

export type ExternalAssignee = z.infer<typeof externalAssigneeSchema>;

// Workstream schema from spec
export const workstreamSchema = z.object({
  id: z.string(),
  initiativeId: z.string(),
  responsibleEntityType: z.enum([
    "internal_department",
    "third_party_agency",
    "ownership",
    "vendor",
    "brand_corporate",
    "management_company",
    "hotel_team",
    "other",
  ]),
  responsibleEntityName: z.string(),
  ownerUserId: z.string().optional(),
  ownerExternalAssigneeId: z.string().optional(),
  ownerName: z.string().optional(),
  responsibilitySummary: z.string(),
  status: z.enum([
    "not_started",
    "in_progress",
    "waiting",
    "blocked",
    "complete",
  ]),
  dueDate: z.string().optional(),
  dependencies: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Workstream = z.infer<typeof workstreamSchema>;

// Meeting schema from spec
export const meetingSchema = z.object({
  id: z.string(),
  propertyId: z.string().optional(),
  propertyGroupId: z.string().optional(),
  meetingDate: z.string(),
  meetingType: z.string(),
  title: z.string().optional(),
  notes: z.string().optional(),
  createdByUserId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Meeting = z.infer<typeof meetingSchema>;
