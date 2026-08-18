import styles from "./ResultsBar.module.css";

const SORT_OPTIONS = [
  { value: "sim", label: "정확도순" },
  { value: "date", label: "최신순" },
];

export default function ResultsBar({ query, total, sort, onSortChange }) {
  return (
    <div className={styles.bar}>
      <p className={styles.summary}>
        <strong>{query}</strong>에 대한 검색 결과{" "}
        <strong>{total.toLocaleString("ko-KR")}</strong>건
      </p>
      <div className={styles.tabs} role="tablist" aria-label="정렬 방식">
        {SORT_OPTIONS.map((option) => {
          const isActive = sort === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.active : ""}`}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
