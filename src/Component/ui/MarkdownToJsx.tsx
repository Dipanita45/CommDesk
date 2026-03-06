import React, { memo } from "react";
import Markdown from "markdown-to-jsx";

type MarkdownToJsxProps = {
  markdown?: string | null | undefined;
  className?: string;
  fallback?: React.ReactNode;
};

const DEFAULT_CLASS =
  "prose max-w-none break-words text-current prose-headings:text-gray-400  prose-p:text-inherit prose-strong:text-inherit prose-code:text-inherit prose-li:text-inherit prose-a:text-inherit prose-blockquote:text-inherit ";

const MARKDOWN_OPTIONS: Parameters<typeof Markdown>[0]["options"] = {
  forceBlock: true,
  disableParsingRawHTML: true,
  overrides: {
    a: {
      props: {
        target: "_blank",
        rel: "noopener noreferrer",
      },
    },
  },
};

function MarkdownToJsx({
  markdown,
  className = DEFAULT_CLASS,
  fallback = null,
}: MarkdownToJsxProps) {
  const safeMarkdown = typeof markdown === "string" ? markdown.trim() : "";

  if (!safeMarkdown) {
    return <>{fallback}</>;
  }

  return (
    <div className={className}>
      <Markdown options={MARKDOWN_OPTIONS}>{safeMarkdown}</Markdown>
    </div>
  );
}

export default memo(MarkdownToJsx);
