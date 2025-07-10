// GameReviewSection.tsx - 리뷰 작성 및 리뷰 리스트 컴포넌트
import React, { useState, useEffect } from "react";

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

  return (
    <div className="max-w-4xl mx-auto mt-12 p-4 bg-white/5 rounded-xl">
      <div className="font-bold text-lg text-gray-300 mb-3">리뷰 남기기</div>
      <div className="flex items-center gap-2 mb-4">
        <div className="text-white font-semibold">평점:</div>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => setRating(num)}
            className={`cursor-pointer text-2xl ${
              num <= rating ? "text-yellow-400" : "text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
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
                  <div>
                    <button
                      onClick={() => onSubmit(rating, content)}
                      className=" bg-gray-500 hover:bg-gray-600 text-white-300 font-bold py-1 px-4 rounded text-sm"
                    >
                      {reviews.some((r) => r.userName === userName)
                        ? "삭제"
                        : ""}
                    </button>
                  </div>
                </div>
                <div className="text-yellow-400 mb-1">
                  {"★".repeat(rev.rating)}{" "}
                  <span className="text-gray-400 text-sm">
                    ({rev.rating}점)
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
