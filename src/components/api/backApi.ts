import { instanceBack, instanceAuth } from "./instance";

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

// 회원가입 요청
export const apiRegisterUser = async (registerData: {
  username: string;
  password: string;
  name: string;
  email: string;
  birth: string;
  roleNum: number;
}) => {
  try {
    const res = await instanceAuth.post("/auth/register", registerData);
    return res.data; // { success: true, message: "등록되었습니다." }
  } catch (error) {
    console.error("회원가입 실패", error);
    throw error;
  }
};

// 아이디 중복 확인
export const apiCheckUsername = async (username: string) => {
  try {
    const res = await instanceAuth.get("/auth/check/username", {
      params: { username },
    });
    return res.data;
  } catch (err) {
    throw new Error("아이디 확인 중 오류");
  }
};

// 이메일 중복 확인
export const apiCheckEmail = async (email: string) => {
  try {
    const res = await instanceAuth.get("/auth/check/email", {
      params: { email },
    });
    return res.data;
  } catch (err) {
    throw new Error("이메일 확인 중 오류");
  }
};

// 장바구니 조회하기
export const apiCheckGameCart = async (userName: string, gameId: number) => {
  try {
    const res = await instanceBack.get(`/member/review/checkCart/${gameId}`);
    return res.data;
  } catch (error) {
    console.error("찜 여부 확인 실패", error);
    return false;
  }
};

// 위시리스트 조회하기
export const apiCheckGameLike = async (userName: string, gameId: number) => {
  try {
    const res = await instanceBack.get(`/member/review/checkLike/${gameId}`);
    return res.data;
  } catch (error) {
    console.error("위시리스트 여부 확인 실패", error);
    return false;
  }
};
