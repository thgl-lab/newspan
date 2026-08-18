import styles from "./Masthead.module.css";

function formatToday() {
  const today = new Date();
  return today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
}

export default function Masthead() {
  return (
    <header className={styles.masthead}>
      <div className={styles.inner}>
        <h1 className={styles.logo}>뉴스판</h1>
        <p className={styles.date}>{formatToday()}</p>
      </div>
      <div className={styles.ruleThick} />
      <div className={styles.ruleThin} />
    </header>
  );
}
