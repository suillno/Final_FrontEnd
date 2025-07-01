import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// 사이드바 전체 컨테이너
// $isOpen은 styled-components 전용 props (DOM에는 전달되지 않음)
const SidebarContainer = styled.nav<{ $isOpen: boolean }>`
  width: 180px;
  height: 100vh;
  background-color: #1e1f24;
  color: white;
  padding: 20px;
  position: fixed;
  top: 50px;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "-180px")}; // 사이드바 열림 여부
  overflow: auto;
  transition: left 0.3s ease;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 50px;
  }
`;

// 메뉴 그룹 묶음
const Section = styled.div`
  margin-bottom: 24px;
`;

// 각 섹션의 제목 텍스트
const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #bbb;
`;

// 실제 메뉴 항목 스타일
const MenuItem = styled.div`
  padding: 8px 0;
  font-size: 15px;
  cursor: pointer;
  color: #e0e0e0;

  &:hover {
    color: #1ea7fd;
  }
`;

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// 사이드바 컴포넌트 본체
const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <SidebarContainer $isOpen={isOpen}>
      {/* 기본 메뉴 섹션 */}
      <Section>
        <MenuItem className="font-bold">
          <Link to="/">Home</Link>
        </MenuItem>
      </Section>

      {/* 인기 게임 관련 섹션 */}
      <Section>
        <SectionTitle>Top</SectionTitle>
        <MenuItem>
          <Link to="/game/GameLongPlayList">Longest Playtime</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/game/GameYearList">Popular in 2024</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/game/Genres">Genres</Link>
        </MenuItem>
      </Section>

      {/* 탐색 관련 섹션 */}
      <Section>
        <SectionTitle>Browse</SectionTitle>
        <MenuItem>Platforms</MenuItem>
        <MenuItem>Stores</MenuItem>
        <MenuItem>Collections</MenuItem>
      </Section>

      {/* 관리자 전용 메뉴 섹션 */}
      <Section>
        <SectionTitle>Admin</SectionTitle>
        <MenuItem>
          <Link to="/admin/Chart">Chart</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin/CustomerSupport">Customer Support</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin/ReviewManagement">Review Management</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin/UserManagement">User Management</Link>
        </MenuItem>
        <br />
        <br />
        <br />
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar;
