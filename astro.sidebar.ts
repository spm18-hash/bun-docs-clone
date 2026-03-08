import type { StarlightUserConfig } from "@astrojs/starlight/types";
import { group } from "./src/config/sidebar";

export const sidebar: StarlightUserConfig["sidebar"] = [
  // Runtime tab
  group("runtime", {
    items: [
      group("runtime.getStarted", {
        items: [
          "index",
          "get-started/installation",
          "get-started/quickstart",
          "get-started/typescript",
          "get-started/templating/init",
          "get-started/templating/create",
        ],
      }),
      group("runtime.coreRuntime", {
        autogenerate: { directory: "runtime/core-runtime" },
      }),
      group("runtime.File&ModuleSystem", {
        autogenerate: { directory: "runtime/file-module-system" },
      }),
      group("runtime.httpServer", {
        autogenerate: { directory: "runtime/http-server" },
      }),
      group("runtime.Networking", {
        autogenerate: { directory: "runtime/networking" },
      }),
      group("runtime.data&Storage", {
        autogenerate: { directory: "runtime/data-storage" },
      }),
      group("runtime.concurrency", {
        autogenerate: { directory: "runtime/concurrency" },
      }),
      group("runtime.process&System", {
        autogenerate: { directory: "runtime/process-system" },
      }),
      group("runtime.interop&Tooling", {
        autogenerate: { directory: "runtime/interop-tooling" },
      }),
      group("runtime.utilities", {
        autogenerate: { directory: "runtime/utilities" },
      }),
      group("runtime.standards&Compatibility", {
        autogenerate: { directory: "runtime/standards-compatibility" },
      }),
      group("runtime.contributing", {
        autogenerate: { directory: "runtime/contributing" },
      }),
    ],
  }),

  // Package Manager tab
  group("packageManager", {
    items: [
      group("packageManager.coreCommands", {
        autogenerate: { directory: "package-manager/core-commands" },
      }),
      group("packageManager.publishing&Analysis", {
        autogenerate: { directory: "package-manager/publishing-analysis" },
      }),
      group("packageManager.workspaceManagement", {
        autogenerate: { directory: "package-manager/workspace-management" },
      }),
      group("packageManager.advancedConfiguration", {
        autogenerate: { directory: "package-manager/advanced-configuration" },
      }),
    ],
  }),

  // Bundler tab
  group("bundler", {
    items: [
      group("bundler.core", {
        autogenerate: { directory: "bundler/core" },
      }),
      group("bundler.developmentServer", {
        autogenerate: { directory: "bundler/development-server" },
      }),
      group("bundler.assetProcessing", {
        autogenerate: { directory: "bundler/asset-processing" },
      }),
      group("bundler.singleFileExecutable", {
        autogenerate: { directory: "bundler/single-file-executable" },
      }),
      group("bundler.extensions", {
        autogenerate: { directory: "bundler/extensions" },
      }),
      group("bundler.optimization", {
        autogenerate: { directory: "bundler/optimization" },
      }),
      group("bundler.migration", {
        autogenerate: { directory: "bundler/migration" },
      }),
    ],
  }),

  // Test runner tab
  group("testRunner", {
    items: [
      group("testRunner.gettingStarted", {
        autogenerate: { directory: "test-runner/getting-started" },
      }),
      group("testRunner.testExecution", {
        autogenerate: { directory: "test-runner/test-execution" },
      }),
      group("testRunner.testFeatures", {
        autogenerate: { directory: "test-runner/test-features" },
      }),
      group("testRunner.specializedTesting", {
        autogenerate: { directory: "test-runner/specialized-testing" },
      }),
      group("testRunner.reporting", {
        autogenerate: { directory: "test-runner/reporting" },
      }),
    ],
  }),
];
