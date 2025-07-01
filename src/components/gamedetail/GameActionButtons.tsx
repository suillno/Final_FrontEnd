// GameActionButtons.tsx - 장바구니 및 찜 버튼 컴포넌트
import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";

interface Props {
  cartActive: boolean;
  likeActive: boolean;
  onCartClick: () => void;
  onLikeClick: () => void;
}

const GameActionButtons = ({
  cartActive,
  likeActive,
  onCartClick,
  onLikeClick,
}: Props) => {
  return (
    <div className="my-2 text-center">
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
  );
};

export default GameActionButtons;
