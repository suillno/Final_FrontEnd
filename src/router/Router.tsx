import MainPage from "../layout/MainPage";
import PublicLayout from "../layout/PublicLayout";
import Layout from "../layout/Layout";
import GameDetail from "../gameApi/GameDetail";
import Library from "../member/memberDetail/Library";
import Dashboard from "../member/memberDetail/Dashboard";
import Profile from "../member/memberDetail/Profile";
import Wallet from "../member/memberDetail/Wallet";
import { Route, Routes } from "react-router-dom";
import FindId from "../member/memberControl/FindId";
import FindPw from "../member/memberControl/FindPw";
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

function Router() {
  return (
    <Routes>
      {/* 메인 레이아웃 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="game/:id" element={<GameDetail />} />
        <Route path="/searchgame" element={<SearchGame />} />
        <Route path="member/library" element={<Library />} />
        <Route path="member/dashboard" element={<Dashboard />} />
        <Route path="member/profile" element={<Profile />} />
        <Route path="member/wallet" element={<Wallet />} />
        <Route path="member/CartPage" element={<CartPage />} />
        <Route path="member/WishList" element={<WishList />} />
        <Route path="member/GameYearList" element={<GameYearList />} />

        {/* 어드민 */}
        <Route path="admin/CustomerSupport" element={<CustomerSupport />} />
        <Route path="admin/ReviewManagement" element={<ReviewManagement />} />
        <Route path="admin/UserManagement" element={<UserManagement />} />
        <Route path="admin/Chart" element={<Chart />} />
        <Route path="member/Genres" element={<Genres />} />
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
