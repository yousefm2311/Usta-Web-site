import { markdownToHtml } from "@/lib/markdown";
import { sanitizeContent } from "@/lib/sanitize";

export function renderContent(content, contentType = "markdown") {
  if (contentType === "html") {
    return sanitizeContent(content || "");
  }
  return markdownToHtml(content || "");
}
