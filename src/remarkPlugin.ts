import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root as RemarkRoot } from "mdast";
import { h } from "hastscript";

export const remarkPlugin: RemarkPlugin = () => {
  return (tree, file) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective") {
        if (node.name !== "code-group") return;

        const data = node.data || (node.data = {});
        const title = node.attributes?.title ?? node.attributes?.label ?? "";

        const vnode = h("nord-code-group", {
          className: "code-group-container",
        });

        data.hName = vnode.tagName;
        data.hProperties = vnode.properties;
      }
    });
  };
};

type RemarkPlugin = Plugin<[], RemarkRoot>;
