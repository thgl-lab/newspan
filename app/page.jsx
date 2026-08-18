"use client";

import { useCallback, useState } from "react";
import Masthead from "../components/Masthead";
import SearchBar from "../components/SearchBar";
import KeywordChips from "../components/KeywordChips";
import ResultsBar from "../components/ResultsBar";
import NewsList from "../components/NewsList";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import IdleState from "../components/IdleState";
import Footer from "../components/Footer";
import styles from "./page.module.css";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  EMPTY: "empty",
  ERROR: "error",
};

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [sort, setSort] = useState("sim");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const runSearch = useCallback(async (query, sortValue) => {
    setStatus(STATUS.LOADING);
    setErrorMessage("");

    try {
      const params = new URLSearchParams({
        query,
        sort: sortValue,
        display: "20",
      });
      const res = await fetch(`/api/news?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data?.error?.message || "알 수 없는 오류가 발생했어요.");
        setStatus(STATUS.ERROR);
        return;
      }

      setArticles(data.items);
      setTotal(data.total);
      setStatus(data.items.length === 0 ? STATUS.EMPTY : STATUS.SUCCESS);
    } catch {
      setErrorMessage("네트워크 문제로 요청을 완료하지 못했어요.");
      setStatus(STATUS.ERROR);
    }
  }, []);

  function handleSubmit(query) {
    setSubmittedQuery(query);
    runSearch(query, sort);
  }

  function handleChipSelect(keyword) {
    setInputValue(keyword);
    setSubmittedQuery(keyword);
    runSearch(keyword, sort);
  }

  function handleSortChange(nextSort) {
    setSort(nextSort);
    if (submittedQuery) {
      runSearch(submittedQuery, nextSort);
    }
  }

  function handleRetry() {
    if (submittedQuery) {
      runSearch(submittedQuery, sort);
    }
  }

  return (
    <div className={styles.page}>
      <Masthead />
      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
      <KeywordChips activeKeyword={submittedQuery} onSelect={handleChipSelect} />

      <main className={styles.content}>
        {status === STATUS.IDLE && <IdleState />}
        {status === STATUS.LOADING && <LoadingState />}
        {status === STATUS.EMPTY && <EmptyState query={submittedQuery} />}
        {status === STATUS.ERROR && (
          <ErrorState message={errorMessage} onRetry={handleRetry} />
        )}
        {status === STATUS.SUCCESS && (
          <>
            <ResultsBar
              query={submittedQuery}
              total={total}
              sort={sort}
              onSortChange={handleSortChange}
            />
            <NewsList articles={articles} query={submittedQuery} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
