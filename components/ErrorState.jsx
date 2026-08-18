import styles from "./ErrorState.module.css";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.icon} aria-hidden="true">
        ⚠️
      </p>
      <p className={styles.title}>문제가 발생했어요</p>
      <p className={styles.message}>{message}</p>
      <button type="button" className={styles.retryButton} onClick={onRetry}>
        다시 시도
      </button>
    </div>
  );
}
