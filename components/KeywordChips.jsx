"use client";

import styles from "./KeywordChips.module.css";

export const POPULAR_KEYWORDS = [
  "경제",
  "부동산",
  "AI",
  "증시",
  "날씨",
  "월드컵",
  "환율",
  "선거",
];

export default function KeywordChips({ activeKeyword, onSelect }) {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {POPULAR_KEYWORDS.map((keyword) => {
          const isActive = activeKeyword === keyword;
          return (
            <li key={keyword}>
              <button
                type="button"
                className={`${styles.chip} ${isActive ? styles.active : ""}`}
                onClick={() => onSelect(keyword)}
                aria-pressed={isActive}
              >
                {keyword}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
