import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

import { getCollection } from "astro:content";
import { Resvg } from "@resvg/resvg-js";

/**
 * GENERATE STATIC PATHS
 * This tells Astro which URLs to build at compile time.
 * Because we use `doc.id` (which may contain slashes), this file
 * MUST be named `[...og].webp.ts` (using a Rest parameter).
 */
export async function getStaticPaths() {
  const docs = await getCollection("docs");

  return docs.map((doc) => ({
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
  // 1. --- BACKGROUND IMAGE PREP ---
  // We read the file directly from the disk (instead of using fetch/import)
  // to ensure Satori can reliably access it during Astro's static build process.
  const bgImagePath = path.resolve("./src/pages/og/_images/background-ltr.png");
  const bgImageBuffer = await fs.readFile(bgImagePath);

  // Satori requires external images to be Base64 Data URLs
  const base64Image = `data:image/png;base64,${bgImageBuffer.toString("base64")}`;

  // 2. --- FONT PREP ---
  // Just like the background image, we bypass the network and load
  // the raw font files directly into memory for Satori to use.
  const fontRegular = path.resolve("./src/pages/og/_fonts/Geist-Regular.otf");
  const fontSemiBold = path.resolve("./src/pages/og/_fonts/Geist-SemiBold.otf");

  const regularBuffer = await fs.readFile(fontRegular);
  const semiBoldBuffer = await fs.readFile(fontSemiBold);

  // Grab the document data passed down from getStaticPaths
  const { doc } = props;

  // 3. --- SATORI SVG GENERATION ---
  // Satori takes a React-like JSON object and converts it into an SVG string.
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 96,
          width: "100%",
          height: "100%",
          backgroundColor: "#fff",
          fontSize: 32,
          fontWeight: 600,
          padding: "100px 140px 40px",
          backgroundImage: `url("${base64Image}")`,
        },
        children: [
          // Logo / Icon Section
          {
            type: "svg",
            props: {
              width: "75",
              viewBox: "0 0 75 65",
              fill: "#fff",
              children: {
                type: "path",
                props: { d: "M0.25,0.25 l46.75, 32.25 l-46.75, 32.25 z " }, // play button
                // props: { d: "M37.5,0.25 l37.25,64.5 l-74.5,0 z" }, // triangle
              },
            },
          },
          // Text Content Section
          {
            type: "div",
            props: {
              style: {
                color: "#fff",
                lineHeight: 1.2,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              },
              children: [
                // Page Title
                {
                  type: "h1",
                  props: {
                    style: {
                      color: "#fff",
                      fontSize: 72,
                      lineHeight: 1.2,
                      margin: 0,
                    },
                    children: `${doc?.data.title || "Documentation"}`,
                  },
                },
                // Page Description
                {
                  type: "p",
                  props: {
                    style: {
                      color: "#bfc1c9",
                      fontSize: 42,
                      lineHeight: 1.2,
                      fontWeight: 400,
                      marginTop: 16,
                      textWrap: "pretty", // Ensures nice text wrapping without orphan words
                    },
                    children: `${doc?.data.description || "Description"}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200, // Standard Open Graph image width
      height: 630, // Standard Open Graph image height
      fonts: [
        {
          name: "Geist",
          data: regularBuffer,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist",
          data: semiBoldBuffer,
          weight: 600,
          style: "normal",
        },
      ],
    },
  );

  // 4. --- RENDER PIPELINE ---
  // Step A: Convert the Satori SVG into a PNG using Resvg
  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const pngBuffer = resvg.render().asPng();

  // Step B: Compress the PNG into a WebP using Sharp
  const webpBuffer = await sharp(pngBuffer).webp({ quality: 90 }).toBuffer();

  // 5. --- SEND RESPONSE ---
  // Return the final WebP image to the browser/Astro build engine

  // Check if we are running 'npm run dev' or 'npm run build'
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
};
