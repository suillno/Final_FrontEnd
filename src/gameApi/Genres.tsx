import styled from "styled-components";
import gameImg from "../img/game.jpg";
import { useOutletContext } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

// 레이아웃 컨텍스트 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 🔹 페이지 타이틀
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

// 🔹 전체 컨테이너
const GenresContainer = styled.div<{ isSidebarOpen: boolean }>`
  margin-right: 5%;
  margin-left: ${(props) => (props.isSidebarOpen ? "300px" : "5%")};
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 🔹 장르 버튼 스크롤 리스트
const GenreListWrapper = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;

  /* 스크롤 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none; /* Firefox */

  ul {
    display: flex;
    flex-wrap: nowrap;
    gap: 10px;
    padding: 10px 0;

    /* 스크롤 숨기기 */
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none; /* Firefox */
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

      // 마우스 호버시 색변경
      &:hover {
        filter: invert(1);
      }
    }
  }
`;

// 🔹 게임 이미지 영역
const GameImg = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  img {
    width: calc(33.333% - 20px);
    max-width: 100%;
    border-radius: 8px;
    background-color: #555;
  }

  @media (max-width: 768px) {
    img {
      width: 100%;
    }
  }
`;

const Genres = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [games, setGames] = useState<any[]>([]);

  // 장르 버튼 동작
  const GenreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const genre = e.currentTarget.value;
    console.log(genre);
    // setSelectedGenre(genre); api 호출
  };

  // 🔹 RAWG API에서 사용하는 장르 슬러그(영문) 배열
  const genresEn = [
    "racing", // 레이싱
    "shooter", // 슈팅
    "adventure", // 어드벤처
    "action", // 액션
    "rpg", // 롤플레잉 (RPG)
    "fighting", // 격투
    "puzzle", // 퍼즐
    "strategy", // 전략
    "arcade", // 아케이드
    "simulation", // 시뮬레이션
    "sports", // 스포츠
    "card", // 카드
    "family", // 패밀리
    "board-games", // 보드 게임
    "educational", // 교육
    "casual", // 캐주얼
    "indie", // 인디
    "massively-multiplayer", // 대규모 멀티플레이어
    "platformer", // 플랫폼
  ];

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

  return (
    <div className="bg-[#1e1f24] text-white py-6 w-full mt-10">
      <MainTitle isSidebarOpen={isSidebarOpen}>Top picks</MainTitle>
      <GenresContainer isSidebarOpen={isSidebarOpen}>
        {/* 장르 버튼 스크롤 리스트 */}
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

        {/* 이미지 목록 */}
        <GameImg>
          {Array.from({ length: 6 }, (_, i) => (
            <img src={gameImg} alt="게임 이미지" key={i} />
          ))}
        </GameImg>
      </GenresContainer>
    </div>
  );
};

export default Genres;
