import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

// 🔷 Layout에서 전달되는 Context 타입 (사이드바 열림 여부)
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 🔷 전체 페이지를 감싸는 컨테이너 - 사이드바 열림 상태에 따라 margin 조정
const PageWrapper = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2em;
  background: linear-gradient(135deg, #1e1f24, #2b2b2b);
  box-sizing: border-box;
  margin-left: ${(props) => (props.isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// 🔷 대시보드 전체 박스 스타일
const DashboardBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #2b2b2b;
  border-radius: 16px;
  padding: 40px;
  color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

// 🔷 대시보드 타이틀
const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  background: linear-gradient(to right, #00bcd4, #00e5ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// 🔷 각 정보 블록 (지갑, 게임 등)
const Section = styled.div`
  margin-bottom: 24px;
  background-color: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #00e5ff;
  }

  p,
  li {
    font-size: 16px;
    color: #ddd;
  }

  ul {
    padding-left: 20px;
    margin: 0;
  }
`;

// 🔷 대시보드 메인 컴포넌트
const Dashboard: React.FC = () => {
  // 👉 사이드바 상태 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // ✅ 더미 데이터 (향후 서버에서 받아올 수 있음)
  const recentGames = ["엘든 링", "스타듀 밸리", "디아블로 4"];
  const wallet = 15300;
  const libraryCount = 12;

  return (
    <PageWrapper isSidebarOpen={isSidebarOpen}>
      <DashboardBox>
        <Title>🎮 대시보드</Title>

        {/* 📌 보유 게임 */}
        <Section>
          <h3>보유 중인 게임</h3>
          <p>{libraryCount}개</p>
        </Section>

        {/* 📌 지갑 잔액 */}
        <Section>
          <h3>지갑 잔액</h3>
          <p>₩ {wallet.toLocaleString()}</p>
        </Section>

        {/* 📌 최근 플레이한 게임 */}
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
