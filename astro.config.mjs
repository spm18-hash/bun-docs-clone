// @ts-check
import starlight from "@astrojs/starlight";
import { defineConfig, fontProviders } from "astro/config";

const SITE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bun-docs-clone.pages.dev"
    : "http://localhost:4321";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  build: { inlineStylesheets: "always" },
  trailingSlash: "always",
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        cssVariable: "--font-geist",
        name: "Geist",
        styles: ["normal"],
        weights: [400, 500, 600],
      },
      {
        provider: fontProviders.google(),
        cssVariable: "--font-geist-mono",
        name: "Geist Mono",
        weights: [400, 500],
      },
    ],
  },
  integrations: [
    starlight({
      title: "My Docs",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      customCss: ["./src/styles/globals.css"],
      expressiveCode: {
        themes: ["dracula", "github-light-default"],
        styleOverrides: {
          codeFontSize: "0.9em",
          frames: {
            terminalTitlebarBackground: "red",
            inlineButtonBackgroundHoverOrFocusOpacity:
              "0.05" /* CSS line 121 */,
          },
        },
      },
      sidebar: [
        {
          label: "Runtime",
          items: [
            // Each item here is one entry in the navigation menu.
            {
              label: "Get Started",
              items: [
                { label: "Welcome to Bun", slug: "" },
                { label: "Installation", slug: "get-started/installation" },
                { label: "Quickstart", slug: "get-started/quickstart" },
                { label: "TypeScript", slug: "get-started/typescript" },
                { label: "bun init", slug: "get-started/templating/init" },
                { label: "bun create", slug: "get-started/templating/create" },
              ],
            },
            {
              label: "Core Runtime",
              items: [
                {
                  label: "Bun Runtime",
                  slug: "runtime/core-runtime/bun-runtime",
                },
                {
                  label: "Watch Mode",
                  slug: "runtime/core-runtime/watch-mode",
                },
                { label: "Debugging", slug: "runtime/core-runtime/debugging" },
                { label: "bunfig.toml", slug: "runtime/core-runtime/bunfig" },
              ],
            },
            {
              label: "File & Module System",
              items: [
                {
                  label: "File Types",
                  slug: "runtime/file-module-system/file-types",
                },
                {
                  label: "Module Resolution",
                  slug: "runtime/file-module-system/module-resolution",
                },
                { label: "JSX", slug: "runtime/file-module-system/jsx" },
                {
                  label: "Auto-install",
                  slug: "runtime/file-module-system/auto-install",
                },
                {
                  label: "Plugins",
                  slug: "runtime/file-module-system/plugins",
                },
                {
                  label: "File System Router",
                  slug: "runtime/file-module-system/file-system-router",
                },
              ],
            },
            {
              label: "HTTP server",
              items: [
                { label: "Server", slug: "runtime/http-server/server" },
                { label: "Routing", slug: "runtime/http-server/routing" },
                { label: "TLS", slug: "runtime/http-server/tls" },
                {
                  label: "Error Handling",
                  slug: "runtime/http-server/error-handling",
                },
                { label: "Metrics", slug: "runtime/http-server/metrics" },
              ],
            },
            {
              label: "Networking",
              items: [
                { label: "Fetch", slug: "runtime/networking/fetch" },
                { label: "WebSocket", slug: "runtime/networking/websocket" },
                { label: "TCP", slug: "runtime/networking/tcp" },
                { label: "UDP", slug: "runtime/networking/udp" },
                { label: "DNS", slug: "runtime/networking/dns" },
              ],
            },
            {
              label: "Data & Storage",
              items: [
                { label: "Cookies", slug: "runtime/data-storage/cookies" },
                { label: "File I/O", slug: "runtime/data-storage/file-io" },
                { label: "Streams", slug: "runtime/data-storage/streams" },
                {
                  label: "Binary Data",
                  slug: "runtime/data-storage/binary-data",
                },
                { label: "Archive", slug: "runtime/data-storage/archive" },
                { label: "SQL", slug: "runtime/data-storage/sql" },
                { label: "SQLite", slug: "runtime/data-storage/sqlite" },
                { label: "S3", slug: "runtime/data-storage/s3" },
                { label: "Redis", slug: "runtime/data-storage/redis" },
              ],
            },
            {
              label: "Concurrency",
              items: [
                { label: "Workers", slug: "runtime/concurrency/workers" },
                { label: "Threads", slug: "runtime/concurrency/threads" },
              ],
            },
            {
              label: "Process & System",
              items: [
                {
                  label: "Environment Variables",
                  slug: "runtime/process-system/environment-variables",
                },
                { label: "Shell", slug: "runtime/process-system/shell" },
                { label: "Spawn", slug: "runtime/process-system/spawn" },
              ],
            },
            {
              label: "Interop & Tooling",
              items: [
                { label: "Node-API", slug: "runtime/interop-tooling/node-api" },
                { label: "FFI", slug: "runtime/interop-tooling/ffi" },
                {
                  label: "C Compiler",
                  slug: "runtime/interop-tooling/c-compiler",
                },
                {
                  label: "Transpiler",
                  slug: "runtime/interop-tooling/transpiler",
                },
              ],
            },
            {
              label: "Utilities",
              items: [
                { label: "Secrets", slug: "runtime/utilities/secrets" },
                { label: "Console", slug: "runtime/utilities/console" },
                { label: "YAML", slug: "runtime/utilities/yaml" },
                { label: "Markdown", slug: "runtime/utilities/markdown" },
                { label: "JSON5", slug: "runtime/utilities/json5" },
                { label: "JSONL", slug: "runtime/utilities/jsonl" },
                {
                  label: "HTMLRewriter",
                  slug: "runtime/utilities/html-rewriter",
                },
                { label: "Hashing", slug: "runtime/utilities/hashing" },
                { label: "Glob", slug: "runtime/utilities/glob" },
                { label: "Semver", slug: "runtime/utilities/semver" },
                { label: "Color", slug: "runtime/utilities/color" },
                { label: "Utils", slug: "runtime/utilities/utils" },
              ],
            },
            {
              label: "Standards & Compatibility",
              items: [
                {
                  label: "Globals",
                  slug: "runtime/standards-compatibility/globals",
                },
                {
                  label: "Bun APIs",
                  slug: "runtime/standards-compatibility/bun-apis",
                },
                {
                  label: "Web APIs",
                  slug: "runtime/standards-compatibility/web-apis",
                },
                {
                  label: "Node.js Compatibility",
                  slug: "runtime/standards-compatibility/nodejs-compatibility",
                },
              ],
            },
            {
              label: "Contributing",
              items: [
                { label: "Contributing", slug: "runtime/contributing" },
                { label: "Roadmap", slug: "runtime/contributing/roadmap" },
                {
                  label: "Benchmarking",
                  slug: "runtime/contributing/benchmarking",
                },
                {
                  label: "Building Windows",
                  slug: "runtime/contributing/building-windows",
                },
                { label: "Bindgen", slug: "runtime/contributing/bindgen" },
                { label: "License", slug: "runtime/contributing/license" },
              ],
            },
          ],
        },
        {
          label: "Package Manager",
          items: [
            {
              label: "Core Commands",
              items: [
                {
                  label: "bun install",
                  slug: "package-manager/core-commands/bun-install",
                },
                {
                  label: "bun add",
                  slug: "package-manager/core-commands/bun-add",
                },
                {
                  label: "bun remove",
                  slug: "package-manager/core-commands/bun-remove",
                },
                {
                  label: "bun update",
                  slug: "package-manager/core-commands/bun-update",
                },
                { label: "bunx", slug: "package-manager/core-commands/bunx" },
              ],
            },
            {
              label: "Publishing & Analysis",
              items: [
                {
                  label: "bun publish",
                  slug: "package-manager/publishing-analysis/bun-publish",
                },
                {
                  label: "bun outdated",
                  slug: "package-manager/publishing-analysis/bun-outdated",
                },
                {
                  label: "bun why",
                  slug: "package-manager/publishing-analysis/bun-why",
                },
                {
                  label: "bun audit",
                  slug: "package-manager/publishing-analysis/bun-audit",
                },
                {
                  label: "bun info",
                  slug: "package-manager/publishing-analysis/bun-info",
                },
              ],
            },
            {
              label: "Workspace Management",
              items: [
                {
                  label: "Workspaces",
                  slug: "package-manager/workspace-management/workspaces",
                },
                {
                  label: "Catalogs",
                  slug: "package-manager/workspace-management/catalogs",
                },
                {
                  label: "bun link",
                  slug: "package-manager/workspace-management/bun-link",
                },
                {
                  label: "bun pm",
                  slug: "package-manager/workspace-management/bun-pm",
                },
              ],
            },
            {
              label: "Advanced Configuration",
              items: [
                {
                  label: "bun patch",
                  slug: "package-manager/advanced-configuration/bun-patch",
                },
                {
                  label: "bun --filter",
                  slug: "package-manager/advanced-configuration/bun-filter",
                },
                {
                  label: "Global cache",
                  slug: "package-manager/advanced-configuration/global-cache",
                },
                {
                  label: "Isolated install",
                  slug: "package-manager/advanced-configuration/isolated-install",
                },
                {
                  label: "Lockfile",
                  slug: "package-manager/advanced-configuration/lockfile",
                },
                {
                  label: "Lifecycle scripts",
                  slug: "package-manager/advanced-configuration/lifecycle-scripts",
                },
                {
                  label: "Scopes and registries",
                  slug: "package-manager/advanced-configuration/scopes-registries",
                },
                {
                  label: "Overrides and resolutions",
                  slug: "package-manager/advanced-configuration/overrides-resolutions",
                },
                {
                  label: "Security Scanner API",
                  slug: "package-manager/advanced-configuration/security-scanner-api",
                },
                {
                  label: ".npmrc support",
                  slug: "package-manager/advanced-configuration/npmrc-support",
                },
              ],
            },
          ],
        },
        {
          label: "Bundler",
          items: [
            {
              label: "Core",
              items: [{ label: "Bundler", slug: "bundler/core" }],
            },
            {
              label: "Development Server",
              items: [
                {
                  label: "Fullstack dev server",
                  slug: "bundler/development-server/fullstack-development-server",
                },
                {
                  label: "Hot reloading",
                  slug: "bundler/development-server/hot-reloading",
                },
              ],
            },
            {
              label: "Asset Processing",
              items: [
                {
                  label: "HTML & static sites",
                  slug: "bundler/asset-processing/html-static-sites",
                },
                {
                  label: "Standalone HTML",
                  slug: "bundler/asset-processing/standalone-html",
                },
                { label: "CSS", slug: "bundler/asset-processing/css" },
                { label: "Loaders", slug: "bundler/asset-processing/loaders" },
              ],
            },
            {
              label: "Single File Executable",
              items: [
                {
                  label: "Single-file executable",
                  slug: "bundler/single-file-executable",
                },
              ],
            },
            {
              label: "Extensions",
              items: [
                { label: "Plugins", slug: "bundler/extensions/plugins" },
                { label: "Macros", slug: "bundler/extensions/macros" },
              ],
            },
            {
              label: "Optimization",
              items: [
                {
                  label: "Bytecode Caching",
                  slug: "bundler/optimization/bytecode-caching",
                },
                { label: "Minifier", slug: "bundler/optimization/minifier" },
              ],
            },
            {
              label: "Migration",
              items: [{ label: "esbuild", slug: "bundler/migration/esbuild" }],
            },
          ],
        },

        {
          label: "Test Runner",
          items: [
            {
              label: "Getting Started",
              items: [
                {
                  label: "Test runner",
                  slug: "test-runner/getting-started/test-runner",
                },
                {
                  label: "Writing tests",
                  slug: "test-runner/getting-started/writing-tests",
                },
                {
                  label: "Test configuration",
                  slug: "test-runner/getting-started/test-configuration",
                },
              ],
            },
            {
              label: "Test Execution",
              items: [
                {
                  label: "Runtime behavior",
                  slug: "test-runner/test-execution/runtime-behavior",
                },
                {
                  label: "Finding tests",
                  slug: "test-runner/test-execution/finding-tests",
                },
              ],
            },
            {
              label: "Test Features",
              items: [
                {
                  label: "Lifecycle hooks",
                  slug: "test-runner/test-features/lifecycle-hooks",
                },
                { label: "Mocks", slug: "test-runner/test-features/mocks" },
                {
                  label: "Snapshots",
                  slug: "test-runner/test-features/snapshots",
                },
                {
                  label: "Dates and times",
                  slug: "test-runner/test-features/dates-times",
                },
              ],
            },
            {
              label: "Specialized Testing",
              items: [
                {
                  label: "DOM testing",
                  slug: "test-runner/specialized-testing/dom-testing",
                },
              ],
            },
            {
              label: "Reporting",
              items: [
                {
                  label: "Code coverage",
                  slug: "test-runner/reporting/code-coverage",
                },
                {
                  label: "Test Reporters",
                  slug: "test-runner/reporting/test-reporters",
                },
              ],
            },
          ],
        },
      ],
      components: {
        SiteTitle: "./src/components/starlight/SiteTitle.astro",
        Sidebar: "./src/components/starlight/Sidebar.astro",
        Header: "./src/components/starlight/Header.astro",
        Hero: "./src/components/starlight/Hero.astro",
        SkipLink: "./src/components/starlight/SkipLink.astro",
        Head: "./src/components/starlight/Head.astro",
        PageTitle: "./src/components/starlight/PageTitle.astro",
        PageSidebar: "./src/components/starlight/PageSidebar.astro",
      },
    }),
  ],
});
