import { marked } from "marked";
import { slugify } from "@/lib/slug";
import { sanitizeContent } from "@/lib/sanitize";

const renderer = new marked.Renderer();
renderer.heading = (text, level) => {
  const id = slugify(text);
  return `<h${level} id="${id}">${text}</h${level}>`;
};

export function markdownToHtml(markdown) {
  const raw = marked.parse(markdown || "", {
    mangle: false,
    headerIds: false,
    renderer
  });
  return sanitizeContent(raw);
}

export function extractToc(markdown) {
  const tokens = marked.lexer(markdown || "");
  return tokens
    .filter((token) => token.type === "heading" && token.depth <= 3)
    .map((token) => ({
      text: token.text,
      depth: token.depth,
      id: slugify(token.text)
    }));
}
