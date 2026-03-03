import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getStaticPaths() {
  const docs = await getCollection("docs");

  return docs.map((entry) => ({
    params: { slug: entry.id },
    props: { body: entry.body },
  }));
}

export const GET = (({ props }) => {
  return new Response(props.body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}) satisfies APIRoute;
