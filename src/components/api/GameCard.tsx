// GameCard.tsx
// 게임 카드 컴포넌트: 각 게임의 이미지, 타이틀, 플랫폼, 평점, 가격, 장르 등의 정보를 보여줌
import PGLogoContents from "../../img/PGLogoContents.png";
import React from "react";
import styled from "styled-components";
import {
  GameResult,
  platformBorderColors,
  platformIcons,
  EsrbNumbers,
  EsrbColors,
} from "../../types/types";
import SteamPrice from "./SteamPrice";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dayjs from "dayjs";
import { CalenderSvg, PriceSvg } from "../../img/SvgImg";

// 카드 전체 레이아웃 스타일 정의
const Card = styled.div`
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

// 이미지 아래 기본 정보 영역 스타일
const Info = styled.div`
  padding: 0.8rem;
  color: white;
  background-color: #1e1f24;
`;

// Hover 시 표시되는 오버레이 스타일
const Overlay = styled.div`
  display: flex;
  justify-content: space-between;
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
  font-size: 0.8em;
  ${Card}:hover & {
    opacity: 1;
  }
`;

// props로 GameResult 타입의 item 전달받음
interface Props {
  item: GameResult;
}

// GameCard 컴포넌트 정의
const GameCard: React.FC<Props> = ({ item }) => {
  return (
    <Card>
      {/* 게임 이미지 */}
      <img
        src={
          item.background_image
            ? `https://media.rawg.io/media/resize/640/-/${
                item.background_image.split("/media/")[1]
              }`
            : PGLogoContents // 이미지 없을 때 대체 이미지
        }
        alt={item.name}
        style={{
          width: "640px",
          height: "100%",

          objectFit: "cover", // 또는 "contain"
        }}
      />

      {/* 기본 정보 표시 영역 */}
      <Info>
        {/* 플랫폼 정보 (슬러그 기준으로 아이콘 색상 적용) */}
        <div className="flex gap-1 mb-1 flex-wrap">
          {item.parent_platforms.map((platform) => {
            const slug = platform.platform.slug;
            const platformName = platformIcons[slug] ?? platform.platform.name;
            return (
              <span
                key={slug}
                className="text-xs font-semibold px-2 py-0.5 rounded"
                style={{
                  border: `1px solid ${platformBorderColors[slug] || "#ccc"}`,
                  color: platformBorderColors[slug] || "#333",
                }}
              >
                {platformName}
              </span>
            );
          })}
        </div>

        {/* 게임 타이틀 */}
        <div className="font-bold text-lg">{item.name}</div>

        {/* 출시일 + 평점 (우측 원형 차트) */}
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="flex items-center gap-1">
            {/* 달력 아이콘 */}
            <CalenderSvg />
            출시: {item.released ?? "미정"}
          </span>

          {/* 평점 (원형 차트) */}
          <div style={{ width: 45, height: 45 }}>
            <CircularProgressbar
              value={(item.rating / 5) * 100}
              text={`${item.rating.toFixed(1)}`}
              styles={buildStyles({
                textSize: "30px",
                pathColor: "red",
                textColor: "red",
                trailColor: "#444",
              })}
            />
          </div>
        </div>

        {/* 가격 컴포넌트 */}
        <div className="text-sm mt-1">
          <span className="flex items-center gap-1">
            {/* 동그라미 안에 화폐 아이콘 */}
            <PriceSvg />
            가격: <SteamPrice gameName={item.name} />
          </span>
        </div>
      </Info>
      {/* Hover 시 오버레이 정보 */}
      <Overlay>
        <div>
          <div>장르: {item.genres.map((g) => g.name).join(", ")}</div>
          <div>유저수: {item.added_by_status?.yet}명</div>
          <div>플레이타임 : {item.playtime}시간</div>
          <div>추천: {item.suggestions_count}</div>
          <div>
            최종 업데이트:{" "}
            {item.updated ? dayjs(item.updated).format("YYYY-MM-DD") : "없음"}
          </div>
        </div>
        <div>
          {/* ESRB 등급 아이콘 */}
          {item.esrb_rating && (
            <div
              className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold"
              style={{
                backgroundColor: EsrbColors[item.esrb_rating.name],
              }}
            >
              {EsrbNumbers[item.esrb_rating.name] ?? "?"}
            </div>
          )}
        </div>
      </Overlay>
    </Card>
  );
};

export default GameCard;
