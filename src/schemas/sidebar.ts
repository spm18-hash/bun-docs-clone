import type { AstroBuiltinAttributes } from "astro";
import type { HTMLAttributes } from "astro/types";
import { z } from "astro/zod";

const linkHTMLAttributesSchema = z.record(
  z.union([z.string(), z.number(), z.boolean(), z.undefined(), z.null()]),
) as z.Schema<
  Omit<HTMLAttributes<"a">, keyof AstroBuiltinAttributes | "children">
>;

export type LinkHTMLAttributes = z.infer<typeof linkHTMLAttributesSchema>;
