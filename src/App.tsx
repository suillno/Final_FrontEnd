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

  (window as any).promptDiscount = async () => {
    const { value: percent } = await customSwal.fire({
<<<<<<< Updated upstream
      title: "할인율 입력",
      input: "number",
      inputLabel: "0부터 100 사이의 숫자를 입력해주세요",
      inputPlaceholder: "예: 25",
=======
      title: "할인가 가격",
      input: "number",
      inputLabel: "0부터 100 사이의 숫자를 입력해주세요",
      inputPlaceholder: "예: 10",
>>>>>>> Stashed changes
      showCancelButton: true,
      confirmButtonText: "적용",
      cancelButtonText: "취소",
      inputValidator: (value) => {
        const num = parseFloat(value);
        if (!value || isNaN(num) || num < 0 || num > 100) {
<<<<<<< Updated upstream
          return "0부터 100 사이의 숫자를 입력해주세요.";
=======
          return "0부터 100사이 숫자를 입력해주세요.";
>>>>>>> Stashed changes
        }
      },
    });
    return percent !== undefined ? parseFloat(percent) : null;
  };

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
