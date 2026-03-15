import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import type { APIContext } from "astro";
import { getOgImageURL } from "./utils/getOgImageUrl";

export const onRequest = defineRouteMiddleware((context) => {
  updateHead(context);
});

function updateHead(context: APIContext) {
  const { head } = context.locals.starlightRoute;

  const ogImageURL = getOgImageURL(context.url.pathname);
  const imageSrc = ogImageURL ?? "/default.webp";
  const canonicalImageSrc = new URL(imageSrc, context.url);

  head.push({
    tag: "meta",
    attrs: { property: "og:image", content: canonicalImageSrc.href },
  });
  head.push({
    tag: "meta",
    attrs: { property: "twitter:image", content: canonicalImageSrc.href },
  });
}
