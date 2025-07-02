// MainPage.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultGameResponse, GameResponse, GameResult } from "../types/types";
import { apiGetGameList } from "../components/api/api";
import Loader, { LoaderButton } from "../components/common/Loader";
import { Link, useOutletContext, useLocation } from "react-router-dom";
import GameCard from "../components/api/GameCard";
import mainBanner from "../img/mainBanner.png";

// 레이아웃 컨텍스트 타입 (사이드바 열림 여부)
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 메인 콘텐츠 컨테이너 스타일 (사이드바 여닫힘에 따라 margin 조정)
const MainContainer = styled.div<{ $isSidebarOpen: boolean }>`
  margin-right: 5%;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "5%")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 페이지 타이틀 스타일 정의
const MainTitle = styled.h2<{ $isSidebarOpen: boolean }>`
  font-size: 3.5vw;
  font-weight: 900;
  max-width: 90%;
  margin-left: ${(props) => (props.$isSidebarOpen ? "250px" : "5%")};
  margin-bottom: 2%;
  transition: margin-left 0.3s ease;
  background: linear-gradient(90deg, #ff512f, #dd2476);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  opacity: 0;
  animation: fadeInUp 1s ease forwards;

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    margin: 0 5%;
    font-size: 6vw;
  }
`;

// 메인 페이지 컴포넌트
const MainPage: React.FC = () => {
  // 레이아웃에서 context로 전달된 사이드바 상태 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [gameResponse, setGameResponse] =
    useState<GameResponse>(defaultGameResponse);
  const [pageCount, setPageCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoading, setfirstLoading] = useState(false);

  // 페이지 증가
  const pageNext = () => setPageCount((prev) => prev + 1);

  // 게임 리스트 불러오기
  // 더보기 요청 시
  const getGameList = (page: number) => {
    // 첫 로딩일 경우에만 firstLoading true
    if (page === 1) {
      setfirstLoading(true);
    } else {
      setIsLoading(true);
    }
    apiGetGameList(page)
      .then((res) => {
        const results =
          page === 1 ? res.results : [...gameResponse.results, ...res.results];
        setGameResponse({ ...res, results });
      })
      .finally(() => {
        setfirstLoading(false);
        setIsLoading(false);
      });
  };

  // 페이지 변경 시 API 호출
  useEffect(() => {
    getGameList(pageCount);
  }, [pageCount]);

  return (
    <div className="bg-[#1e1f24] text-white py-6 w-full mt-10">
      {/* 상단 제목 */}
      <MainTitle $isSidebarOpen={isSidebarOpen}>
        <img src={mainBanner} />
      </MainTitle>

      {/* 게임 카드 목록 */}
      <MainContainer
        $isSidebarOpen={isSidebarOpen}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        {gameResponse?.results?.map((item: GameResult, idx: number) => (
          <Link to={`/game/${item.id}`} key={idx}>
            <GameCard item={item} />
          </Link>
        ))}
      </MainContainer>

      {/* 초기 전체 로딩 상태일 때 */}
      {firstLoading ? (
        <Loader />
      ) : (
        // 더보기 버튼 or 로딩 버튼
        <div className="flex justify-center mt-8 h-35">
          {isLoading ? (
            <LoaderButton />
          ) : (
            <button
              type="button"
              className="w-24 h-12 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-center"
              style={{ marginTop: "2em", margin: "10px", fontWeight: "600" }}
              onClick={pageNext}
            >
              더보기
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
