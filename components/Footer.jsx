import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>이 서비스는 네이버 뉴스 검색 API를 활용합니다.</p>
      <p>© 뉴스판 (NewsPan)</p>
    </footer>
  );
}
