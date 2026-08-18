import styles from "./EmptyState.module.css";

export default function EmptyState({ query }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.icon} aria-hidden="true">
        🔍
      </p>
      <p className={styles.title}>
        <strong>&ldquo;{query}&rdquo;</strong>에 대한 검색 결과가 없어요
      </p>
      <p className={styles.hint}>
        검색어의 철자를 확인하거나, 아래 인기 검색어를 눌러 다른 키워드로
        찾아보세요.
      </p>
    </div>
  );
}
