import MainPage from "../layout/MainPage";
import PublicLayout from "../layout/PublicLayout";
import Layout from "../layout/Layout";

import GameDetail from "../gameApi/GameDetail";
import AdminIndex from "../admin/AdminIndex";

import Library from "../member/memberDetail/Library";
import Dashboard from "../member/memberDetail/Dashboard";
import Profile from "../member/memberDetail/Profile";
import Security from "../member/memberDetail/Security";
import Wallet from "../member/memberDetail/Wallet";
import { Route, Routes } from "react-router-dom";
import FindId from "../member/memberControl/FindId";
import FindPw from "../member/memberControl/FindPw";
import Login from "../member/memberControl/Login";
import Signup from "../member/memberControl/Signup";

function Router() {
  return (
    <Routes>
      {/* 메인 레이아웃 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="game/:id" element={<GameDetail />} />
        <Route path="admin" element={<AdminIndex />} />
        <Route path="member/library" element={<Library />} />
        <Route path="member/dashboard" element={<Dashboard />} />
        <Route path="member/profile" element={<Profile />} />
        <Route path="member/security" element={<Security />} />
        <Route path="member/wallet" element={<Wallet />} />
      </Route>

      {/* 레이아웃 없이 호출 */}
      <Route path="/member" element={<PublicLayout />}>
        <Route path="findid" element={<FindId />} />
        <Route path="findpw" element={<FindPw />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default Router;
