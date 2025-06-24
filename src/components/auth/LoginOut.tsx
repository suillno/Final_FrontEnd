import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  removeCurrentUser,
} from "../../components/auth/helper/storage";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, removeUserInfo } from "./store/userInfo";

const AuthStatus = () => {
  // Redux에서 로그인한 사용자 정보 가져오기
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("로그인정보", userInfo);

  // 로그아웃 처리 함수
  const logout = () => {
    removeCurrentUser(); // localStorage 초기화
    dispatch(removeUserInfo()); // Redux 초기화
    navigate("/member/login"); // 페이지로 이동
  };

  return (
    <>
      {userInfo && userInfo.username ? (
        <button onClick={logout} className="text-white">
          로그아웃
        </button>
      ) : (
        <Link to="/member/login" className="text-white">
          로그인
        </Link>
      )}
    </>
  );
};

export default AuthStatus;
