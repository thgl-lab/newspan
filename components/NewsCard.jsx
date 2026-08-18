import { formatRelativeTime } from "../lib/formatRelativeTime";
import HighlightText from "./HighlightText";
import styles from "./NewsCard.module.css";

export default function NewsCard({ article, query }) {
  const href = article.originalLink || article.link;

  return (
    <article className={styles.card}>
      <div className={styles.cutline}>
        <span className={styles.clip} aria-hidden="true">
          📎
        </span>
      </div>
      <a
        className={styles.link}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.meta}>
          <span className={styles.source}>{article.source}</span>
          <span className={styles.dot} aria-hidden="true">
            ·
          </span>
          <span className={styles.time}>
            {formatRelativeTime(article.pubDate)}
          </span>
        </div>
        <h2 className={styles.title}>
          <HighlightText text={article.title} query={query} />
        </h2>
        <p className={styles.description}>
          <HighlightText text={article.description} query={query} />
        </p>
        <span className={styles.readMore}>원문 보기 →</span>
      </a>
    </article>
  );
}
