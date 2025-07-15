import { instanceBack } from "./instance";

// 지갑 로그 엑셀 다운로드 API
export const apiDownloadWalletLog = async (userId: number) => {
  const res = await instanceBack.get(`/excel/download/${userId}`, {
    responseType: "blob",
  });
  return res.data;
};
