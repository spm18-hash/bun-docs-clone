import navLabels from "@/content/nav/nav";
import type { NavKey } from "@/config/sidebar";
import type { StarlightIcon } from "@/components/Icons";

const RespectiveIcons: Partial<Record<NavKey, StarlightIcon>> = {
  "runtime.getStarted": "terminal",
  "runtime.coreRuntime": "cog",
  "runtime.File&ModuleSystem": "file",
  "runtime.httpServer": "server",
  "runtime.Networking": "globe",
  "runtime.data&Storage": "database",
  "runtime.concurrency": "split",
  "runtime.process&System": "computer",
  "runtime.interop&Tooling": "puzzle",
  "runtime.utilities": "wrench",
  "runtime.standards&Compatibility": "badge-check",
  "runtime.contributing": "heart",
  "packageManager.coreCommands": "terminal",
  "packageManager.publishing&Analysis": "upload",
  "packageManager.workspaceManagement": "folders",
  "packageManager.advancedConfiguration": "settings",
  "bundler.core": "package",
  "bundler.developmentServer": "monitor",
  "bundler.assetProcessing": "image",
  "bundler.singleFileExecutable": "binary",
  "bundler.extensions": "plug",
  "bundler.optimization": "zap",
  "bundler.migration": "arrow-right",
  "testRunner.gettingStarted": "circle-play",
  "testRunner.testExecution": "zap",
  "testRunner.testFeatures": "sparkles",
  "testRunner.specializedTesting": "microscope",
  "testRunner.reporting": "file-text",
};

export function getGroupIcon(label: string): StarlightIcon {
  const navKey = (Object.keys(navLabels) as Array<keyof typeof navLabels>).find(
    (key) => {
      return navLabels[key] === label;
    },
  );

  if (navKey && RespectiveIcons[navKey]) {
    return RespectiveIcons[navKey];
  }

  return "globe";
}
