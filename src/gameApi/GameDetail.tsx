// GameDetail.tsx - 게임 상세 페이지 메인 컴포넌트 (분리된 하위 컴포넌트 사용)
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  defaultGameResult,
  GameResult,
  GameShortImgResponse,
  GameImgDefault,
} from "../types/types";

import Loader from "../components/common/Loader";
import {
  apiAddGameCart,
  apiAddGameDiscount,
  apiAddGameLike,
  apiAddGameReviews,
  apiCheckAll,
  apiGetGameReviews,
} from "../components/api/backApi";
import { selectUserInfo } from "../components/auth/store/userInfo";
import { getCurrentUser } from "../components/auth/helper/storage";
import { ContentContainer } from "../style/GameDetail.styles";

// 분리된 하위 컴포넌트
import GameInfo from "../components/gamedetail/GameInfo";
import GameReviewSection from "../components/gamedetail/GameReviewSection";
import GameStores from "../components/gamedetail/GameStores";
import GameTags from "../components/gamedetail/GameTags";
import { apiGetGameDetail, apiGetGameImg } from "../components/api/api";

const GameDetail = () => {
  const userInfo = useSelector(selectUserInfo);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [gameDetail, setGameDetail] = useState<GameResult>(defaultGameResult);
  const [gameImg, setGameImg] = useState<GameShortImgResponse>(GameImgDefault);
  const [priceValue, setPriceValue] = useState(0);
  const [priceText, setPriceText] = useState("로딩 중...");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [cartActive, setCartActive] = useState(false);
  const [likeActive, setLikeActive] = useState(false);
  const [discountActive, setDiscountActive] = useState(false);
  const [reviews, setReviews] = useState<
    { userName: string; rating: number; content: string; updatedAt: string }[]
  >([]);

  // 게임 상세 및 이미지 조회
  const fetchGameDetail = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const resImg = await apiGetGameImg(id);
      setGameImg(resImg);
      const res = await apiGetGameDetail(id);
      setGameDetail(res);
      if (userInfo?.username) {
        await CheckLikeAndCartStatus(res);
      }
    } catch (error) {
      console.error("게임 정보 불러오기 실패", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 리뷰 목록 조회
  const fetchReviewList = async () => {
    if (!id) return;
    const data = await apiGetGameReviews(id);
    if (data) {
      setReviews(data);
      if (userInfo.username) {
        const myReview = data.find(
          (r: { userName: any }) => r.userName === userInfo.username
        );
        if (myReview) {
          setReviewText(myReview.content);
          setRating(myReview.rating);
        }
      }
    }
  };

  // 찜 / 장바구니 상태 확인
  const CheckLikeAndCartStatus = async (game: GameResult) => {
    if (!userInfo.username || !game?.id) return;
    try {
      // const likeRes = await apiCheckGameLike(userInfo.username, game.id);
      // const cartRes = await apiCheckGameCart(userInfo.username, game.id);
      const checkAll = await apiCheckAll(userInfo.username, game.id);
      setLikeActive(Boolean(checkAll.like));
      setCartActive(Boolean(checkAll.cart));
      setDiscountActive(Boolean(checkAll.discount));
    } catch (error) {
      console.error("찜/장바구니 상태 확인 오류", error);
    }
  };

  // 가격 정보 수신 핸들러
  const handlePriceFetch = (numeric: number, formatted: string) => {
    setPriceValue(numeric);
    setPriceText(formatted);
  };

  const handleSave = async (
    type: "cart" | "like" | "discount",
    salePriceValue: number = 0 // 기본 0
  ) => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }

    const data = {
      userName: userInfo.username,
      gameId: gameDetail.id,
      title: gameDetail.name,
      backgroundImage: gameDetail.background_image,
      price: priceValue,
      released: gameDetail.released,
      esrbRating: gameDetail.esrb_rating?.name || "정보 없음",
      salePrice: salePriceValue || 0,
    };

    try {
      let response = "";
      if (type === "cart") {
        response = await apiAddGameCart(data);
      } else if (type === "like") {
        response = await apiAddGameLike(data);
      } else if (type === "discount") {
        response = await apiAddGameDiscount(data); // 별도 API
      }

      const [status, message] = response
        .split(":")
        .map((s: string) => s.trim());

      if (status === "SUCCESS") {
        alert(message);
        if (type === "cart") setCartActive((prev) => !prev);
        else if (type === "like") setLikeActive((prev) => !prev);
        else if (type === "discount") setDiscountActive((prev) => !prev);
      } else {
        alert("에러: " + message);
      }
    } catch (error) {
      alert("요청 처리 중 오류 발생");
    }
  };

  const location = useLocation();

  // 초기 로딩
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
            <div
              className="w-full h-[250px] bg-cover bg-center"
              style={{ backgroundImage: `url(${gameDetail.background_image})` }}
            >
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                <h2 className="text-5xl font-bold">{gameDetail.name}</h2>
              </div>
            </div>
            <ContentContainer>
              <GameInfo
                gameDetail={gameDetail}
                gameImg={gameImg}
                onPriceFetched={handlePriceFetch}
                onCartClick={() => handleSave("cart")}
                onLikeClick={() => handleSave("like")}
                onDiscountApply={(price) => handleSave("discount", price)}
                cartActive={cartActive}
                likeActive={likeActive}
                discountActive={discountActive}
                discountPrice={location.state?.priceDiscountInfo ?? 0}
                price={location.state?.priceInfo ?? 0}
                discountPercent={location.state?.discountPercent ?? 0}
                showCartButton={location.state?.showCartButton ?? true}
              />
              <GameReviewSection
                userName={userInfo.username}
                reviews={reviews}
                onSubmit={async (rating, content) => {
                  const reviewData = {
                    userName: userInfo.username,
                    gameId: gameDetail.id,
                    rating,
                    content,
                  };
                  try {
                    const response = await apiAddGameReviews(reviewData);
                    alert(response);
                    await fetchReviewList();
                  } catch {
                    alert("리뷰 등록 오류");
                  }
                }}
                initialRating={rating}
                initialContent={reviewText}
              />
              <GameStores gameDetail={gameDetail} />
              <GameTags gameDetail={gameDetail} />
            </ContentContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default GameDetail;
