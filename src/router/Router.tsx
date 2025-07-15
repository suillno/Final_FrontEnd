import MainPage from "../layout/MainPage";
import PublicLayout from "../layout/PublicLayout";
import Layout from "../layout/Layout";
import GameDetail from "../gameApi/GameDetail";
import Library from "../member/memberDetail/Library";
import Dashboard from "../member/memberDetail/Dashboard";
import Profile from "../member/memberDetail/Profile";
import Wallet from "../member/memberDetail/Wallet";
import { Route, Routes } from "react-router-dom";
import Login from "../member/memberControl/Login";
import Signup from "../member/memberControl/Signup";
import CartPage from "../member/memberDetail/CartPage";
import WishList from "../member/memberDetail/WishList";
import SearchGame from "../components/api/SearchGame";
import CustomerSupport from "../admin/CustomerSupport";
import ReviewManagement from "../admin/ReviewManagement";
import UserManagement from "../admin/UserManagement";
import Chart from "../admin/Chart";
import Genres from "../gameApi/Genres";
import GameYearList from "../gameApi/GameYearList";
import GameLongPlayList from "../gameApi/GameLongPlayList";
import MemberServicePage from "../member/memberService/MemberServicePage";

import Auth from "../components/auth/helper/Auth";
import { NotFound } from "../components/error/NotFound";
import Find from "../member/memberControl/Find";
import GameNsList from "../gameApi/GameNsList";
import GamePcList from "../gameApi/GamePcList";
import GamePsList from "../gameApi/GamePsList";
import GameXboxList from "../gameApi/GameXboxList";
import Leave from "../member/memberDetail/Leave";
// DB에있는 권한 확인
const ROLES = {
  ROLE_SYSTEM: 1,
  ROLE_ADMIN: 2,
  ROLE_USER: 3,
};

function Router() {
  return (
    <Routes>
      {/* 메인 레이아웃 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />

        {/* 사용자 정보 조회 */}
        <Route
          path="member"
          element={<Auth allowedRoles={[ROLES.ROLE_USER]} />}
        >
          <Route path="library" element={<Library />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="CartPage" element={<CartPage />} />
          <Route path="WishList" element={<WishList />} />
          <Route path="Leave" element={<Leave />} />
        </Route>

        {/* 게임기능 */}
        <Route path="game/GameYearList" element={<GameYearList />} />
        <Route path="game/:id" element={<GameDetail />} />
        <Route path="/searchgame" element={<SearchGame />} />
        <Route path="game/Genres" element={<Genres />} />
        <Route path="/game/GameLongPlayList" element={<GameLongPlayList />} />

        {/* 콘솔 장르 */}
        <Route path="/game/GameNsList" element={<GameNsList />} />
        <Route path="/game/GamePcList" element={<GamePcList />} />
        <Route path="game/GamePsList" element={<GamePsList />} />
        <Route path="game/GameXboxList" element={<GameXboxList />} />

        {/* 고객 문의 */}
        <Route path="/member/memberService" element={<MemberServicePage />} />

        {/* 어드민 */}
        <Route path="admin/CustomerSupport" element={<CustomerSupport />} />
        <Route path="admin/ReviewManagement" element={<ReviewManagement />} />
        <Route path="admin/UserManagement" element={<UserManagement />} />
        <Route path="admin/Chart" element={<Chart />} />
      </Route>

      {/* 레이아웃 없이 호출 */}
      <Route path="/member" element={<PublicLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="find" element={<Find />} />
      </Route>
      {/* 경로 없을때 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
