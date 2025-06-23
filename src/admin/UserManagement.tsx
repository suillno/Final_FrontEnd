import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import UserList from "./userManagement/UserList";

// ===== 레이아웃에서 전달받는 Context 타입 정의 ===== //
interface LayoutContext {
  isSidebarOpen: boolean; // 사이드바 열림 여부 (Layout에서 전달)
}

// ===== 스타일 정의 (styled-components) ===== //

// 메인 컨테이너: 사이드바 상태에 따라 좌측 마진 조절
const Container = styled.div<{ isSidebarOpen: boolean }>`
  padding: 2rem;
  margin-left: ${(props) => (props.isSidebarOpen ? "200px" : "5%")};
  transition: margin-left 0.3s ease; /* 사이드바 열고 닫을 때 부드럽게 */
  color: white;
`;

// 페이지 제목 스타일
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

// ===== 회원 관리 페이지 컴포넌트 ===== //
const UserManagement: React.FC = () => {
  // 레이아웃(Context)에서 사이드바 열림 상태 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  return (
    // 사이드바 상태에 따라 margin-left 조절
    <Container isSidebarOpen={isSidebarOpen}>
      {/* 페이지 제목 */}
      <Title style={{marginTop: "100px", marginLeft:"22px"}}>회원 관리</Title>

      {/* 유저 리스트 컴포넌트 렌더링 */}
      <UserList />
    </Container>
  );
};

export default UserManagement;
