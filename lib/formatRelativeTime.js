// 네이버 API의 RFC822 pubDate(예: "Mon, 26 Sep 2016 07:50:00 +0900")를
// "n분 전" 형태의 상대 시간 문자열로 변환한다.

export function formatRelativeTime(pubDate) {
  if (!pubDate) return "";
  const published = new Date(pubDate);
  if (Number.isNaN(published.getTime())) return "";

  const diffMs = Date.now() - published.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 0) return formatDate(published);
  if (diffSec < 60) return "방금 전";

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;

  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return `${diffDay}일 전`;

  return formatDate(published);
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}
