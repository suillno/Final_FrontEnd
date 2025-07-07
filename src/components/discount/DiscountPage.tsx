// DiscountPage.tsx - 할인 게임 카드 컴포넌트
import React from "react";
import styled from "styled-components";
import { GameDiscount } from "../api/backApi";
import PGLogoContents from "../../img/PGLogoContents.png";
import { CalenderSvg, PriceSvg } from "../../img/SvgImg";
import SteamPrice from "../api/SteamPrice";
import { Link } from "react-router-dom";

// 카드 전체 스타일
const Card = styled.div`
  background-color: #2a2b32;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
  cursor: pointer;

  img {
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }
  }
`;

// 카드 하단 정보 영역
const Info = styled.div`
  padding: 0.8rem;
  color: white;
  background-color: #1e1f24;
`;

// 컴포넌트 Prop 정의
interface Props {
  item: GameDiscount;
}

// 할인 카드 컴포넌트
const DiscountPage: React.FC<Props> = ({ item }) => {
  return (
    <Card>
      {/* 썸네일 이미지 (이미지 없을 시 대체) */}
      <Link to={`/game/${item.gameId}`} key={item.gameId}>
        <img
          src={item.backgroundImage || PGLogoContents}
          alt={item.title}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
          }}
        />
      </Link>
      {/* 게임 정보 */}
      <Info>
        {/* 게임 제목 */}
        <div className="font-bold text-lg mb-1">{item.title}</div>

        {/* 출시일 */}
        <div className="text-sm mb-1 flex items-center gap-1">
          <CalenderSvg />
          출시일: {item.released || "미정"}
        </div>

        {/* 할인율 */}
        <div className="text-sm mb-1">
          할인율:{" "}
          <span className="font-semibold text-red-400">
            {item.discountPercent?.toFixed(1)}%
          </span>
        </div>

        {/* 원래 가격 / 할인 가격 */}
        <div className="text-sm flex flex-col gap-0.5">
          <div className="flex items-center gap-1 line-through text-gray-400">
            <PriceSvg />
            정가: {item.price.toLocaleString()}원
          </div>
          <div className="flex items-center gap-1 text-green-400 font-semibold">
            <PriceSvg />
            할인가: {item.salePrice.toLocaleString()}원
          </div>
        </div>
      </Info>
    </Card>
  );
};

export default DiscountPage;
