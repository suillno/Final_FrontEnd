import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa"; // 🗑 삭제 아이콘 추가

interface Props {
  cartActive?: boolean; // ❗ 선택 가능하게
  likeActive?: boolean;
  onCartClick?: () => void;
  onLikeClick?: () => void;
  showDeleteButton?: boolean; // ❗ 삭제 버튼 표시 여부
  onDeleteClick?: () => void; // ❗ 삭제 버튼 클릭 핸들러
}

const GameActionButtons = ({
  cartActive,
  likeActive,
  onCartClick,
  onLikeClick,
  showDeleteButton = false,
  onDeleteClick,
}: Props) => {
  return (
    <div className="my-2 text-center">
      <div className="inline-block whitespace-nowrap flex gap-3 justify-center">
        {onCartClick && (
          <button
            onClick={onCartClick}
            className="group hover:bg-black-700 text-white font-bold py-2 px-5 rounded shadow"
          >
            <BsFillCartCheckFill
              className={`text-2xl group-hover:text-green-500 transition-colors duration-200 ${
                cartActive ? "text-green-500" : "text-white"
              }`}
            />
          </button>
        )}

        {onLikeClick && (
          <button
            onClick={onLikeClick}
            className="group hover:bg-black-700 text-white font-bold py-2 px-5 rounded shadow"
          >
            <AiFillLike
              className={`text-2xl group-hover:text-red-500 transition-colors duration-200 ${
                likeActive ? "text-red-500" : "text-white"
              }`}
            />
          </button>
        )}

        {showDeleteButton && onDeleteClick && (
          <button
            onClick={onDeleteClick}
            className="group bg-[#ff5252] hover:bg-[#e53935] text-white font-bold py-2 px-5 rounded shadow"
          >
            <FaTrashAlt className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default GameActionButtons;
