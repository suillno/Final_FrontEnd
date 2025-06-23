import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 페이지 이동 시 자동으로 스크롤을 최상단으로 올려주는 컴포넌트
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 이동
  }, [pathname]); // 경로(pathname)가 바뀔 때마다 실행

  return null;
}

export default ScrollToTop;
