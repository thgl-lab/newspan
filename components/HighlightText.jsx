function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightText({ text, query }) {
  if (!query || !query.trim()) return <>{text}</>;

  const pattern = new RegExp(`(${escapeRegExp(query.trim())})`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark className="highlight" key={i}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
