import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

// Layout에서 전달되는 Context 타입 (사이드바 열림 여부)
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 전체 페이지를 감싸는 컨테이너
// 사이드바가 열려있을 때는 margin-left를 조정하고, 가운데 정렬 및 높이 100%로 설정
const PageWrapper = styled.div<{ isSidebarOpen: boolean }>`
  display: flex; /* 자식 요소를 가로 방향으로 배치 */
  justify-content: center; /* 가로 방향 가운데 정렬 */
  align-items: center; /* 세로 방향 가운데 정렬 */
  height: 100vh; /* 화면 세로 전체를 채움 */
  padding: 2em;
  background-color: #1e1f24;
  box-sizing: border-box;

  margin-left: ${(props) => (props.isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0; /* 모바일에서는 항상 0 */
  }
`;

// 대시보드 내용 박스
const DashboardBox = styled.div`
  width: 100%;
  max-width: 600px; /* 최대 너비 제한 */
  background-color: #2b2b2b;
  border-radius: 10px;
  padding: 30px;
  color: #fff;
`;

// 대시보드 타이틀 스타일
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
  text-align: center;
`;

// 개별 섹션(지갑, 보유 게임 등) 스타일
const Section = styled.div`
  margin-bottom: 20px;
  background-color: #1f1f1f;
  padding: 15px;
  border-radius: 5px;
`;

const Dashboard: React.FC = () => {
  // Layout.tsx에서 전달한 사이드바 열림 여부 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 더미 데이터 (향후 API 대체 가능)
  const recentGames = ["엘든 링", "스타듀 밸리", "디아블로 4"];
  const wallet = 15300;
  const libraryCount = 12;

  return (
    <PageWrapper isSidebarOpen={isSidebarOpen}>
      <DashboardBox>
        <Title>대시보드</Title>

        {/* 보유 게임 수 표시 */}
        <Section>
          <h3>보유 중인 게임</h3>
          <p>{libraryCount}개</p>
        </Section>

        {/* 지갑 잔액 표시 */}
        <Section>
          <h3>지갑 잔액</h3>
          <p>₩ {wallet.toLocaleString()}</p>
        </Section>

        {/* 최근 플레이한 게임 목록 */}
        <Section>
          <h3>최근 플레이한 게임</h3>
          <ul>
            {recentGames.map((game, idx) => (
              <li key={idx}>{game}</li>
            ))}
          </ul>
        </Section>
      </DashboardBox>
    </PageWrapper>
  );
};

export default Dashboard;
