import { useParams } from "react-router-dom";
import { apiGetGameDetail } from "../api/api";
import { useEffect, useState } from "react";
import {
  defaultGameResult,
  GameResult,
  platformIcons,
  platformBorderColors,
} from "../types/types";
import styled from "styled-components";
import Loader from "../components/common/Loader";

// 본문 컨테이너 영역 (dominant_color를 연하게 배경으로 사용)
const ContentContainer = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) =>
    `${bgColor}20`}; // 연한 배경색 (투명도 적용)
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
`;

// About 영역 스타일 (styled-components 활용)
const GameAbout = styled.div`
  margin: 5% 5%;
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
        <div className="w-full min-h-screen bg-black text-white flex justify-center">
          {/* 본문 영역 전체 */}
          <div className="max-w-[80%] mx-auto w-full">
            {/* 상단 헤더 이미지 영역 */}
            <div
              className="w-full h-[300px] bg-cover bg-center"
              style={{ backgroundImage: `url(${gameDetail.background_image})` }}
            >
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                <h2 className="text-5xl font-bold">{gameDetail.name}</h2>
              </div>
            </div>

            {/* 본문 내용 - dominant_color 적용 */}
            <ContentContainer bgColor={gameDetail.dominant_color}>
              {/* 좋아요 및 장바구니 버튼 */}
              <div className="flex flex-col items-center my-10">
                <div className="flex gap-4">
                  <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-bold text-white">
                    ❤️ 좋아요
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-bold text-white">
                    🛒 장바구니
                  </button>
                </div>
              </div>

              {/* About 영역 (HTML description 파싱 출력) */}
              <GameAbout>
                <p className="text-2xl font-bold mb-2">About</p>
                <p
                  dangerouslySetInnerHTML={{ __html: gameDetail.description }}
                ></p>
              </GameAbout>

              {/* 상세 정보 영역 (2열 테이블 형태) */}
              <div className="grid grid-cols-2 gap-y-4 text-sm max-w-4xl mx-auto">
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
                {/* ✅ 플랫폼에 약어 + 색상 적용 */}
                <div className="flex gap-1 flex-wrap">
                  {gameDetail.parent_platforms.map((p) => {
                    const slug = p.platform.slug;
                    const platformName = platformIcons[slug];
                    if (!platformName) return null; // 등록되지 않은 slug는 제외
                    return (
                      <span
                        key={slug}
                        className="text-xs font-semibold px-2 py-0.5 rounded"
                        style={{
                          border: `1px solid ${
                            platformBorderColors[slug] || "#ccc"
                          }`,
                          color: "#fff",
                        }}
                      >
                        {platformName}
                      </span>
                    );
                  })}
                </div>
              </div>

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
                      className="bg-white/10 px-4 py-2 rounded-lg"
                    >
                      {s.store.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* 태그 영역 */}
              <div className="max-w-4xl mx-auto mt-8">
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
