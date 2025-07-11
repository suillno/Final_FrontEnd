import axios, { AxiosResponse, AxiosError } from "axios";
import {
  getCurrentUser,
  removeCurrentUser,
  setCurrentUser,
} from "../auth/helper/storage";
import store from "../auth/store/store";
import { setUserInfo } from "../auth/store/userInfo";
import Swal from "sweetalert2";

declare module "axios" {
  export interface InternalAxiosRequestConfig<D = any> {
    _retryCount?: number;
  }
}

/** 백엔드 호출용 */
// 백엔드 호출
export const instanceBack = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  timeout: 10000,
});

instanceBack.interceptors.request.use(
  (config) => {
    const user = getCurrentUser();

    if (user?.accessToken && user?.tokenType) {
      config.headers["Authorization"] = `${user.tokenType} ${user.accessToken}`;
    }

    const isFormData = config.data instanceof FormData;

    if (!isFormData) {
      config.headers["Content-Type"] = "application/json";
    } else {
      // FormData일 땐 Content-Type 자동 설정되도록 놔둠
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    console.error("[백엔드 요청 오류]", error);
    return Promise.reject(error);
  }
);

// 리플레시 토큰
// 응답 인터셉터
instanceBack.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: any = error.config;

    // 기본 재시도 횟수 초기화
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // 첫 실패일 경우 1회 재시도
    if (
      originalRequest._retryCount < 1 &&
      error.response &&
      (error.response.status === 401 || error.response.status === 406)
    ) {
      originalRequest._retryCount += 1;

      const user = getCurrentUser();

      try {
        // 1. refresh 토큰으로 access 갱신
        const { data: newToken } = await axios.post(
          `${process.env.REACT_APP_API_HOST}/auth/refresh`,
          { refreshToken: user.refreshToken }
        );

        // 2. 사용자 정보 다시 조회
        const { data: userInfo } = await axios.get(
          `${process.env.REACT_APP_API_HOST}/user/me`,
          {
            headers: {
              Authorization: `${newToken.tokenType} ${newToken.accessToken}`,
            },
          }
        );

        // 3. 사용자 정보 저장 및 헤더 재설정
        setCurrentUser(newToken);
        store.dispatch(setUserInfo(userInfo));
        instanceBack.defaults.headers.common[
          "Authorization"
        ] = `${newToken.tokenType} ${newToken.accessToken}`;

        // 4. 원래 요청 재시도
        return instanceBack(originalRequest);
      } catch (refreshError: any) {
        Swal.fire({
          title: "Error!",
          text: "로그인이 만료되었습니다. 다시 로그인해주세요.",
          icon: "error",
          confirmButtonText: "확인",
        }).then(() => {
          removeCurrentUser();
          // window.location.href = "/";
        });

        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 403) {
      Swal.fire({
        title: "접근 불가",
        text: "이 요청을 수행할 권한이 없습니다.",
        icon: "error",
        confirmButtonText: "확인",
      });
    } else if (
      error.response?.data &&
      (error.response.data as any).status_message
    ) {
      Swal.fire({
        title: "요청 실패",
        text: (error.response.data as any).status_message,
        icon: "error",
        confirmButtonText: "확인",
      });
    } else {
      Swal.fire({
        title: "알 수 없는 오류",
        text: "예기치 않은 오류가 발생했습니다. 관리자에게 문의해주세요.",
        icon: "error",
        confirmButtonText: "확인",
      });
    }

    return Promise.reject(error);
  }
);

// AxiosRequestConfig 타입 확장
declare module "axios" {
  export interface InternalAxiosRequestConfig<D = any> {
    _retryCount?: number;
  }
}

// 회원동작처리 저장
export const instanceAuth = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 5000,
});

instanceAuth.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    // 토큰 자동 삽입
    const token = getCurrentUser();
    if (token?.tokenType && token?.accessToken) {
      config.headers?.set(
        "Authorization",
        `${token.tokenType}${token.accessToken}`
      );
    }

    return config;
  },
  (error) => {
    console.error("[백엔드 요청 오류]", error);
    return Promise.reject(error);
  }
);

/** 아래부터 게임 api 호출용도 */
// 게임 api 호출
export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 10000,
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
