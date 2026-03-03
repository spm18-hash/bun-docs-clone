interface MoreAction {
  icon: string;
  label: string;
  description: string;
  href?: string;
}

export const MORE_ACTIONS: MoreAction[] = [
  {
    icon: "mdx",
    label: "View as Markdown",
    description: "View this page as plain text",
    href: "#view-markdown",
  },
  {
    icon: "chatgpt",
    label: "Open in ChatGPT",
    description: "Ask questions about this page",
    href: "#ai-chatgpt",
  },
  {
    icon: "claude",
    label: "Open in Claude",
    description: "Ask questions about this page",
    href: "#ai-claude",
  },
  {
    icon: "perplexity",
    label: "Open in Perplexity",
    description: "Ask questions about this page",
    href: "#ai-perplexity",
  },
  {
    icon: "mcp",
    label: "Copy MCP Server",
    description: "Copy MCP Server URL to clipboard",
    href: "/docs/mcp",
  },
  {
    icon: "cursor-ai",
    label: "Connect to Cursor",
    description: "Install MCP Server on Cursor",
    href: "/",
  },
  {
    icon: "vscode",
    label: "Connect to VSCode",
    description: "Install MCP Server on VSCode",
    href: "/",
  },
];
