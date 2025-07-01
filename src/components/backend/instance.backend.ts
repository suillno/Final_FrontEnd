import axios, { AxiosResponse, AxiosError } from "axios";

// AxiosRequestConfig 타입 확장
declare module "axios" {
  export interface InternalAxiosRequestConfig<D = any> {
    _retryCount?: number;
  }
}

// 백엔드 호출
export const instance = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  timeout: 5000,
});

// 요청 인터셉터 (URL 확인용)
instance.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    return config;
  },
  (error) => {
    console.log("요청 직전 오류", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 결과가 null이면 재시도 로직 실행
    if (response?.data?.results === null) {
      console.warn("results가 null입니다. 요청 재시도 중...");

      const config = response.config;

      // 재시도 횟수 설정 (최대 5회)
      if (!config._retryCount) config._retryCount = 0;

      if (config._retryCount < 5) {
        config._retryCount += 1;
        return instance(config); // 🔁 재시도
      }

      // 재시도해도 null이면 그대로 반환
      console.warn("재시도 후에도 null입니다.");
    }

    return response;
  },

  async (error: AxiosError) => {
    console.log("응답 오류:", error);

    // 응답 객체가 존재하고 status_message가 있다면
    if (error.response?.data && (error.response.data as any).status_message) {
      alert((error.response.data as any).status_message);
    }

    return Promise.reject(error);
  }
);
