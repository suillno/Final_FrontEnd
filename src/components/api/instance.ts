import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 5000,
});

// 요청 보내기 직전에 URL 확인 (여기에 넣어주세요)
instance.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log("요청 URL:", fullUrl);
    console.log("요청 파라미터:", config.params);
    return config;
  },
  (error) => {
    console.log("요청 직전 오류", error);

    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log(error);

    alert(error.response.data.status_message);

    return Promise.reject(error);
  }
);
