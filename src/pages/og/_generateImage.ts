import satori from "satori";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

import type { CollectionEntry } from "astro:content";

import { Resvg } from "@resvg/resvg-js";

export async function generateOgImage(doc: CollectionEntry<"docs">) {
  // 2. --- FONT PREP ---
  // Just like the background image, we bypass the network and load
  // the raw font files directly into memory for Satori to use.
  const fontRegular = path.resolve("./src/pages/og/_fonts/Geist-Regular.otf");
  const fontSemiBold = path.resolve("./src/pages/og/_fonts/Geist-SemiBold.otf");

  const regularBuffer = await fs.readFile(fontRegular);
  const semiBoldBuffer = await fs.readFile(fontSemiBold);

  // 3. --- SATORI SVG GENERATION ---
  // Satori takes a React-like JSON object and converts it into an SVG string.
  const svg = await satori(
    {
      key: doc.id,
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 128,
          width: "100%",
          height: "100%",
          backgroundColor: "#000",
          padding: "100px 100px 40px",
          // backgroundImage: `url("${base64Image}")`,
          backgroundImage:
            "radial-gradient(circle at 15px 15px, #222 5%, transparent 0%),radial-gradient(circle at 38px 26px, #222 4%, transparent 0%)",
          backgroundSize: "48px 35px",
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
                // props: { d: "M0.25,0.25 l46.75, 32.25 l-46.75, 32.25 z " }, // play button
                props: { d: "M37.5,0.25 l37.25,64.5 l-74.5,0 z" }, // triangle
              },
            },
          },
          // Text Content Section
          {
            type: "div",
            props: {
              style: {
                color: "#fff",
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
                      fontSize: 74,
                      lineHeight: 1.2,
                      fontWeight: 600,
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
                      color: "hsl(0,0%,65%)",
                      fontSize: 40,
                      lineHeight: 1.2,
                      marginTop: 18,
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

  return webpBuffer;
}
