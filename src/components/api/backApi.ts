import { instanceBack } from "./instance";

// 리뷰 목록 가져오기
export const apiGetGameReviews = async (gameId: string) => {
  try {
    const res = await instanceBack.get(`/member/review/list/${gameId}`);
    return res.data;
  } catch (error) {
    console.error("리뷰 목록 가져오기 실패", error);
    return null;
  }
};

// 리뷰 등록
export const apiAddGameReviews = async (reviewData: {
  userName: string;
  gameId: number;
  rating: number;
  content: string;
}) => {
  try {
    const res = await instanceBack.post("/member/review/add", reviewData);
    return res.data;
  } catch (error) {
    console.error("리뷰 등록 실패", error);
    throw error;
  }
};

// 좋아요 저장
export const apiAddGameLike = async (likeData: {
  userName: string;
  gameId: number;
  title: string;
  backgroundImage: string;
  price: number;
  salePrice: number;
}) => {
  try {
    const res = await instanceBack.post("/member/like/save", likeData);
    return res.data;
  } catch (error) {
    return "ERROR: 좋아요 저장 중 서버 오류가 발생했습니다.";
  }
};

// 게임 카트 등록
export const apiAddGameCart = async (cartData: {
  userName: string;
  gameId: number;
  title: string;
  backgroundImage: string;
  price: number;
  salePrice: number;
}) => {
  try {
    const res = await instanceBack.post("/member/cart/save", cartData);
    return res.data;
  } catch (error) {
    console.error("장바구니 저장 실패");
  }
};
