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
  LargeProfileImage,
  UserName,
  DropdownLink,
} from "../style/Header.styles";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../components/auth/store/userInfo";

// props 타입 정의
interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const userInfo = useSelector(selectUserInfo);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isAnimatingOut, setAnimatingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 드롭다운 토글
  const toggleDropdown = () => {
    isDropdownVisible ? closeDropdown() : setDropdownVisible(true);
  };

  // 닫기 애니메이션 처리
  const closeDropdown = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setAnimatingOut(false);
      setDropdownVisible(false);
    }, 300);
  };

  // 🔸 프로필 이미지 처리 (캐시 방지 포함)
  const rawImage = userInfo?.profileImage?.trim();
  const profileImg =
    rawImage && rawImage !== ""
      ? `${rawImage}?v=${Date.now()}`
      : "/img/default-profile.png";

  return (
    <HeaderWrapper className="flex justify-between items-center">
      {/* 왼쪽: 사이드바 토글 + 로고 */}
      <div className="flex items-center gap-4 basis-1/4">
        <button onClick={onSidebarToggle}>
          <SidebarIcon src={sidebarIcon} />
        </button>
        <Link to={"/"}>
          <Logo src={PGLogo} />
        </Link>
      </div>

      {/* 중앙: 검색창 */}
      <div className="basis-2/4">
        <SearchBox />
      </div>

      {/* 오른쪽: 닉네임 + 로그아웃 + 드롭다운 */}
      <HeaderRight
        className="basis-1/4 justify-end items-center gap-2"
        ref={dropdownRef}
      >
        {/* 닉네임 클릭 시 드롭다운 열림 */}
        <HideName
          className="text-white cursor-pointer hover:text-gray-400 transition-colors duration-200"
          onClick={toggleDropdown}
        >
          {userInfo?.username || ""}
        </HideName>

        <LoginOut />

        {/* 드롭다운 메뉴 */}
        {isDropdownVisible && (
          <Dropdown $animateOut={isAnimatingOut}>
            <LargeProfileImage src={profileImg} />
            <UserName>{userInfo?.nickname || userInfo?.username}</UserName>

            <DropdownLink to="/member/profile">Profile</DropdownLink>
            <DropdownLink to="/member/dashboard">Dashboard</DropdownLink>
            <DropdownLink to="/member/library">Library</DropdownLink>
            <DropdownLink to="/member/wallet">Wallet</DropdownLink>
            <DropdownLink to="/member/cartpage">CartPage</DropdownLink>
            <DropdownLink to="/member/wishlist">WishList</DropdownLink>

            {/* USER 권한이 있는 경우에만 Q&N 메뉴 표시 */}
            {Array.isArray(userInfo?.roles) &&
              userInfo.roles.some((r: { role: string }) =>
                r.role.includes("USER")
              ) && <DropdownLink to="/member/memberService">Q&N</DropdownLink>}

            <DropdownLink to="/member/Leave">Leave</DropdownLink>
          </Dropdown>
        )}
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default Header;
