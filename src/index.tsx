import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css"; // 또는 './tailwind.css'
import { Provider } from "react-redux"; // Redux 스토어를 애플리케이션에 연결
import store from "./components/store/store"; // Redux 스토어 객체 import
import { BrowserRouter } from "react-router-dom"; // 라우팅 기능 제공
import { persistStore } from "redux-persist"; // 저장된 상태 관리 설정
import { PersistGate } from "redux-persist/integration/react"; // 저장된 상태가 로드될 때까지 UI 렌더링 보류

// Redux persist용 persistor 생성 (스토어 상태 저장 관리)
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  // Redux 스토어 Provider로 전체 앱 감싸기
  <Provider store={store}>
    {/* PersistGate로 저장된 상태 불러올 때까지 대기 (로딩 중 UI는 null 처리) */}
    <PersistGate loading={null} persistor={persistor}>
      {/* React의 엄격한 모드 활성화 (개발 중 경고, 문제 탐지 목적) */}
      <React.StrictMode>
        <App /> {/* 실제 앱의 루트 컴포넌트 */}
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
