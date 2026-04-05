export const PAGE_TITLE_ID = "_top";

// export const IS_PREVIEW =
//   process.env.CF_PAGES_BRANCH !== "main" && process.env.CF_PAGE === "1";
const env = globalThis.process?.env || {};

export const SITE_URL =
  env.CF_PAGES === "1"
    ? (env.CF_PAGES_URL ?? "https://bun-docs-clone.pages.dev") // Production URL
    : env.VERCEL === "1"
      ? `https://${env.VERCEL_URL ?? env.VERCEL_BRANCH_URL}`
      : "http://localhost:4321";

export const SITE_TITLE = "Bun";
