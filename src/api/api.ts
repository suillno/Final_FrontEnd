import { instance } from "./instance";

// 스프링부트 URL 호출
export const apiGetGameList = async (pageNext: number) => {
  // 호출값 없을때 에러발생
  try {
    const res = await instance.get("/game/list", {
      params: { page: pageNext },
    });
    return res.data;
  } catch (error) {
    console.error("API 호출 에러 발생", error);
    return null;
  }
};

// 스프링부터 호출 게임디테일 페이지
export const apiGetGameDetail = async (gameId: string) => {
  // 호출값 없을때 에러발생
  try {
    const res = await instance.get(`/game/detail/${gameId}`);
    return res.data;
  } catch (error) {
    console.error("API 호출 에러 발생", error);
    return null;
  }
};
