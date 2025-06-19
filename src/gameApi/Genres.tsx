import styled from "styled-components";
import gameImg from "../img/game.jpg";
import { useOutletContext } from "react-router-dom";
import React, { useRef, useEffect } from "react";

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

  // 🔹 마우스 휠을 가로 스크롤로 전환
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return; // 수직 스크롤이 없으면 무시
      e.preventDefault(); // 수직 스크롤 막기
      el.scrollLeft += e.deltaY; // 수직 입력을 가로로 전환
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
            {Array.from({ length: 14 }, (_, i) => (
              <li key={i}>
                <button type="button">게임장르</button>
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
