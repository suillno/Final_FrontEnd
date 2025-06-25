import React from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

// 🔷 Layout에서 전달받는 Context 타입 (사이드바 열림 여부)
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 🔷 최근 구매한 게임 정보 타입 (게임명 + 구매일자)
interface GamePurchase {
  name: string;
  date: string;
}

// 🔷 전체 페이지를 감싸는 wrapper - 사이드바 상태에 따라 왼쪽 여백 조절
const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2em;
  background: linear-gradient(135deg, #1e1f24, #2b2b2b); // 배경 그라데이션
  box-sizing: border-box;
  margin-left: ${(props) =>
    props.$isSidebarOpen
      ? "300px"
      : "0"}; // 사이드바 열림 여부에 따라 margin 조절
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0; // 모바일에서는 사이드바 무시
  }
`;

// 🔷 대시보드 본체 스타일 - 카드 스타일로 디자인
const DashboardBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #2b2b2b;
  border-radius: 16px;
  padding: 40px;
  color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); // 그림자 효과
`;

// 🔷 상단 타이틀 스타일 - 그라데이션 텍스트
const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  background: linear-gradient(
    to right,
    #00bcd4,
    #00e5ff
  ); // 텍스트에 그라데이션 효과
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

// 🔷 개별 정보 섹션 스타일 (게임 수 / 지갑 잔액 / 최근 구매 게임)
const Section = styled.div`
  margin-bottom: 24px;
  background-color: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  transition: transform 0.2s ease;

  // 마우스 호버 시 위로 살짝 이동 + 그림자 강조
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  // 제목 스타일
  h3 {
    margin: 0 0 10px 0;
    font-size: 18px;
    color: #00e5ff;
  }

  // 일반 텍스트와 리스트 항목 공통 스타일
  p,
  li {
    font-size: 16px;
    color: #ddd;
    display: flex; // 게임명 + 날짜 수평 정렬
    justify-content: space-between; // 좌우 양쪽 정렬
  }

  // 리스트 스타일 초기화
  ul {
    padding-left: 0;
    margin: 0;
  }
`;

// 🔷 대시보드 메인 컴포넌트
const Dashboard: React.FC = () => {
  // 👉 Layout.tsx에서 전달받은 사이드바 열림 상태
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // ✅ 더미 데이터 (향후 서버에서 받아올 수 있음)
  const recentGames: GamePurchase[] = [
    { name: "엘든 링", date: "2025-06-10" },
    { name: "스타듀 밸리", date: "2025-06-05" },
    { name: "디아블로 4", date: "2025-06-01" },
  ];

  const wallet = 15300; // 지갑 잔액 (₩ 단위)
  const libraryCount = 12; // 보유 중인 게임 수

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <DashboardBox>
        <Title>🎮 대시보드</Title>

        {/* 📌 보유 중인 게임 수 표시 */}
        <Section>
          <h3>보유 중인 게임</h3>
          <p>{libraryCount}개</p>
        </Section>

        {/* 📌 지갑 잔액 표시 */}
        <Section>
          <h3>지갑 잔액</h3>
          <p>₩ {wallet.toLocaleString()}</p>
        </Section>

        {/* 📌 최근 구매한 게임 목록 (게임명 + 날짜) */}
        <Section>
          <h3>최근 구매한 게임</h3>
          <ul>
            {recentGames.map((game, idx) => (
              <li key={idx}>
                <span>{game.name}</span>
                <span style={{ color: "#888" }}>{game.date}</span>
              </li>
            ))}
          </ul>
        </Section>
      </DashboardBox>
    </PageWrapper>
  );
};

export default Dashboard;
