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
import {
  ContentContainer,
  GameAbout,
  AboutBetween,
  WhiteLine,
} from "../style/GameDetail.styles";
import {
  apiAddGameReviews,
  apiGetGameReviews,
} from "../components/api/backApi";

const GameDetail = () => {
  const token = getCurrentUser(); // 토큰정보 가져오기
  const userInfo = useSelector(selectUserInfo); // 로그인 유저 정보
  const { id } = useParams(); // URL에서 게임 ID 추출
  const [isLoading, setIsLoading] = useState(false);
  const [gameDetail, setGameDetail] = useState<GameResult>(defaultGameResult); // 게임 정보
  const [gameImg, setGameImg] = useState<GameShortImgResponse>(GameImgDefault); // 이미지 리스트
  const [priceValue, setPriceValue] = useState(0); // 숫자 가격
  const [priceText, setPriceText] = useState("로딩 중..."); // 표시용 문자열
  const [rating, setRating] = useState(0); // 별점 상태
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트
  const [reviews, setReviews] = useState<
    { userName: string; rating: number; content: string; createdAt: string }[]
  >([]);

  // 리뷰 목록 가져오기
  const fetchReviewList = async () => {
    if (!id) return;

    const data = await apiGetGameReviews(id);
    if (data) {
      setReviews(data);
      if (userInfo.username) {
        const myReview = data.find(
          (rev: { userName: string }) => rev.userName === userInfo.username
        );
        if (myReview) {
          setReviewText(myReview.content);
          setRating(myReview.rating);
        }
      }
    }
  };

  // 상세 정보 및 이미지 요청
  const fetchGameDetail = () => {
    if (!id) return;
    setIsLoading(true);
    apiGetGameImg(id).then((resImg) => setGameImg(resImg));
    apiGetGameDetail(id)
      .then((res) => setGameDetail(res))
      .finally(() => setIsLoading(false));
  };

  // 가격 정보 수신 핸들러
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
      rating,
      content: reviewText,
    };

    try {
      const response = await apiAddGameReviews(reviewData); // API 호출
      alert(response);

      // 리뷰 목록 반영
      setReviews([
        ...reviews,
        {
          userName: userInfo.username,
          rating,
          content: reviewText,
          createdAt: new Date().toISOString(),
        },
      ]);
      setRating(0);
      setReviewText("");
      await fetchReviewList(); // 리뷰 목록 다시 불러오기
    } catch (error) {
      alert("등록 중 오류가 발생했습니다.");
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
    fetchReviewList(); // 리뷰 목록도 함께 요청
  }, [id]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-12 w-full min-h-screen bg-black text-white flex justify-center">
          <div className="max-w-[80%] mx-auto w-full">
            {/* 상단 배경 이미지 영역 */}
            <div
              className="w-full h-[250px] bg-cover bg-center"
              style={{ backgroundImage: `url(${gameDetail.background_image})` }}
            >
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                <h2 className="text-5xl font-bold">{gameDetail.name}</h2>
              </div>
            </div>

            {/* 본문 콘텐츠 */}
            <ContentContainer>
              <AboutBetween>
                {/* 게임 소개 (About) */}
                <GameAbout className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-2">About</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: gameDetail.description,
                    }}
                  />
                </GameAbout>

                {/* 상세 정보 영역 */}
                <WhiteLine className="md:w-1/3 md:mt-10 grid grid-cols-2 gap-y-1 text-sm max-w-[300px] max-h-[700px]">
                  {/* 이미지 슬라이더 */}
                  {gameImg.results.length > 0 && (
                    <WhiteLine className="col-span-2 mb-2">
                      <SimpleSlider images={gameImg.results} />
                    </WhiteLine>
                  )}

                  <div className="font-bold text-gray-400">정상가</div>
                  <div>
                    <SteamPrice
                      gameName={gameDetail.name}
                      onPriceFetched={handlePriceFetch}
                    />
                  </div>

                  <div className="font-bold text-gray-400">출시일</div>
                  <div>{gameDetail.released}</div>

                  <div className="font-bold text-gray-400">평점</div>
                  <div>
                    {gameDetail.rating} / {gameDetail.rating_top}
                  </div>

                  <div className="font-bold text-gray-400">메타크리틱</div>
                  <div>{gameDetail.metacritic ?? "없음"}</div>

                  <div className="font-bold text-gray-400">플레이타임</div>
                  <div>{gameDetail.playtime}시간</div>

                  <div className="font-bold text-gray-400">장르</div>
                  <div>{gameDetail.genres.map((g) => g.name).join(", ")}</div>

                  <div className="font-bold text-gray-400">플랫폼</div>
                  <div className="flex gap-1 flex-wrap">
                    {gameDetail.parent_platforms.map((p) => {
                      const slug = p.platform.slug;
                      const platformName = platformIcons[slug];
                      if (!platformName) return null;
                      return (
                        <span
                          key={slug}
                          className="inline-block text-[11px] font-semibold px-2 rounded border"
                          style={{
                            border: `1px solid ${
                              platformBorderColors[slug] || "#ccc"
                            }`,
                            color: "#fff",
                            height: "20px",
                            lineHeight: "20px",
                            verticalAlign: "middle",
                          }}
                        >
                          {platformName}
                        </span>
                      );
                    })}
                  </div>

                  {/* 장바구니 & 위시리스트 버튼 */}
                  <div className="my-2 text-center">
                    <div className="inline-block whitespace-nowrap">
                      <button
                        onClick={cartSave}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-5 rounded shadow mr-2"
                      >
                        장바구니
                      </button>
                      <button
                        onClick={likeSave}
                        className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-5 rounded shadow border border-gray-300"
                      >
                        위시리스트
                      </button>
                    </div>
                  </div>
                </WhiteLine>
              </AboutBetween>

              {/* 리뷰 영역 */}
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

                {/* 등록 버튼 */}
                <button
                  onClick={submitReview}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
                >
                  {reviews.some((r) => r.userName === userInfo.username)
                    ? "수정하기"
                    : "등록하기"}
                </button>

                {/* 리뷰 리스트 출력 */}
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
                      {reviews.map((rev, idx) => (
                        <li key={idx} className="bg-white/10 p-3 rounded">
                          {/* 작성자 이름 */}
                          <div className="text-sm text-gray-500 mb-1">
                            {" "}
                            <span className="font-semibold text-white">
                              {rev.userName}
                            </span>
                          </div>
                          <div className="text-yellow-400 mb-1">
                            {"★".repeat(rev.rating)}
                            <span className="text-gray-400 text-sm">
                              {" "}
                              ({rev.rating}점)
                            </span>
                          </div>
                          <div className="text-white mb-1">{rev.content}</div>
                          <div className="text-gray-500 text-xs">
                            {new Date(rev.createdAt).toLocaleString()}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* 구매 스토어 영역 */}
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

              {/* 태그 출력 */}
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
            </ContentContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetail;
