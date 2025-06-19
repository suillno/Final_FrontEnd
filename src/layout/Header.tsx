// ✅ Header.tsx
import React from "react";
import styled from "styled-components";
import sidebarIcon from "../img/sidebar.png";
import PGLogo from "../img/PGLogo.png";
import SearchBox from "../components/common/SearchBox";

// ✅ 헤더 전체 감싸는 스타일드 컴포넌트
const HeaderWrapper = styled.header`
  background-color: #3b3e45;
  width: 100%;
  padding: 10px 24px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

// ✅ 닉네임 링크 - 모바일에선 안 보이고, 폰트 크기도 줄이기
const HideName = styled.a`
  font-size: 1rem;

  @media (max-width: 768px) {
    display: none; // 모바일에서 숨기기
    font-size: 0.875rem; // 줄이고 싶다면 여기 유지
  }
`;

// ✅ 사이드바 아이콘 이미지
const SidebarIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(1);
`;

// 중앙 서치박스 우측정렬
const CenterIcon = styled.div`
  display: flex;
  justify-content: end;
`;

// ✅ 로고 이미지
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

// ✅ 오른쪽 로그인 영역
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  // 텍스트와 버튼 스타일
  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.875rem; // 모바일에서 글자 줄이기
    }
  }

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }
`;

interface HeaderProps {
  onSidebarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSidebarToggle }) => {
  return (
    // ✅ 상단 고정 헤더 레이아웃
    <HeaderWrapper className="flex justify-between items-center">
      {/* 좌측: 사이드바 버튼 + 로고 */}
      <div className="flex items-center gap-4 basis-1/4">
        <button onClick={onSidebarToggle}>
          <SidebarIcon src={sidebarIcon} />
        </button>
        <Logo src={PGLogo} />
      </div>

      {/* 중앙: 검색창 - 가운데 정렬 + 모바일에서 줄이면 text-sm 대응 */}
      <div className="basis-2/4">
        <SearchBox />
      </div>

      {/* 우측: 닉네임 + 로그인 */}
      <HeaderRight className="basis-1/4 justify-end">
        <HideName className="text-base sm:text-sm">닉네임</HideName>
        <a href="member/login.html" className="text-sm sm:text-base md:text-lg">
          로그인
        </a>
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default Header;
