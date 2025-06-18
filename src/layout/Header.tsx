// ✅ Header.tsx
import React from "react";
import styled from "styled-components";
import sidebarIcon from "../img/sidebar.png";
import PGLogo from "../img/PGLogo.png";
import SearchBox from "../components/common/SearchBox";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3b3e45;
  padding: 12px 24px;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const HideName = styled.a`
  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(1);
  margin-left: 24px;
`;

const Logo = styled.img`
  width: 100%; /* 부모 요소 기준 100% */
  max-width: 70px; /* 최대 너비 제한 */
  height: auto; /* 비율 유지하면서 높이 자동 */
  &:hover {
    filter: invert(1);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    padding: 5px;
    border-radius: 4px;
    border: none;
  }

  a {
    color: #fff;
    text-decoration: none;
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
    <HeaderWrapper>
      <div className="flex">
        <Logo src={PGLogo} />
        <button className="ml-10" onClick={onSidebarToggle}>
          <SidebarIcon src={sidebarIcon} />
        </button>
      </div>
      <SearchBox />
      <HeaderRight>
        <HideName>닉네임</HideName>
        <a href="member/login.html">로그인</a>
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default Header;
