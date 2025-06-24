// MainPage.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultGameResponse, GameResponse, GameResult } from "../types/types";
import { apiGetGameList } from "../components/api/api";
import Loader from "../components/common/Loader";
import { Link, useOutletContext, useLocation } from "react-router-dom";
import GameCard from "../components/api/GameCard";

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

// 타이틀 영역 스타일
const MainTitle = styled.h2<{ $isSidebarOpen: boolean }>`
  font-size: 4vw;
  line-height: 50px;
  font-weight: 700;
  padding-bottom: 1em;
  margin-right: 5%;
  margin-left: ${(props) => (props.$isSidebarOpen ? "250px" : "5%")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin: 0 5%;
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

  // 페이지 증가
  const pageNext = () => setPageCount((prev) => prev + 1);

  // 게임 리스트 불러오기
  const getGameList = (pageCount: number) => {
    setIsLoading(true);
    apiGetGameList(pageCount)
      .then((res) => {
        const results = [...gameResponse.results, ...res.results];
        setGameResponse({ ...res, results });
      })
      .finally(() => setIsLoading(false));
  };

  // 페이지 변경 시 API 호출
  useEffect(() => {
    getGameList(pageCount);
  }, [pageCount]);

  return (
    <div className="bg-[#1e1f24] text-white py-6 w-full mt-10">
      {/* 타이틀 */}
      <MainTitle $isSidebarOpen={isSidebarOpen}>Top picks</MainTitle>

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

      {/* 로딩 또는 더보기 */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center mt-8 h-35">
          <button
            type="button"
            className="w-24 h-12 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-center"
            style={{ marginTop: "2em", fontWeight: "600" }}
            onClick={pageNext}
          >
            더보기
          </button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
