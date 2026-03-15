import { getStaticPaths } from "../pages/og/[...og].webp";

const routes = await getStaticPaths();
const paths = new Set(routes.map(({ params }) => `${params.og}.webp`));

export function getOgImageURL(path: string): string | undefined {
  // 1. Strip the leading and trailing slashes
  const cleanPath = path.replace(/^\//, "").replace(/\/$/, "");

  // 2. If the path was "/", cleanPath is now "". Fall back to "index".
  const fileName = cleanPath || "index";

  // 3. Append the extension
  const imagePath = `${fileName}.webp`;

  if (paths.has(imagePath)) return `/og/${imagePath}`;
}
