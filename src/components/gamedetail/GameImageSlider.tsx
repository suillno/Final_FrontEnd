// GameImageSlider.tsx - 이미지 슬라이더 컴포넌트
import React from "react";
import SimpleSlider from "../common/Slick";
import { GameShortImgResponse } from "../../types/types";

interface Props {
  gameImg: GameShortImgResponse;
}

const GameImageSlider = ({ gameImg }: Props) => {
  if (gameImg.results.length === 0) return null;

  return (
    <div className="mb-4">
      <SimpleSlider images={gameImg.results} />
    </div>
  );
};

export default GameImageSlider;
