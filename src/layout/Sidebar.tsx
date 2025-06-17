import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarContainer = styled.nav<{ isOpen: boolean }>`
  width: 180px;
  height: 100vh;
  background-color: #1e1f24;
  color: white;
  padding: 20px;
  position: fixed;
  top: 60px;
  left: ${({ isOpen }) => (isOpen ? "0" : "-180px")};
  transition: left 0.3s ease;
  overflow-y: 1000;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 60px;
  }
`;

const SidebarClose = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

const SidebarIcon = styled.img`
  width: 32px;
  height: 32px;
  filter: invert(1);
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  color: #bbb;
`;

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

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <Section>
        <MenuItem className="font-bold">
          <Link to={"/"}>Home</Link>
        </MenuItem>
        {/* 리뷰 추천수, 신규순 조회 */}
        <MenuItem>Reviews</MenuItem>
        {/* 사용자페이지 */}
        <MenuItem>suillno 🔶</MenuItem>
        {/* 장바구니 */}
        <MenuItem>Wishlist</MenuItem>
        <MenuItem>My Library</MenuItem>
      </Section>

      <Section>
        <SectionTitle>Top</SectionTitle>
        <MenuItem>Best of the year</MenuItem>
        <MenuItem>Popular in 2024</MenuItem>
        <MenuItem>All time top 250</MenuItem>
      </Section>

      <Section>
        <SectionTitle>Browse</SectionTitle>
        <MenuItem>Platforms</MenuItem>
        <MenuItem>Stores</MenuItem>
        <MenuItem>Collections</MenuItem>
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar;
