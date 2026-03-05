import { site } from "astro:config/client";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const docs = await getCollection("docs");

  return docs.map((entry) => ({
    params: { slug: entry.id },
    props: { body: entry.body, data: entry.data },
  }));
}

function toBlockQuote(text?: string): string | null {
  if (!text) return null;

  return `> ${text.trim()}`;
}

export function composeMarkdown(
  ...blocks: (string | null | undefined)[]
): string {
  return `${blocks
    .map((block) => block?.trim())
    .filter(Boolean) // Automatically strips out empty gaps if title/desc are missing
    .join("\n\n")}\n`;
}

const LLM_INDEX_NOTICE = `> ## Documentation Index
> Fetch the complete documentation index at: ${site}/llms.txt
> Use this file to discover all available pages before exploring further.`;

export const GET = (({ props: { body, data } }) => {
  const rawContent = composeMarkdown(
    LLM_INDEX_NOTICE,
    data.title ? `# ${data.title}` : null,
    data.description ? toBlockQuote(data.description) : null,
    body,
  );
  return new Response(rawContent, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}) satisfies APIRoute;
