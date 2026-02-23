import type { Badge } from "@/schemas/badge";
import type { LinkHTMLAttributes } from "@/schemas/sidebar";

export interface SidebarLink {
  type: "link";
  label: string;
  href: string;
  isCurrent: boolean;
  badge: Badge | undefined;
  attrs: LinkHTMLAttributes;
}

export interface SidebarGroup {
  type: "group";
  label: string;
  entries: (SidebarLink | SidebarGroup)[];
  collapsed: boolean;
  badge: Badge | undefined;
}

export type SidebarEntry = SidebarLink | SidebarGroup;
