import type { Root as RehypeRoot, Element } from "hast";

import { visit } from "unist-util-visit";

import type { Plugin } from "unified";

import { h } from "hastscript";
import { definitions, FileIcons } from "./components/file-tree-icons";

export const rehypePlugin: RehypePlugin = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "nord-code-group") return;

      const className = node.properties?.className;

      const classes = Array.isArray(className)
        ? className.map(String)
        : typeof className === "string"
          ? className.split(" ").filter(Boolean)
          : [];

      if (!classes.includes("code-group-container")) return;

      const codeBlock = node.children.filter(
        (child): child is Element =>
          child.type === "element" &&
          child.tagName === "pre" &&
          child.children.length > 0 &&
          (child.children[0] as Element)?.tagName === "code",
      );

      if (codeBlock.length === 0) return;

      const groupId = Math.random().toString(36).substring(2, 9);
      const tabButtons: Element[] = [];
      const tabPanels: Element[] = [];

      codeBlock.forEach((pre, index) => {
        const code = pre.children[0] as Element;
        const isFirst = index === 0;

        const tabTitle: string =
          (code.properties?.metastring as string) ?? "title";

        const codeClassName = code.properties?.className;
        const codeClasses = Array.isArray(codeClassName)
          ? codeClassName.map(String)
          : typeof codeClassName === "string"
            ? codeClassName.split(" ")
            : [];

        const langClass = codeClasses.find((c) => c.startsWith("language-"));
        const lang = langClass ? langClass.replace("language-", "") : "";

        const iconKey =
          definitions.files[tabTitle] ||
          definitions.extensions[`.${lang}`] ||
          definitions.extensions[`.${tabTitle.split(".").pop()}`] ||
          definitions.partials[tabTitle] ||
          "set:default";

        const iconPath =
          FileIcons[iconKey as keyof typeof FileIcons] ||
          FileIcons["seti:default"];

        const tabId = `tab-${groupId}-${index}`;
        const panelId = `panel-${groupId}-${index}`;

        tabButtons.push(
          h(
            "nord-tab",
            {
              id: tabId,
              role: "tab",
              "aria-controls": panelId,
              className: ["sl-flex", "nord-tab"],
            },
            [
              h(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  width: "14",
                  height: "14",
                  className: "tab-icon",
                  "aria-hidden": "true",
                  style: "fill: currentColor; flex-shrink: 0;",
                },
                [h("path", { d: extractPathData(iconPath) })],
              ),
              h("span", { className: "tab-title" }, tabTitle),
            ],
          ),
        );

        tabPanels.push(
          h(
            "nord-tab-panel",
            {
              id: panelId,
              role: "tabpanel",
              "aria-labelledby": tabId,
              tabindex: 0,
              className: "nord-tab-panel",
            },
            [pre],
          ),
        );
      });

      node.children = [
        h("div", { className: "nord-tab-header", role: "tablist" }, tabButtons),
        h("div", { className: "nord-tab-content" }, tabPanels),
      ];
    });
  };
};

type RehypePlugin = Plugin<[], RehypeRoot>;

function extractPathData(iconPath: string): string {
  const match = iconPath.match(/<path d="([^"]+)"/);
  return match ? match[1] : "";
}
