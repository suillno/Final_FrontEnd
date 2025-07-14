import React, { useState, useRef, useEffect } from "react";
import sidebarIcon from "../img/sidebar.png";
import PGLogo from "../img/PGLogo.png";
import SearchBox from "../components/common/SearchBox";
import { Link } from "react-router-dom";
import LoginOut from "../components/auth/LoginOut";
import {
  Dropdown,
  HeaderRight,
  HeaderWrapper,
  HideName,
  Logo,
  SidebarIcon,
} from "../style/Header.styles";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../components/auth/store/userInfo";

// 🔸 props 타입 정의: Layout에서 사이드바 토글 버튼 클릭 시 동작할 함수 전달
interface HeaderProps {
  onSidebarToggle: () => void;
}

// 🔸 Header 컴포넌트 정의
const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  // 🔹 로그인한 사용자 정보 가져오기 (Redux)
  const userInfo = useSelector(selectUserInfo);

  const [isDropdownVisible, setDropdownVisible] = useState(false); // 드롭다운 보임 여부
  const [isAnimatingOut, setAnimatingOut] = useState(false); // 닫히는 애니메이션 중인지 여부
  const dropdownRef = useRef<HTMLDivElement>(null); // 외부 클릭 감지용 ref

  // 🔹 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown(); // 드롭다운 닫기 함수 호출
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 닉네임 클릭 시 드롭다운 토글
  const toggleDropdown = () => {
    if (isDropdownVisible) {
      closeDropdown();
    } else {
      setDropdownVisible(true);
    }
  };

  // 🔹 드롭다운 닫기 애니메이션 적용 후 제거
  const closeDropdown = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setAnimatingOut(false);
      setDropdownVisible(false);
    }, 500); // 0.5초 후 완전 제거
  };

  return (
    <HeaderWrapper className="flex justify-between items-center">
      {/* 🔹 좌측: 사이드바 버튼 + 로고 */}
      <div className="flex items-center gap-4 basis-1/4">
        <button onClick={onSidebarToggle}>
          <SidebarIcon src={sidebarIcon} />
        </button>
        <Link to={"/"}>
          <Logo src={PGLogo} />
        </Link>
      </div>

      {/* 🔹 중앙: 검색창 */}
      <div className="basis-2/4">
        <SearchBox />
      </div>

      {/* 🔹 우측: 닉네임 + 로그인 상태 + 드롭다운 메뉴 */}
      <HeaderRight className="basis-1/4 justify-end" ref={dropdownRef}>
        <HideName
          className="text-white cursor-pointer hover:text-gray-400 transition-colors duration-200"
          onClick={toggleDropdown}
        >
          {userInfo?.username || ""}
        </HideName>

        <LoginOut />

        {isDropdownVisible && (
          <Dropdown $animateOut={isAnimatingOut}>
            <Link to="/member/profile">Profile</Link>
            <Link to="/member/dashboard">Dashboard</Link>
            <Link to="/member/library">Library</Link>
            <Link to="/member/wallet">Wallet</Link>
            <Link to="/member/cartpage">CartPage</Link>
            <Link to="/member/wishlist">WishList</Link>
            <Link to="/member/Leave">Leave</Link>
          </Dropdown>
        )}
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default Header;
