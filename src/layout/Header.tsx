import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import sidebarIcon from "../img/sidebar.png";
import PGLogo from "../img/PGLogo.png";
import SearchBox from "../components/common/SearchBox";
import { Link } from "react-router-dom";

// 헤더 전체 감싸는 스타일드 컴포넌트
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

// 닉네임 링크 - 모바일에선 안 보이고, 폰트 크기도 줄이기
const HideName = styled.a`
  font-size: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
    font-size: 0.875rem;
  }
`;

// 사이드바 아이콘 이미지
const SidebarIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(1);
`;

// 로고 이미지
const Logo = styled.img`
  width: 100%;
  max-width: 3.2em;
  height: auto;

  &:hover {
    filter: invert(1);
  }

  @media (max-width: 468px) {
    display: none;
  }
`;

// 오른쪽 로그인 영역
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

// ✅ 드롭다운 박스 (추가)
const Dropdown = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #2a2a2a;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  z-index: 2000;

  div {
    margin-bottom: 6px;
    white-space: nowrap;
  }
`;

// Props 타입
interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  // ✅ 드롭다운 상태 및 외부 클릭 감지용 ref
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    // 상단 고정 헤더 레이아웃
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

      {/* 중앙: 검색창 - 가운데 정렬 */}
      <div className="basis-2/4">
        <SearchBox />
      </div>
      {/* 우측: 닉네임 + 로그인 + 드롭다운 */}
      <HeaderRight className="basis-1/4 justify-end" ref={dropdownRef}>
        {/* ✅ 닉네임 클릭 시 드롭다운 토글 */}
        <HideName onClick={() => setDropdownOpen((prev) => !prev)}>
          닉네임
        </HideName>
        {/* 로그인 링크 */}
        <a href="member/login.html" className="text-sm sm:text-base md:text-lg">
          로그인
        </a>

        {/* ✅ 드롭다운 UI */}
        {isDropdownOpen && (
          <Dropdown>
            <div>Profile</div>
            <div>Dashboard</div>
            <div>Library</div>
            <div>Wallet</div>
            <div>CartPage</div>
            <div>WishList</div>
          </Dropdown>
        )}
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default Header;
