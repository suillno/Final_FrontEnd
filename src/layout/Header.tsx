import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import sidebarIcon from "../img/sidebar.png";
import PGLogo from "../img/PGLogo.png";
import SearchBox from "../components/common/SearchBox";
import { Link } from "react-router-dom";

// ======================= 🔸 드롭다운 애니메이션 정의 =======================

// 열릴 때: 위에서 아래로 서서히 나타나는 효과
const dropdownFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 닫힐 때: 아래에서 위로 사라지는 효과
const dropdownFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

// ======================= 🔸 스타일 컴포넌트 =======================

// 헤더 전체 영역 (고정 위치)
const HeaderWrapper = styled.header`
  position: fixed;
  background-color: #3b3e45;
  width: 100%;
  padding: 10px 24px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

// 사이드바 토글 아이콘 버튼
const SidebarIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(1); // 흰색화 처리
`;

// 로고 이미지
const Logo = styled.img`
  width: 100%;
  max-width: 3.2em;
  height: auto;

  &:hover {
    filter: invert(1); // 반전 효과
  }

  @media (max-width: 468px) {
    display: none;
  }
`;

// 로그인/닉네임 영역
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }
`;

// 닉네임 텍스트 (모바일에서는 숨김)
const HideName = styled.a`
  font-size: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 드롭다운 스타일 (애니메이션 포함)
const Dropdown = styled.div<{ animateOut: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #2a2a2e;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  min-width: 180px;
  z-index: 2000;

  // 열림/닫힘에 따라 애니메이션 선택
  animation: ${({ animateOut }) =>
      animateOut ? dropdownFadeOut : dropdownFadeIn}
    0.5s ease forwards;

  a {
    display: block;
    padding: 12px 18px;
    color: #ffffff;
    font-size: 0.95rem;
    text-decoration: none;
    transition: background-color 0.25s ease, padding-left 0.25s ease;

    &:hover {
      background-color: #3e3f47;
      padding-left: 22px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #444;
    }
  }
`;

// ======================= 🔸 Header 컴포넌트 =======================

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false); // 드롭다운 보임 여부
  const [isAnimatingOut, setAnimatingOut] = useState(false); // 닫히는 중 여부
  const dropdownRef = useRef<HTMLDivElement>(null); // 외부 클릭 감지용 ref

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

  // 닉네임 클릭 시 토글
  const toggleDropdown = () => {
    if (isDropdownVisible) {
      closeDropdown();
    } else {
      setDropdownVisible(true);
    }
  };

  // 드롭다운 닫기 로직 (0.5초 후 완전 제거)
  const closeDropdown = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      setAnimatingOut(false);
      setDropdownVisible(false);
    }, 500);
  };

  return (
    <HeaderWrapper className="flex justify-between items-center">
      {/* 좌측: 사이드바 버튼 + 로고 */}
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

      {/* 우측: 닉네임, 로그인, 드롭다운 */}
      <HeaderRight className="basis-1/4 justify-end" ref={dropdownRef}>
        <HideName onClick={toggleDropdown}>닉네임</HideName>

        {/* 로그인 버튼 */}
        <Link to={"/member/login"}>
          <a>로그인</a>
        </Link>

        {/* 드롭다운 메뉴 */}
        {isDropdownVisible && (
          <Dropdown animateOut={isAnimatingOut}>
            <Link to="/member/profile">Profile</Link>
            <Link to="/member/dashboard">Dashboard</Link>
            <Link to="/member/library">Library</Link>
            <Link to="/member/wallet">Wallet</Link>
            <Link to="/member/cartpage">CartPage</Link>
            <Link to="/member/wishlist">WishList</Link>
          </Dropdown>
        )}
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default Header;
