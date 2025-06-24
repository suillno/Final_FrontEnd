// 🔧 src/components/api/api.ts

import { instance } from "./instance";
import axios from "axios";

/**
 * RAWG 게임 리스트 조회 (Spring 프록시)
 * @param pageNext
 * @returns
 */
export const apiGetGameList = async (pageNext: number) => {
  try {
    const res = await instance.get("/game/list", {
      params: { page: pageNext },
    });
    return res.data;
  } catch (error) {
    console.error("게임 리스트 호출 에러", error);
    return null;
  }
};

/**
 * RAWG 상세 게임 정보 조회
 * @param gameId
 * @returns
 */
export const apiGetGameDetail = async (gameId: string) => {
  try {
    const res = await instance.get(`/game/detail/${gameId}`);
    return res.data;
  } catch (error) {
    console.error("게임 상세 호출 에러", error);
    return null;
  }
};

/**
 * 게임 장르별조회
 * @param Genres
 * @param pageNext
 * @returns
 */
export const apiGetGameGenres = async (Genres: string, pageNext: number) => {
  try {
    const res = await instance.get("/game/genres", {
      params: { genres: Genres, page: pageNext },
    });
    return res.data;
  } catch (error) {
    console.error("장르 리스트 호출 에러", error);
    return null;
  }
};

/**
 * 게임 이미지 가져오기
 * @param gameTitle
 * @returns
 */
export const apiGetGameImg = async (gameId: string) => {
  try {
    const res = await instance.get("/game/img", {
      params: { gameId: gameId },
    });
    return res.data;
  } catch (error) {
    console.error("게임 검색 호출 에러", error);
    return null;
  }
};

/**
 * 게임 제목 기반 RAWG 게임 목록 검색
 * @param gameTitle
 * @returns
 */
export const apiGetGameSearch = async (gameTitle: string) => {
  try {
    const res = await instance.get("/game/search/rwag", {
      params: { search: gameTitle },
    });
    return res.data;
  } catch (error) {
    console.error("게임 검색 호출 에러", error);
    return null;
  }
};

/**
 * Steam 가격 정보 조회 (게임 제목 기반)
 * 1. 제목으로 AppID 검색 → 2. 가격정보 호출 → 가격정보 반환
 * @param gameName
 * @returns
 */
export const apiGetSteamPriceByName = async (gameName: string) => {
  try {
    const searchRes = await instance.get("/game/search", {
      params: { q: gameName },
    });
    const searchData = searchRes.data;
    const appId = searchData[0]?.appid;
    if (!appId) return { error: "검색 실패" };

    const priceRes = await instance.get(`/game/price/${appId}`);
    const priceInfo = priceRes.data[appId]?.data?.price_overview;

    return priceInfo ?? { error: "무료 or 정보 없음" };
  } catch (error) {
    console.error("Steam 가격 호출 실패", error);
    return { error: "오류" };
  }
};
