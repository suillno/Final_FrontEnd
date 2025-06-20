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
  overflow-y: auto;
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

  a {
    color: inherit;
    text-decoration: none;
  }

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
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>Reviews</MenuItem>
        <MenuItem>suillno 🔶</MenuItem>
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

      <Section>
        <SectionTitle>Admin</SectionTitle>
        <MenuItem>
          <Link to="/admin/Chart">Chart</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin/CustomerSupport">CustomerSupport</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin/ReviewManagement">ReviewManagement</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/admin/UserManagement">UserManagement</Link>
        </MenuItem>
        <br/><br/><br/>
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar;
