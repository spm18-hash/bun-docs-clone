import { z } from "astro/zod";

const badgeBaseSchema = z.object({
  variant: z
    .enum(["note", "danger", "success", "caution", "tip", "default"])
    .default("default"),
  class: z.string().optional(),
});

const badgeSchema = badgeBaseSchema.extend({
  text: z.string(),
});

export type Badge = z.output<typeof badgeSchema>;
