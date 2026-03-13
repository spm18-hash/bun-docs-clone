// @ts-check
import { SITE_URL } from "./src/const";
import starlight from "@astrojs/starlight";
import { defineConfig, fontProviders } from "astro/config";
import { sidebar } from "./astro.sidebar";

export default defineConfig({
  site: SITE_URL,
  fonts: [
    {
      provider: fontProviders.google(),
      cssVariable: "--font-geist",
      name: "Geist",
      styles: ["normal"],
      weights: [400, 500, 600],
    },
    {
      provider: fontProviders.google(),
      cssVariable: "--font-geist-mono",
      name: "Geist Mono",
      weights: [400, 500],
    },
  ],
  integrations: [
    starlight({
      title: "Bun",
      // disable404Route: true,
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
        {
          icon: "x.com",
          label: "X (formerly Twitter)",
          href: "https://x.com/withastro",
        },
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/astro",
        },
        {
          icon: "youtube",
          label: "YouTube",
          href: "https://youtube.com/astrodotbuild",
        },
      ],
      editLink: { baseUrl: "https://github.com/withastro/starlight" },
      customCss: ["./src/styles/globals.css"],
      expressiveCode: {
        themes: ["dracula", "github-light-default"],
        styleOverrides: {
          codeFontSize: "0.9em",
          frames: {
            terminalTitlebarBackground: "red",
            inlineButtonBackgroundHoverOrFocusOpacity: "0.05",
          },
        },
      },
      sidebar,
      components: {
        SiteTitle: "./src/components/starlight/SiteTitle.astro",
        Sidebar: "./src/components/starlight/Sidebar.astro",
        Header: "./src/components/starlight/Header.astro",
        Hero: "./src/components/starlight/Hero.astro",
        SkipLink: "./src/components/starlight/SkipLink.astro",
        Head: "./src/components/starlight/Head.astro",
        PageTitle: "./src/components/starlight/PageTitle.astro",
        PageSidebar: "./src/components/starlight/PageSidebar.astro",
        PageFrame: "./src/components/starlight/PageFrame.astro",
        TwoColumnContent: "./src/components/starlight/TwoColumnContent.astro",
        ContentPanel: "./src/components/starlight/ContentPanel.astro",
        Footer: "./src/components/starlight/Footer.astro",
      },
      routeMiddleware: "./src/routeData.ts",
    }),
  ],
});
