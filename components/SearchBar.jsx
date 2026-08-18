"use client";

import { useRef } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ value, onChange, onSubmit }) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value.trim());
  }

  function handleClear() {
    onChange("");
    inputRef.current?.focus();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <div className={styles.field}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="궁금한 키워드를 검색해보세요"
          autoFocus
          aria-label="뉴스 검색어"
        />
        {value && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="검색어 지우기"
          >
            ×
          </button>
        )}
      </div>
      <button
        type="submit"
        className={styles.submitButton}
        disabled={!value.trim()}
      >
        검색
      </button>
    </form>
  );
}
