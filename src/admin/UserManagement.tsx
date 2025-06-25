import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import UserList from "./userManagement/UserList";

// ===== 레이아웃에서 전달받는 Context 타입 정의 ===== //
interface LayoutContext {
  isSidebarOpen: boolean; // 사이드바 열림 여부
}

// ===== 스타일 정의 ===== //

// 전체 페이지 컨테이너 - 사이드바 상태에 따라 왼쪽 여백 조정
const Container = styled.div<{ $isSidebarOpen: boolean }>`
  padding: 2rem;
  margin-left: ${(props) => (props.$isSidebarOpen ? "200px" : "5%")};
  transition: margin-left 0.3s ease;
  color: white;
`;

// 페이지 타이틀
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 150px 0 1rem 30px; // 상단 여백 확보 + 왼쪽 정렬
`;

// ===== 메인 컴포넌트 ===== //
const UserManagement: React.FC = () => {
  // 레이아웃으로부터 사이드바 열림 여부 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  return (
    <Container $isSidebarOpen={isSidebarOpen}>
      <Title>회원 관리</Title>
      <UserList />
    </Container>
  );
};

export default UserManagement;
