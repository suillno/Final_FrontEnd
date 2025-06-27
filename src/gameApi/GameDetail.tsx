// GameDetail.tsx
import { useParams } from "react-router-dom";
import { apiGetGameDetail, apiGetGameImg } from "../components/api/api";
import { useEffect, useState } from "react";
import {
  defaultGameResult,
  GameResult,
  platformIcons,
  platformBorderColors,
  GameShortImgResponse,
  GameImgDefault,
} from "../types/types";
import styled from "styled-components";
import Loader from "../components/common/Loader";
import SteamPrice from "../components/api/SteamPrice";
import SimpleSlider from "../components/common/Slick";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../components/auth/store/userInfo";
import axios from "axios";
import { getCurrentUser } from "../components/auth/helper/storage";

// 스타일 정의
const ContentContainer = styled.div`
  background-color: #1e1f24;
  border-radius: 12px;
`;
const GameAbout = styled.div`
  margin: 5%;
  overflow-y: auto;
  max-height: 500px;
`;
const AboutBetween = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;
const WhiteLine = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;

const GameDetail = () => {
  const token = getCurrentUser();
  const userInfo = useSelector(selectUserInfo);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [gameDetail, setGameDetail] = useState<GameResult>(defaultGameResult);
  const [gameImg, setGameImg] = useState<GameShortImgResponse>(GameImgDefault);
  const [priceValue, setPriceValue] = useState(0);
  const [priceText, setPriceText] = useState("로딩 중...");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<
    { rating: number; content: string; createdAt: string }[]
  >([]);

  // 리뷰 목록 API 호출
  const fetchReviewList = async () => {
    if (!id) return;
    try {
      const response = await axios.get(
        `http://localhost:8080/game/member/review?gameId=${id}`
      );
      setReviews(response.data);
    } catch (err) {
      console.error("리뷰 목록 가져오기 실패", err);
    }
  };

  // 게임 상세 정보 및 이미지 가져오기
  const fetchGameDetail = () => {
    if (!id) return;
    setIsLoading(true);
    apiGetGameImg(id).then(setGameImg);
    apiGetGameDetail(id)
      .then(setGameDetail)
      .finally(() => setIsLoading(false));
  };

  // 가격 가져오기 콜백
  const handlePriceFetch = (numeric: number, formatted: string) => {
    setPriceValue(numeric);
    setPriceText(formatted);
  };

  // 리뷰 등록
  const submitReview = async () => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }
    if (rating === 0 || reviewText.trim() === "") {
      alert("평점과 리뷰를 모두 입력해 주세요.");
      return;
    }

    const reviewData = {
      userName: userInfo.username,
      gameId: gameDetail.id,
      rating: rating,
      content: reviewText,
    };

    if (token && token.accessToken) {
      try {
        await axios.post(
          "http://localhost:8080/game/member/reviewsave",
          reviewData,
          {
            headers: {
              Authorization: `${token.tokenType}${token.accessToken}`,
            },
          }
        );
        alert("리뷰를 등록하였습니다!");
        await fetchReviewList();
        setRating(0);
        setReviewText("");
      } catch (error) {
        alert("등록 중 오류가 발생했습니다.");
      }
    }
  };
  // 장바구니 저장 요청
  const cartSave = async () => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }

    const cartData = {
      userName: userInfo.username,
      gameId: gameDetail.id,
      title: gameDetail.name,
      backgroundImage: gameDetail.background_image,
      price: priceValue,
      salePrice: 0,
    };

    if (token && token?.accessToken) {
      try {
        const response = await axios.post(
          "http://localhost:8080/game/member/cartsave",
          cartData,
          {
            headers: {
              Authorization: `${token.tokenType}${token.accessToken}`, // 토큰 포함
            },
          }
        );
        alert("장바구니에 담겼습니다!");
        fetchReviewList();
      } catch (error) {
        alert("장바구니 등록 중 오류가 발생했습니다.");
      }
    }
  };

  // 찜 저장 요청
  const likeSave = async () => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }

    const likeData = {
      userName: userInfo.username,
      gameId: gameDetail.id,
      title: gameDetail.name,
      backgroundImage: gameDetail.background_image,
      price: priceValue,
      salePrice: 0,
    };
    const token = getCurrentUser();
    console.log(token);

    if (token && token?.accessToken) {
      try {
        const response = await axios.post(
          "http://localhost:8080/game/member/likesave",
          likeData,
          {
            headers: {
              Authorization: `${token.tokenType}${token.accessToken}`, // 토큰 포함
            },
          }
        );
        alert(response.data);
      } catch (error) {
        alert("장바구니 등록 중 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    fetchGameDetail();
    fetchReviewList();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-12 w-full min-h-screen bg-black text-white flex justify-center">
          <div className="max-w-[80%] mx-auto w-full">
            {/* 리뷰 작성 및 출력 영역 */}
            <div className="max-w-4xl mx-auto mt-12 p-4 bg-white/5 rounded-xl">
              <div className="font-bold text-lg text-gray-300 mb-3">
                리뷰 남기기
              </div>

              {/* 별점 선택 */}
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

              {/* 리뷰 작성 */}
              <textarea
                spellCheck="false"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="게임에 대한 후기를 남겨주세요..."
                className="w-full h-24 p-3 rounded bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-yellow-400 mb-4 resize-none"
              />

              <button
                onClick={submitReview}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
              >
                등록하기
              </button>

              {/* 리뷰 리스트 */}
              <div className="mt-8">
                <div className="font-bold text-lg text-gray-300 mb-3">
                  리뷰 목록
                </div>
                {reviews.length === 0 ? (
                  <div className="text-gray-400">
                    아직 작성된 리뷰가 없습니다.
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {reviews.map((rev, idx) => {
                      const dateObj = new Date(rev.createdAt);
                      const isValid = !isNaN(dateObj.getTime());
                      return (
                        <li key={idx} className="bg-white/10 p-3 rounded">
                          <div className="text-yellow-400 mb-1">
                            {"★".repeat(rev.rating)}{" "}
                            <span className="text-gray-400">
                              ({rev.rating}점)
                            </span>
                          </div>
                          <div className="text-white mb-1">{rev.content}</div>
                          <div className="text-xs text-gray-500">
                            {isValid
                              ? dateObj.toLocaleString("ko-KR", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                  timeZone: "Asia/Seoul",
                                })
                              : "날짜 없음"}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetail;
