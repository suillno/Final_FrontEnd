import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../auth/store/userInfo";

interface Review {
  userName: string;
  rating: number;
  content: string;
  updatedAt: string;
}

interface Props {
  userName: string;
  reviews: Review[];
  onSubmit: (rating: number, content: string) => void;
  initialRating: number;
  initialContent: string;
}

// ⭐ 별 렌더링 컴포넌트 (크기 유지, 반 별 영역만 조절)
const Star = ({ filled }: { filled: number }) => {
  return (
    <div className="relative w-6 h-6 inline-block">
      <div
        className="absolute top-0 left-0 text-yellow-400 text-2xl leading-none"
        style={{
          width: `${filled * 100}%`,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        ★
      </div>
      <div className="text-gray-600 text-2xl leading-none opacity-40">★</div>
    </div>
  );
};

const GameReviewSection = ({
  userName,
  reviews,
  onSubmit,
  initialRating,
  initialContent,
}: Props) => {
  const [rating, setRating] = useState(initialRating);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setRating(initialRating);
    setContent(initialContent);
  }, [initialRating, initialContent]);

  const userinfo = useSelector(selectUserInfo);
  const hasAdminRole = userinfo.roles.some(
    (res: { role: string }) => res.role === "ROLE_ADMIN"
  );

  const handleStarClick = (index: number, isHalf: boolean) => {
    const newRating = isHalf ? index - 0.5 : index;
    setRating(newRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = rating >= i ? 1 : rating >= i - 0.5 ? 0.5 : 0;
      stars.push(
        <div key={i} className="relative w-6 h-6 inline-block group">
          {/* 왼쪽 반 클릭 */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full z-10"
            onClick={() => handleStarClick(i, true)}
          ></div>
          {/* 오른쪽 반 클릭 */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full z-10"
            onClick={() => handleStarClick(i, false)}
          ></div>
          <Star filled={filled} />
        </div>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4 bg-white/5 rounded-xl">
      <div className="font-bold text-lg text-gray-300 mb-3">리뷰 남기기</div>

      <div className="flex items-center gap-2 mb-4">
        <div className="text-white font-semibold">평점:</div>
        {renderStars()}
        <span className="ml-2 text-yellow-400 font-semibold">{rating}점</span>
      </div>

      <textarea
        spellCheck="false"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="게임에 대한 후기를 남겨주세요..."
        className="w-full h-24 p-3 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-yellow-400 mb-4 resize-none"
      />

      <button
        onClick={() => onSubmit(rating, content)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
      >
        {reviews.some((r) => r.userName === userName) ? "수정하기" : "등록하기"}
      </button>

      {reviews.some((r) => r.userName === userName) && (
        <button
          onClick={() => onSubmit(rating, content)} // 삭제 전용 함수 분리 필요 시 조정
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold ml-4 py-2 px-6 rounded"
        >
          삭제하기
        </button>
      )}

      <div className="mt-8">
        <div className="font-bold text-lg text-gray-300 mb-3">리뷰 목록</div>
        {reviews.length === 0 ? (
          <div className="text-gray-400">아직 작성된 리뷰가 없습니다.</div>
        ) : (
          <ul className="space-y-4">
            {reviews.map((rev, idx) => (
              <li key={idx} className="bg-white/10 p-3 rounded">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 mb-1">
                    <span className="font-semibold text-white">
                      {rev.userName}
                    </span>
                  </div>
                  {(rev.userName === userName || hasAdminRole) && (
                    <button
                      onClick={() => onSubmit(rating, content)}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-4 rounded text-sm"
                    >
                      삭제
                    </button>
                  )}
                </div>
                <div className="text-yellow-400 mb-1">
                  {"★".repeat(Math.floor(rev.rating))}
                  {rev.rating % 1 >= 0.5 && (
                    <span className="opacity-80">⯨</span>
                  )}{" "}
                  <span className="text-gray-400 text-sm">
                    ({rev.rating.toFixed(1)}점)
                  </span>
                </div>
                <div className="text-white mb-1">{rev.content}</div>
                <div className="text-gray-500 text-xs">
                  {new Date(rev.updatedAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameReviewSection;
