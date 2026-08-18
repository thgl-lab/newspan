import styles from "./LoadingState.module.css";

export default function LoadingState() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dots} role="status" aria-label="검색 중">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <p className={styles.text}>기사를 찾고 있어요…</p>

      <ul className={styles.skeletonGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className={styles.skeletonCard}>
            <div className={`${styles.bar} ${styles.barShort}`} />
            <div className={`${styles.bar} ${styles.barTitle}`} />
            <div className={styles.bar} />
            <div className={`${styles.bar} ${styles.barShort}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
