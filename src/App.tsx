import Router from "./router/Router";
import GlobalReset from "./style/GlobalReset";
import GlobalStyle from "./style/GlobalStyle";
import "react-circular-progressbar/dist/styles.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalReset />
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
