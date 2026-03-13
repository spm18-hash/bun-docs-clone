import type { APIRoute } from "astro";
import { SITE_TITLE } from "@/const";
import { getCollection } from "astro:content";
import { composeMarkdown } from "./[...slug].md";
import { site } from "astro:config/client";

export const GET = (async () => {
  const docs = await getCollection("docs");

  const docLinks = docs
    .map((doc) => `- [${doc.data.title}](${site}/${doc.id}.md)`)
    .join("\n");

  const header = `# ${SITE_TITLE}\n\n## Docs\n\n`;

  const final = composeMarkdown(header, docLinks);

  return new Response(final, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    },
  });
}) satisfies APIRoute;
