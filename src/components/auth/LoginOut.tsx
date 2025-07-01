import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  removeCurrentUser,
} from "../../components/auth/helper/storage";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, removeUserInfo } from "./store/userInfo";
import { MdLogout } from "react-icons/md";

const AuthStatus = () => {
  // Redux에서 로그인한 사용자 정보 가져오기
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그아웃 처리 함수
  const logout = () => {
    removeCurrentUser(); // localStorage 초기화
    dispatch(removeUserInfo()); // Redux 초기화
    navigate("/member/login"); // 페이지로 이동
  };

  return (
    <>
      {userInfo && userInfo.username ? (
        <>
          <button
            onClick={logout}
            className="text-white cursor-pointer hover:text-gray-400 transition-colors duration-200 hidden md:block "
          >
            로그아웃
          </button>
          <button
            onClick={logout}
            className="text-white cursor-pointer hover:text-gray-400 transition-colors duration-200 md:hidden block"
          >
            <MdLogout />
          </button>
        </>
      ) : (
        <Link
          to="/member/login"
          className="text-white cursor-pointer hover:text-gray-400 transition-colors duration-200 text-sm md:text-base"
        >
          로그인
        </Link>
      )}
    </>
  );
};

export default AuthStatus;
