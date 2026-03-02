import type { SvgComponent } from "astro/types";

import MDX from "./assets/mdx.svg";
import Clipboard from "./assets/clipboard.svg";
import CursorAI from "./assets/cursor-ai.svg";
import MCP from "./assets/mcp.svg";
import Perplexity from "./assets/perplexity.svg";
import VSCode from "./assets/vscode.svg";
import Claude from "./assets/claude.svg";
import ChatGPT from "./assets/chatgpt.svg";

interface MoreAction {
  icon: SvgComponent & ImageMetadata;
  label: string;
  description: string;
  href?: string;
}

export const MORE_ACTIONS: MoreAction[] = [
  {
    icon: Clipboard,
    label: "Copy Page",
    description: "Copy page as Markdown for LLMs",
  },
  {
    icon: MDX,
    label: "View as Markdown",
    description: "View this page as plain text",
    href: "/",
  },
  {
    icon: ChatGPT,
    label: "Open in ChatGPT",
    description: "Ask questions about this page",
    href: "/",
  },
  {
    icon: Claude,
    label: "Open in Claude",
    description: "Ask questions about this page",
    href: "/",
  },
  {
    icon: Perplexity,
    label: "Open in Perplexity",
    description: "Ask questions about this page",
    href: "/",
  },
  {
    icon: MCP,
    label: "Copy MCP Server",
    description: "Copy MCP Server URL to clipboard",
    href: "/",
  },
  {
    icon: CursorAI,
    label: "Connect to Cursor",
    description: "Install MCP Server on Cursor",
    href: "/",
  },
  {
    icon: VSCode,
    label: "Connect to VSCode",
    description: "Install MCP Server on VSCode",
    href: "/",
  },
];
