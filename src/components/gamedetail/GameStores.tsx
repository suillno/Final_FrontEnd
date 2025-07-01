// GameStores.tsx - 게임 구매 가능한 스토어 링크 컴포넌트
import React from "react";
import { GameResult } from "../../types/types";

interface Props {
  gameDetail: GameResult;
}

const GameStores = ({ gameDetail }: Props) => {
  return (
    <div className="max-w-4xl mx-auto mt-8 text-sm sm:text-base md:text-lg hidden md:block">
      <div className="font-bold text-gray-400 mb-2">구매 스토어</div>
      <div className="flex flex-wrap gap-3">
        {gameDetail?.stores?.map((s, idx) => (
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
  );
};

export default GameStores;
