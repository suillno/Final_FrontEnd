import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // 사이드바 열림 여부 상태

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen); // 버튼 클릭 시 토글
  };

  return (
    <>
      {/* 상단 헤더: 토글 버튼 포함 */}
      <Header onSidebarToggle={handleSidebarToggle} />

      {/* 사이드바: transient prop 사용 필요 ($isOpen) */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* 메인 콘텐츠 영역: context로 사이드바 열림 여부 전달 */}
      <div>
        <Outlet context={{ isSidebarOpen }} />
      </div>
    </>
  );
}

export default Layout;
