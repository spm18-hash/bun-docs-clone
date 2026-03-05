export const PAGE_TITLE_ID = "_top";

export const IS_PREVIEW =
  process.env.CF_PAGES_BRANCH !== "main" && process.env.CF_PAGE === "1";

export const SITE_URL =
  process.env.CF_PAGES === "1"
    ? process.env.CF_PAGES_BRANCH === "main"
      ? "https://bun-docs-clone.pages.dev" // Production URL
      : process.env.CF_PAGES_URL // Unique Preview URL
    : "http://localhost:4321";

export const SITE_TITLE = "Bun";
