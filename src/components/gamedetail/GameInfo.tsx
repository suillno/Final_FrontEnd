// GameInfo.tsx - 게임 상세 정보 및 소개 컴포넌트
// 장바구니와 찜 아이콘은 상태(cartActive, likeActive)에 따라 색상이 변경됨
import React from "react";
import {
  GameResult,
  GameShortImgResponse,
  platformIcons,
  platformBorderColors,
} from "../../types/types";
import {
  GameAbout,
  AboutBetween,
  WhiteLine,
} from "../../style/GameDetail.styles";
import SteamPrice from "../api/SteamPrice";
import SimpleSlider from "../common/Slick";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";

interface Props {
  gameDetail: GameResult;
  gameImg: GameShortImgResponse;
  onPriceFetched: (numeric: number, formatted: string) => void;
  onCartClick: () => void;
  onLikeClick: () => void;
  cartActive: boolean;
  likeActive: boolean;
}

const GameInfo = ({
  gameDetail,
  gameImg,
  onPriceFetched,
  onCartClick,
  onLikeClick,
  cartActive,
  likeActive,
}: Props) => {
  return (
    <AboutBetween>
      {/* 게임 설명 */}
      <GameAbout className="md:w-2/3">
        <h2 className="text-2xl font-bold mb-2">About</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: gameDetail.description,
          }}
        />
      </GameAbout>

      {/* 상세 정보 및 슬라이더, 가격, 버튼 등 */}
      <WhiteLine className="md:w-1/3 md:mt-10 grid grid-cols-2 gap-y-1 text-sm max-w-[300px] max-h-[700px]">
        {/* 이미지 슬라이더 */}
        {gameImg.results.length > 0 && (
          <WhiteLine className="col-span-2 mb-2">
            <SimpleSlider images={gameImg.results} />
          </WhiteLine>
        )}

        <div className="font-bold text-gray-400">정상가</div>
        <div>
          <SteamPrice
            gameName={gameDetail.name}
            onPriceFetched={onPriceFetched}
          />
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
                  border: `1px solid ${platformBorderColors[slug] || "#ccc"}`,
                  color: "#fff",
                  height: "20px",
                  lineHeight: "20px",
                  verticalAlign: "middle",
                }}
              >
                {platformName}
              </span>
            );
          })}
        </div>

        {/* 장바구니 & 찜 버튼 */}
        <div className="my-2 text-center col-span-2">
          <div className="inline-block whitespace-nowrap">
            <button
              onClick={onCartClick}
              className="group hover:bg-black-700 text-white font-bold py-2 px-5 rounded shadow mr-2"
            >
              <BsFillCartCheckFill
                className={`text-2xl w-20 group-hover:text-green-500 transition-colors duration-200 ${
                  cartActive ? "text-green-500" : "text-white"
                }`}
              />
            </button>
            <button
              onClick={onLikeClick}
              className="group hover:bg-black-700 text-white font-bold py-2 px-5 rounded shadow mr-2"
            >
              <AiFillLike
                className={`text-2xl w-20 group-hover:text-red-500 transition-colors duration-200 ${
                  likeActive ? "text-red-500" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>
      </WhiteLine>
    </AboutBetween>
  );
};

export default GameInfo;
