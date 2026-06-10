import { z } from "zod";

export const lookupTableChangeSchema = z
  .object({
    id: z.string().min(1),
    mappedValue: z.string().optional(),
    mappedGroup: z.string().optional(),
    isActive: z.boolean().optional(),
    notes: z
      .string()
      .max(500, "Notes must be 500 characters or fewer")
      .optional(),
    lastKnownUpdatedAt: z.string().optional(),
  })
  .superRefine((change, ctx) => {
    if (change.isActive === true && !change.mappedValue?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["mappedValue"],
        message: "Mapped value is required for active rows",
      });
    }
  });

export const saveLookupTableChangesSchema = z.object({
  tableKey: z.string().min(1),
  changes: z.array(lookupTableChangeSchema).min(1),
});
