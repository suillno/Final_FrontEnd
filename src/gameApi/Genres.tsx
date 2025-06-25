import styled from "styled-components";
import { useOutletContext, Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { apiGetGameGenres } from "../components/api/api";
import { defaultGameResponse, GameResponse, GameResult } from "../types/types";
import GameCard from "../components/api/GameCard";
import Loader from "../components/common/Loader";

// 레이아웃 사이드바 상태 확인용 타입 정의
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 페이지 상단 타이틀 스타일
const MainTitle = styled.h2<{ $isSidebarOpen: boolean }>`
  font-size: 3.5vw;
  font-weight: 900;
  margin-left: ${(props) => (props.$isSidebarOpen ? "250px" : "5%")};
  transition: margin-left 0.3s ease;

  background: linear-gradient(90deg, #6dd5fa, #2980b9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  display: inline-block;
  animation: wave 2s infinite ease-in-out;

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(1.5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-1.5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @media (max-width: 768px) {
    margin: 0 5%;
    font-size: 6vw;
  }
`;

// 전체 영역 컨테이너 스타일
const GenresContainer = styled.div<{ $isSidebarOpen: boolean }>`
  margin-right: 5%;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "5%")};
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 장르 버튼 가로 스크롤 영역 스타일
const GenreListWrapper = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  ul {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    padding: 10px 0;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
  }

  li {
    flex: 0 0 auto;
    button {
      min-width: 150px;
      border-radius: 5px;
      background-color: #4b7bec;
      padding: 5px 10px;
      color: white;
      font-size: 14px;

      // 마우스 호버 시 색 반전
      &:hover {
        filter: invert(1);
      }
    }
  }
`;

// 게임 카드 그리드 영역 스타일
const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Genres = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 초기 장르 선택값을 action으로 설정
  const [selectedGenre, setSelectedGenre] = useState<string>("action");

  // RAWG API 응답 상태
  const [gameResponse, setGameResponse] =
    useState<GameResponse>(defaultGameResponse);

  // 현재 페이지 번호 (더보기 누르면 증가)
  const [pageCount, setPageCount] = useState<number>(1);

  // API 호출 중 여부
  const [isLoading, setIsLoading] = useState(false);

  // RAWG에서 제공하는 장르 슬러그 목록
  const genresEn = [
    "racing",
    "shooter",
    "adventure",
    "action",
    "rpg",
    "fighting",
    "puzzle",
    "strategy",
    "arcade",
    "simulation",
    "sports",
    "card",
    "family",
    "board-games",
    "educational",
    "casual",
    "indie",
    "massively-multiplayer",
    "platformer",
  ];

  // 장르 버튼 클릭 시 실행
  // 선택된 장르 변경 후 페이지 및 결과 초기화
  const GenreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const genre = e.currentTarget.value;
    setSelectedGenre(genre);
    setPageCount(1);
    setGameResponse(defaultGameResponse);
  };

  // selectedGenre 또는 pageCount가 변경되면 게임 데이터 불러오기
  useEffect(() => {
    if (!selectedGenre) return;
    setIsLoading(true);
    apiGetGameGenres(selectedGenre, pageCount)
      .then((res) => {
        const results =
          pageCount === 1
            ? res.results
            : [...gameResponse.results, ...res.results];
        setGameResponse({ ...res, results });
      })
      .finally(() => setIsLoading(false));
  }, [selectedGenre, pageCount]);

  // 마우스 휠로 장르 버튼 가로 스크롤 이동 가능하도록 처리
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  // 페이지 번호 증가 (더보기 클릭 시)
  const pageNext = () => setPageCount((prev) => prev + 1);

  return (
    <div className="bg-[#1e1f24] text-white py-6 w-full mt-10">
      {/* 타이틀 영역 */}
      <MainTitle $isSidebarOpen={isSidebarOpen}>
        💠 Genre {selectedGenre}
      </MainTitle>
      <GenresContainer $isSidebarOpen={isSidebarOpen}>
        {/* 장르 버튼 리스트 */}
        <GenreListWrapper ref={scrollRef}>
          <ul>
            {genresEn.map((genre, i) => (
              <li key={i}>
                <button type="button" value={genre} onClick={GenreClick}>
                  {genre}
                </button>
              </li>
            ))}
          </ul>
        </GenreListWrapper>
        {/* 게임 카드 리스트 출력 */}
        <GameGrid>
          {gameResponse?.results?.map((item: GameResult, idx: number) => (
            <Link to={`/game/${item.id}`} key={idx}>
              <GameCard item={item} />
            </Link>
          ))}
        </GameGrid>
        {/* 로딩 중이면 로딩 컴포넌트, 아니면 더보기 버튼 */}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex justify-center mt-8 h-35">
            <button
              type="button"
              className="w-24 h-12 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-center"
              style={{ marginTop: "2em", margin: "10px", fontWeight: "600" }}
              onClick={pageNext}
            >
              더보기
            </button>
          </div>
        )}
      </GenresContainer>
    </div>
  );
};

export default Genres;
