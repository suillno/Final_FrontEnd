import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";
import { apiUserDashboard } from "../../components/api/backApi";
import Wallet from "./Wallet";

// 🔷 Layout에서 전달받는 Context 타입 (사이드바 열림 여부)
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 🔷 최근 구매한 게임 정보 타입 (게임명 + 구매일자)
interface GamePurchase {
  name: string;
  date: string;
}
// 🔷 대시보드 API 응답 타입
interface DashBoardItem {
  title: string;
  createdAt: string;
  balance: number;
  gameCount: number;
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
    margin-left: 0;
    padding: 1.5em;
  }

  @media (max-width: 460px) {
    padding: 1em;
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
  @media (max-width: 768px) {
    padding: 30px 24px;
  }

  @media (max-width: 460px) {
    padding: 20px 16px;
  }
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
  @media (max-width: 768px) {
    font-size: 30px;
  }
  @media (max-width: 460px) {
    font-size: 20px;
  }
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
    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 460px) {
      font-size: 14px;
    }
  }

  // 일반 텍스트와 리스트 항목 공통 스타일
  p,
  li {
    font-size: 16px;
    color: #ddd;
    display: flex; // 게임명 + 날짜 수평 정렬
    justify-content: space-between; // 좌우 양쪽 정렬
    word-break: break-word;
    flex-wrap: wrap;
    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 460px) {
      font-size: 12px;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
    }
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
  const userInfo = useSelector(selectUserInfo);
  const [dashboardData, setDashboardData] = useState<DashBoardItem[]>([]);
  const balance = dashboardData[0]?.balance ?? 0;
  const libraryCount = dashboardData[0]?.gameCount ?? 0;

  // 최근 구매한 3개만 추출
  const recentGames: GamePurchase[] = dashboardData.map((item) => ({
    name: item.title,
    date: item.createdAt.replace("T", " ").slice(0, 19),
  }));

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!userInfo?.username) return;
      const data = await apiUserDashboard(userInfo.username);
      console.log("대시보드 데이터:", data);
      setDashboardData(data);
    };
    fetchDashboard();
  }, [userInfo]);

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
          <p>₩ {balance.toLocaleString()}</p>
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
