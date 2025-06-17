import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  defaultGameResponse,
  GameResponse,
  GameResult,
  platformBorderColors,
  platformIcons,
} from "../types/types";
import { apiGetGameList } from "../api/api";
import Loader from "../components/common/Loader";
import { Link, useOutletContext } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// 레이아웃에서 Sidebar 상태값 가져오기 위한 Context 타입 정의
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 메인 컨테이너 스타일 (사이드바 열림 여부에 따라 margin 조절)
const MainContainer = styled.div<{ isSidebarOpen: boolean }>`
  margin-right: 5%;
  margin-left: ${(props) => (props.isSidebarOpen ? "300px" : "5%")};
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 페이지 상단 타이틀 스타일
const MainTitle = styled.h2<{ isSidebarOpen: boolean }>`
  font-size: 4vw;
  line-height: 74px;
  font-weight: 700;
  padding: 1em;
  margin-right: 5%;
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "5%")};
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 개별 게임 카드 스타일 (hover시 확대 애니메이션)
const GameCard = styled.div`
  background-color: #2a2b32;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
`;

// 항상 표시되는 기본 정보 (게임 이미지 아래 정보 영역)
const InfoSection = styled.div`
  padding: 0.8rem;
  color: white;
  background-color: #1e1f24;
`;

// hover 시 표시될 오버레이 상세 정보 (이미지 위에 덮음)
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 31, 36, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 1rem;
  color: white;
  ${GameCard}:hover & {
    opacity: 1;
  }
`;

// 메인 페이지 컴포넌트
const MainPage: React.FC = () => {
  // 부모 레이아웃에서 Sidebar 상태 받아오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 게임 목록 상태값 초기화 (기본 response 구조 사용)
  const [gameResponse, setGameResponse] =
    useState<GameResponse>(defaultGameResponse);
  // 페이지 번호 상태 (페이징에 사용)
  const [pageCount, setPageCount] = useState<number>(1);
  // 로딩 상태값 (로더 표시 여부)
  const [isLoading, setIsLoading] = useState(false);

  // 페이지 증가 함수 (더보기 버튼 클릭시 호출)
  const pageNext = () => setPageCount((prev) => prev + 1);

  // API 호출 함수 (게임 리스트 불러오기)
  const getGameList = (pageCount: number) => {
    setIsLoading(true); // 로딩 시작
    apiGetGameList(pageCount)
      .then((res) => {
        // 기존 데이터 + 새 데이터 합치기 (무한스크롤형 누적 방식)
        const results = [...gameResponse.results, ...res.results];
        setGameResponse({ ...res, results });
      })
      .finally(() => setIsLoading(false)); // 로딩 종료
  };

  // 페이지 번호 변경될 때마다 게임 리스트 자동 호출
  useEffect(() => {
    getGameList(pageCount);
  }, [pageCount]);

  return (
    <div className="bg-[#1e1f24] text-white py-6 w-full">
      {/* 페이지 상단 타이틀 */}
      <MainTitle isSidebarOpen={isSidebarOpen}>Top picks</MainTitle>

      {/* 게임 카드 리스트 영역 (반응형 그리드 사용) */}
      <MainContainer
        isSidebarOpen={isSidebarOpen}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        {gameResponse.results.map((item: GameResult, idx: number) => (
          <Link to={`/game/${item.id}`} key={idx}>
            <GameCard>
              {/* 게임 이미지 출력 (해상도 최적화) */}
              <img
                src={`https://media.rawg.io/media/resize/640/-/${
                  item.background_image.split("/media/")[1]
                }`}
                alt={item.name}
                className="w-full h-[174px] md:h-[300px] bg-[#555] object-cover"
              />

              {/* 항상 표시될 기본 게임 정보 */}
              <InfoSection>
                <div className="flex justify-between items-center">
                  {/* 왼쪽: 게임명 */}
                  <div className="font-bold text-lg">{item.name}</div>
                  {/* 오른쪽: 원형 평점 */}
                  <div style={{ width: 50, height: 50 }}>
                    <CircularProgressbar
                      value={(item.rating / 5) * 100}
                      text={`${item.rating.toFixed(1)}`}
                      styles={buildStyles({
                        textSize: "28px",
                        pathColor: "#00bfff",
                        textColor: "#red",
                        trailColor: "#444",
                      })}
                    />
                  </div>
                </div>

                {/* 하단 출시일 */}
                <div className="flex justify-between text-sm mt-1">
                  <span>출시: {item.released ?? "미정"}</span>
                </div>
              </InfoSection>

              {/* hover 시 상세정보 오버레이 표시 */}
              <Overlay>
                <div>장르: {item.genres.map((g) => g.name).join(", ")}</div>
                <div>추가정보 준비 가능</div>
              </Overlay>
            </GameCard>
          </Link>
        ))}
      </MainContainer>

      {/* 로딩중 로더 표시 or '더보기' 버튼 출력 */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center mt-8 h-35 ">
          <button
            type="button"
            className="w-24 h-12 bg-blue-500 text-white rounded text-center"
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
