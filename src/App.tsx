import { useEffect } from "react";

import ScrollToTop from "./components/common/ScrollToTop";
import Router from "./router/Router";
import GlobalReset from "./style/GlobalReset";
import GlobalStyle from "./style/GlobalStyle";
import "react-circular-progressbar/dist/styles.css";
import { BrowserRouter } from "react-router-dom";
import customSwal from "./style/customSwal.styles";

function App() {
  useEffect(() => {
    window.alert = (message) => {
      customSwal.fire({
        text: String(message),
        icon: undefined,
        confirmButtonText: "확인",
      });
    };

    // 타입 단언으로 any 취급해서 오류 없애기
    (window as any).confirm = (message: string) => {
      return customSwal
        .fire({
          text: String(message),
          icon: undefined,
          showCancelButton: true,
          confirmButtonText: "확인",
          cancelButtonText: "취소",
          reverseButtons: true,
        })
        .then((result) => result.isConfirmed);
    };
  }, []);

  return (
    <>
      <GlobalReset />
      <GlobalStyle />
      <BrowserRouter>
        {/* 페이지 이동시 스크롤 탑 */}
        <ScrollToTop />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
