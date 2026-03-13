import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const GET = (async ({ site }) => {
  const docs = await getCollection("docs");

  const fullTextContext = docs.map((doc) => {
    return `# ${doc.data.title}\nSource: ${site}${doc.id}\n\n${doc.body}`;
  });

  return new Response(fullTextContext.join("\n\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
    },
  });
}) satisfies APIRoute;
