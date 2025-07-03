import { useEffect } from "react";

import ScrollToTop from "./components/common/ScrollToTop";
import Router from "./router/Router";
import GlobalReset from "./style/GlobalReset";
import GlobalStyle from "./style/GlobalStyle";
import "react-circular-progressbar/dist/styles.css";
import { BrowserRouter } from "react-router-dom";
import { overrideAlertConfirmPrompt } from "./components/utils/swalOverrides";

function App() {
  useEffect(() => {
    overrideAlertConfirmPrompt();
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
