// GameTags.tsx - 태그 리스트 컴포넌트
import React from "react";
import { GameResult } from "../../types/types";

interface Props {
  gameDetail: GameResult;
}

const GameTags = ({ gameDetail }: Props) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 text-sm sm:text-base md:text-lg hidden md:block">
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
  );
};

export default GameTags;
