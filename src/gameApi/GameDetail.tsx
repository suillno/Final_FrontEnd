import { useParams } from "react-router-dom";
import { apiGetGameDetail } from "../components/api/api";
import { useEffect, useState } from "react";
import {
  defaultGameResult,
  GameResult,
  platformIcons,
  platformBorderColors,
} from "../types/types";
import styled from "styled-components";
import Loader from "../components/common/Loader";
import SteamPrice from "../components/api/SteamPrice";

// 본문 컨테이너 영역 (dominant_color를 연하게 배경으로 사용)
const ContentContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) =>
    `${bgColor}20`}; // 연한 배경색 (투명도 적용)
  border-radius: 12px;

  @media (max-width: 768px) {
    font-size: 0.875rem; // 줄이고 싶다면 여기 유지
  }

  @media (max-width: 468px) {
    font-size: 0.7em;
    max-height: 180px;
  }
`;

// About 영역 스타일 (styled-components 활용)
const GameAbout = styled.div`
  margin: 5%;
  overflow-y: auto;

  div {
    max-height: 250px;
  }

  h2 {
    @media (max-width: 768px) {
      font-size: 1.5rem; // 줄이고 싶다면 여기 유지
    }

    @media (max-width: 468px) {
      font-size: 1.3em;
    }
  }
`;

// 양쪽배열 모바일환경시 한줄배열
const AboutBetween = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 468px) {
    flex-direction: column;
    align-items: center;
    font-size: 0.7em;
  }
`;

// div 영역 반투명 줄표기
const WhiteLine = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

// GameDetail 컴포넌트
const GameDetail = () => {
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // URL 파라미터에서 game id 추출
  const params = useParams();
  const { id } = params;

  // 게임 상세 정보 상태 초기화
  const [gameDetail, setGameDetail] = useState<GameResult>(defaultGameResult);

  // 컴포넌트 mount 시 상세정보 호출
  useEffect(() => {
    GetGameDetail();
  }, []);

  // 상세정보 API 호출 함수
  const GetGameDetail = () => {
    setIsLoading(true); // 로딩 시작
    if (id) {
      apiGetGameDetail(id)
        .then((res) => {
          setGameDetail(res);
          console.log(res); // 디버깅용 콘솔
        })
        .finally(() => setIsLoading(false)); // 로딩 종료
    }
  };

  return (
    <>
      {/* 로딩 중일 때 Loader 표시 */}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-12 w-full min-h-screen bg-black text-white flex justify-center">
          {/* 본문 영역 전체 */}
          <div className="max-w-[80%] mx-auto w-full">
            {/* 상단 헤더 이미지 영역 */}
            <div
              className="w-full h-[250px] bg-cover bg-center"
              style={{ backgroundImage: `url(${gameDetail.background_image})` }}
            >
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                <h2 className="text-5xl font-bold">{gameDetail.name}</h2>
              </div>
            </div>

            {/* 본문 내용 - dominant_color 적용 */}
            <ContentContainer bgColor={gameDetail.dominant_color}>
              {/* 양측배열 */}
              <AboutBetween>
                {/* About 영역 - 2/3 차지 768px 이하시 전체차지 */}
                <GameAbout className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-2">About</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: gameDetail.description,
                    }}
                  />
                </GameAbout>

                {/* 상세 정보 영역 - 1/3 차지 768px 이하시 전체차지 */}
                <WhiteLine className="md:w-1/3 md:mt-10 grid grid-cols-2 gap-y-1 text-sm max-w-[245px]">
                  <div className="font-bold text-gray-400">정상가</div>
                  <div>
                    <SteamPrice gameName={gameDetail.name} />
                  </div>
                  <div className="font-bold text-gray-400">출시일</div>
                  <div>{gameDetail.released}</div>
                  <div className="font-bold text-gray-400">평점</div>
                  <div>
                    {gameDetail.rating} / {gameDetail.rating_top}
                  </div>
                  <div className="font-bold text-gray-400">메타크리틱</div>
                  <div>{gameDetail.metacritic ?? "없음"}</div>
                  <div className="font-bold text-gray-400">플레이타임</div>
                  <div>{gameDetail.playtime}시간</div>
                  <div className="font-bold text-gray-400">장르</div>
                  <div>{gameDetail.genres.map((g) => g.name).join(", ")}</div>
                  <div className="font-bold text-gray-400">플랫폼</div>
                  <div className="flex gap-1 flex-wrap">
                    {gameDetail.parent_platforms.map((p) => {
                      const slug = p.platform.slug;
                      const platformName = platformIcons[slug];
                      if (!platformName) return null;
                      return (
                        <span
                          key={slug}
                          className="inline-block text-[11px] font-semibold px-2 rounded border"
                          style={{
                            border: `1px solid ${
                              platformBorderColors[slug] || "#ccc"
                            }`,
                            color: "#fff",
                            height: "20px",
                            lineHeight: "20px", // ✅ 텍스트를 수직 가운데로 맞춤
                            verticalAlign: "middle",
                          }}
                        >
                          {platformName}
                        </span>
                      );
                    })}
                  </div>
                  {/* 좋아요 및 장바구니 버튼 영역 */}
                  <div className="my-2 text-center">
                    {" "}
                    {/* ✅ 텍스트 정렬 기준으로 가운데 정렬 */}
                    <div className="inline-block whitespace-nowrap">
                      <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-5 rounded shadow mr-2">
                        장바구니
                      </button>
                      <button className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-5 rounded shadow border border-gray-300">
                        위시리스트
                      </button>
                    </div>
                  </div>
                </WhiteLine>
              </AboutBetween>

              {/* 구매 스토어 영역 */}
              <div className="max-w-4xl mx-auto mt-8">
                <div className="font-bold text-gray-400 mb-2">구매 스토어</div>
                <div className="flex flex-wrap gap-3">
                  {gameDetail.stores.map((s, idx) => (
                    <a
                      key={idx}
                      href={`https://${s.store.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-white transition-colors"
                    >
                      {s.store.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* 태그 영역 */}
              <div className="max-w-4xl mx-auto mt-8 text-sm sm:text-base md:text-lg hidden sm:block">
                <div className="font-bold text-gray-400 mb-2">태그</div>
                <div className="flex flex-wrap gap-2">
                  {gameDetail.tags.slice(0, 20).map((t, idx) => (
                    <span
                      key={idx}
                      className="bg-white/10 px-3 py-1 rounded-full text-sm"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </ContentContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetail;
