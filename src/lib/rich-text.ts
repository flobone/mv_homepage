export type HeadingAnchor = {
  id: string;
  text: string;
};

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function addAnchorsToHtml(html: string): { html: string; headings: HeadingAnchor[] } {
  const headings: HeadingAnchor[] = [];
  let index = 0;

  const nextHtml = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs: string, inner: string) => {
    const plainText = inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    const fallbackId = `section-${index + 1}`;
    const id = slugify(plainText) || fallbackId;
    headings.push({ id, text: plainText });
    index += 1;

    const cleanedAttrs = attrs.replace(/\sid=("[^"]*"|'[^']*')/gi, "");
    return `<h2 id="${id}" class="chronik-rich-heading"${cleanedAttrs}>${inner}</h2>`;
  });

  return { html: nextHtml, headings };
}
