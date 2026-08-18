import NewsCard from "./NewsCard";
import styles from "./NewsList.module.css";

export default function NewsList({ articles, query }) {
  return (
    <ul className={styles.grid}>
      {articles.map((article) => (
        <li key={article.link}>
          <NewsCard article={article} query={query} />
        </li>
      ))}
    </ul>
  );
}
