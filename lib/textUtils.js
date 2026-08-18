// 네이버 뉴스 검색 API 응답 텍스트(HTML 태그, 엔티티)를 정제하는 유틸.

const ENTITY_MAP = {
  "&quot;": '"',
  "&apos;": "'",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&#39;": "'",
};

export function cleanText(raw) {
  if (!raw) return "";
  return raw
    .replace(/<\/?b>/g, "")
    .replace(/&quot;|&apos;|&amp;|&lt;|&gt;|&#39;/g, (m) => ENTITY_MAP[m] ?? m)
    .trim();
}

export function extractDomain(url) {
  if (!url) return "";
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}
