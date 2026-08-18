import styles from "./IdleState.module.css";

export default function IdleState() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.icon} aria-hidden="true">
        📰
      </p>
      <p className={styles.text}>
        키워드를 검색하거나, 위 인기 검색어를 눌러 오늘의 뉴스를
        찾아보세요.
      </p>
    </div>
  );
}
