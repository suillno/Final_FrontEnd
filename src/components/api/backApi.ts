import { instanceBack, instanceAuth } from "./instance";

// 🔸 장바구니 아이템 타입 정의 (이 파일 또는 공용 types.ts로 분리 가능)
export interface CartItem {
  gameId: number;
  title: string;
  backgroundImage: string;
  price: number;
  salePrice: number;
  released: string;
  esrbRating: string;
}

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

// 게임 할인가 적용
export const apiAddGameDiscount = async (discountData: {
  userName: string;
  gameId: number;
  title: string;
  backgroundImage: string;
  price: number;
  salePrice: number;
  released: string;
  esrbRating: string;
}) => {
  try {
    const res = await instanceBack.post("/member/discount/apply", discountData);
    return res.data;
  } catch (error) {
    console.error("할인가 저장 실패", error);
    return "ERROR: 할인가 저장 실패";
  }
};

// 장바구니 조회
export const apiCheckGameCart = async (userName: string, gameId: number) => {
  try {
    const res = await instanceBack.get(`/member/cart/checkCart/${gameId}`);
    return res.data;
  } catch (error) {
    console.error("찜 여부 확인 실패", error);
    return false;
  }
};

// 좋아요 조회
export const apiCheckGameLike = async (userName: string, gameId: number) => {
  try {
    const res = await instanceBack.get(`/member/like/checkLike/${gameId}`);
    return res.data;
  } catch (error) {
    console.error("위시리스트 여부 확인 실패", error);
    return false;
  }
};

// 장바구니, 좋아요, 할인기능 통합 조회
export const apiCheckAll = async (userName: string, gameId: number) => {
  try {
    const res = await instanceBack.get(`/member/status/checkAll/${gameId}`);
    return res.data;
  } catch (error) {
    console.error("위시리스트 여부 확인 실패", error);
    return false;
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

// 이메일 인증코드 전송
export const apiSendEmailVerification = async (emailData: {
  mailTo: string;
  username: string;
  mailType: string;
}) => {
  try {
    const res = await instanceAuth.post("/auth/mail", emailData);
    return res.data;
  } catch (err) {
    throw new Error("이메일 확인 중 오류");
  }
};

// 장바구니 전체 리스트 불러오기
export const apiGetCartList = async (username: string): Promise<CartItem[]> => {
  try {
    const res = await instanceBack.get(`/member/cart/list/${username}`);
    return res.data;
  } catch (error) {
    console.error("장바구니 목록 불러오기 실패", error);
    throw error;
  }
};
export const apiFindUserId = async (email: string, name: string) => {
  return await instanceAuth
    .post("/auth/findId", { email, name })
    .then((res) => res.data);
};

export const apiFindUserPw = async (email: string, username: string) => {
  return await instanceAuth
    .post("/auth/changePw", { email, username })
    .then((res) => res.data);
};
