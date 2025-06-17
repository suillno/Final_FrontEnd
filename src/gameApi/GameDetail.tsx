import { useParams } from "react-router-dom";
import { apiGetGameDetail } from "../api/api";
import { useEffect, useState } from "react";
import { defaultGameResult, GameResult } from "../types/types";
import styled from "styled-components";

const GameDetail = () => {
  // game id 가져오기
  const params = useParams();
  const { id } = params;
  // 게임상세정보 저장
  const [gameDetail, setGaemDetail] = useState<GameResult>(defaultGameResult);

  // 값 변경시 실행
  useEffect(() => {
    GetGameDetail();
  }, []);

  const GetGameDetail = () => {
    if (id) {
      apiGetGameDetail(id).then((res) => {
        setGaemDetail(res);
        console.log(res);
      });
    }
  };
  const GameAbout = styled.div`
    margin: 5% 5%;
  `;

  return (
    <>
      <div className="w-full min-h-screen bg-black text-white flex justify-center">
        {/* 전체 내용 80% 영역으로 제한 (가운데 정렬) */}
        <div className="max-w-[80%] mx-auto">
          {/* 상단 배경 영역 (헤더 이미지 영역) */}
          <div
            className="w-full h-[300px] bg-cover bg-center"
            style={{ backgroundImage: `url(${gameDetail.background_image})` }}
          >
            {/* 살짝 어둡게 덮어쓰기 (글자 가독성 확보) */}
            <div className="w-full h-full bg-black/40 flex items-center justify-center">
              <h2 className="text-5xl font-bold">{gameDetail.name}</h2>
            </div>
          </div>

          {/* 게임 대표 이미지 + 좋아요/장바구니 버튼 */}
          <div className="flex flex-col items-center my-10">
            {/* 좋아요 & 장바구니 버튼 */}
            <div className="flex gap-4">
              <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-bold text-white">
                ❤️ 좋아요
              </button>
              <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-bold text-white">
                🛒 장바구니
              </button>
            </div>
          </div>
          {/* html 형태의 string을 읽어 출력 */}
          <GameAbout>
            <p>About</p>
            <p dangerouslySetInnerHTML={{ __html: gameDetail.description }}></p>
          </GameAbout>
          {/* 상세 정보 (2열 정보 표기) */}
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
            <div>
              {gameDetail.parent_platforms
                .map((p) => p.platform.name)
                .join(", ")}
            </div>
          </div>

          {/* 구매 스토어 리스트 */}
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
        </div>
      </div>
    </>
  );
};

export default GameDetail;
