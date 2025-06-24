// GameLongPlayList.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { defaultGameResponse, GameResponse, GameResult } from "../types/types";
import { apiGetGameTime } from "../components/api/api";
import Loader from "../components/common/Loader";
import { Link, useOutletContext } from "react-router-dom";
import GameCard from "../components/api/GameCard";

// 헤더에서 입력받은 값이 있으면 타이틀로 서치 동작

// 레이아웃 컨텍스트 타입 (사이드바 열림 여부 확인용)
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 메인 그리드 컨테이너 스타일 정의
const MainContainer = styled.div<{ isSidebarOpen: boolean }>`
  margin-right: 5%;
  margin-left: ${(props) => (props.isSidebarOpen ? "300px" : "5%")};
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 페이지 타이틀 스타일 정의
const MainTitle = styled.h2<{ isSidebarOpen: boolean }>`
  font-size: 4vw;
  line-height: 50px;
  font-weight: 700;
  padding-bottom: 1em;
  margin-right: 5%;
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "5%")};
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 메인 페이지 컴포넌트 정의
const GameLongPlayList: React.FC = () => {
  // 레이아웃에서 사이드바 열림 여부 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 게임 목록, 페이지, 로딩 상태 관리
  const [gameResponse, setGameResponse] =
    useState<GameResponse>(defaultGameResponse);
  const [pageCount, setPageCount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지 증가 함수 (더보기 버튼 클릭 시 호출)
  const pageNext = () => setPageCount((prev) => prev + 1);

  // RAWG API 호출하여 게임 리스트 불러오기
  const getGameTime = (pageCount: number) => {
    setIsLoading(true);
    apiGetGameTime("2024", pageCount)
      .then((res) => {
        if (!res) return;
        // 기존 게임 결과에 새 결과 추가
        const results = [...gameResponse.results, ...res.results];
        setGameResponse({ ...res, results });
      })
      .finally(() => setIsLoading(false));
  };

  // 페이지 변경될 때마다 게임 리스트 불러오기
  useEffect(() => {
    getGameTime(pageCount);
  }, [pageCount]);

  return (
    <div className="bg-[#1e1f24] text-white py-6 w-full mt-10">
      {/* 상단 제목 */}
      <MainTitle isSidebarOpen={isSidebarOpen}>BEST Time</MainTitle>

      {/* 게임 카드 목록 영역 */}
      <MainContainer
        isSidebarOpen={isSidebarOpen}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        {/* 값이 null 일때를 대비 옵셔널 체이닝사용 */}
        {gameResponse?.results?.map((item: GameResult, idx: number) => (
          <Link to={`/game/${item.id}`} key={idx}>
            <GameCard item={item} />
          </Link>
        ))}
      </MainContainer>

      {/* 로딩 스피너 또는 더보기 버튼 */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center mt-8 h-35 ">
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

export default GameLongPlayList;
