import type { StarlightUserConfig } from "@astrojs/starlight/types";

import navLabels from "../content/nav/nav";

type NavKey = keyof typeof navLabels;

type StarlightSidebarConfig = NonNullable<StarlightUserConfig["sidebar"]>;
type StarlightSidebarEntry = StarlightSidebarConfig[number];

type StarlightManualSidebarGroup = Extract<
  StarlightSidebarEntry,
  { items: unknown[] }
>;
type StarlightAutoSidebarGroup = Extract<
  StarlightSidebarEntry,
  { autogenerate: unknown }
>;

export function group(
  key: NavKey,
  group:
    | Omit<StarlightManualSidebarGroup, "label">
    | Omit<StarlightAutoSidebarGroup, "label">,
): StarlightManualSidebarGroup | StarlightAutoSidebarGroup {
  return { label: navLabels[key], ...group };
}
