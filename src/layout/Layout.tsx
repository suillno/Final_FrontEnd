import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header onSidebarToggle={handleSidebarToggle} />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
      <div
        style={{
          paddingTop: "60px", // 헤더 높이만큼 여백
          minHeight: "100vh",
          backgroundColor: "#1e1f24",
          color: "white",
        }}
      >
        <Outlet context={{ isSidebarOpen }} />
      </div>
    </>
  );
}

export default Layout;
