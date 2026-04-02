import { atom } from "nanostores";

export const isSidebarOpen = atom(false);

export const sidebar = {
  open: () => isSidebarOpen.set(true),
  close: () => isSidebarOpen.set(false),
  toggle: () => isSidebarOpen.set(!isSidebarOpen.get()),
};
