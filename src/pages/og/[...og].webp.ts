import { generateOgImage } from "./_generateImage";
import crypto from "node:crypto";
import path from "node:path";
import fs from "node:fs/promises";
import type { APIRoute } from "astro";

import { getCollection } from "astro:content";

/**
 * GENERATE STATIC PATHS
 * This tells Astro which URLs to build at compile time.
 * Because we use `doc.id` (which may contain slashes), this file
 * MUST be named `[...og].webp.ts` (using a Rest parameter).
 */
export async function getStaticPaths() {
  const docs = await getCollection("docs");

  return docs
    .filter((doc) => !doc.id.includes("404"))
    .map((doc) => ({
      params: {
        og: doc.id,
      },
      // We pass the entire document as a prop so the GET function
      // doesn't have to search for it again!
      props: { doc },
    }));
}

/**
 * API ROUTE HANDLER
 * Generates the actual WebP image for each path.
 */
export const GET: APIRoute = async ({ props }) => {
  // Grab the document data passed down from getStaticPaths
  const { doc } = props;

  const hashInput = doc.id;
  const hash = crypto.createHash("md5").update(hashInput).digest("hex");

  const cacheDir = path.join(process.cwd(), ".cache/og-images");
  const cachePath = path.join(cacheDir, `${hash}.webp`);

  await fs.mkdir(cacheDir, { recursive: true });

  try {
    console.error("using cached images");

    // 3. Try to read the image from the local cache
    const cachedImage = await fs.readFile(cachePath);

    // If successful, return the cached buffer! Satori is bypassed.
    return new Response(cachedImage, {
      headers: { "Content-Type": "image/png" },
    });
  } catch (error) {
    console.error("generating new images");
    const webpBuffer = await generateOgImage(doc);

    await fs.writeFile(cachePath, webpBuffer);
    const isDev = import.meta.env.DEV;

    return new Response(new Uint8Array(webpBuffer), {
      headers: {
        "Content-Type": "image/webp",
        // Best practice: Tell browsers and CDNs to cache this heavily
        "Cache-Control": isDev
          ? "no-store, max-age=0"
          : "public, max-age=31536000, immutable",
      },
    });
  }
};
