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

// 전체 컨텐츠 컨테이너
const GenresContainer = styled.div<{ $isSidebarOpen: boolean }>`
  margin-right: 5%;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "5%")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 장르 버튼 가로 스크롤 영역
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

      // 마우스 호버 시 반전 효과
      &:hover {
        filter: invert(1);
      }
    }
  }
`;

// 게임 카드 그리드 레이아웃
const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Genres = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const scrollRef = useRef<HTMLDivElement>(null);

  // 표시용 장르명 (한글)
  const [selectedLabel, setSelectedLabel] = useState<string>("액션");

  // RAWG API 요청용 장르 슬러그
  const [selectedSlug, setSelectedSlug] = useState<string>("action");

  // 게임 API 응답 상태
  const [gameResponse, setGameResponse] =
    useState<GameResponse>(defaultGameResponse);

  // 현재 페이지 번호
  const [pageCount, setPageCount] = useState<number>(1);

  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);

  // 장르 목록 (label: 한글, value: RAWG 슬러그)
  const genreList = [
    { label: "레이싱", value: "racing" },
    { label: "슈팅", value: "shooter" },
    { label: "어드벤처", value: "adventure" },
    { label: "액션", value: "action" },
    { label: "롤플레잉 (RPG)", value: "role-playing-games-rpg" },
    { label: "격투", value: "fighting" },
    { label: "퍼즐", value: "puzzle" },
    { label: "전략", value: "strategy" },
    { label: "아케이드", value: "arcade" },
    { label: "시뮬레이션", value: "simulation" },
    { label: "스포츠", value: "sports" },
    { label: "카드", value: "card" },
    { label: "패밀리", value: "family" },
    { label: "보드 게임", value: "board-games" },
    { label: "교육", value: "educational" },
    { label: "캐주얼", value: "casual" },
    { label: "인디", value: "indie" },
    { label: "대규모 멀티플레이어", value: "massively-multiplayer" },
    { label: "플랫폼", value: "platformer" },
  ];

  // 장르 버튼 클릭 시 처리
  const GenreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const label = e.currentTarget.dataset.label as string;
    const slug = e.currentTarget.value;
    setSelectedLabel(label);
    setSelectedSlug(slug);
    setPageCount(1);
    setGameResponse(defaultGameResponse);
  };

  // 장르나 페이지가 바뀔 때 게임 목록 불러오기
  useEffect(() => {
    if (!selectedSlug) return;

    setIsLoading(true);
    apiGetGameGenres(selectedSlug, pageCount)
      .then((res) => {
        const results =
          pageCount === 1
            ? res.results
            : [...gameResponse.results, ...res.results];
        setGameResponse({ ...res, results });
      })
      .finally(() => setIsLoading(false));
  }, [selectedSlug, pageCount]);

  // 마우스 휠로 장르 버튼 가로 스크롤 이동 처리
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

  // 더보기 버튼 클릭 시 페이지 번호 증가
  const pageNext = () => setPageCount((prev) => prev + 1);

  return (
    <div className="bg-[#1e1f24] text-white py-6 w-full mt-10">
      {/* 장르 타이틀 */}
      <MainTitle $isSidebarOpen={isSidebarOpen}>
        장르: {selectedLabel}
      </MainTitle>

      <GenresContainer $isSidebarOpen={isSidebarOpen}>
        {/* 장르 버튼 영역 */}
        <GenreListWrapper ref={scrollRef}>
          <ul>
            {genreList.map((genre, i) => (
              <li key={i}>
                <button
                  type="button"
                  value={genre.value}
                  data-label={genre.label}
                  onClick={GenreClick}
                >
                  {genre.label}
                </button>
              </li>
            ))}
          </ul>
        </GenreListWrapper>

        {/* 게임 카드 출력 영역 */}
        <GameGrid>
          {gameResponse?.results?.map((item: GameResult, idx: number) => (
            <Link to={`/game/${item.id}`} key={idx}>
              <GameCard item={item} />
            </Link>
          ))}
        </GameGrid>

        {/* 로딩 또는 더보기 버튼 */}
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
