// 엑셀 다운 설정
import { useState } from "react";
import { apiDownloadWalletLog } from "../api/excelApi";

export const ExcelDownload = async (userId: number) => {
  try {
    const blob = await apiDownloadWalletLog(userId);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "wallet_log.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("엑셀 다운로드 실패:", error);
  }
};

const ExcelButton = (userId: number) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await ExcelDownload(userId); // 유저 ID
    setIsDownloading(false);
  };

  return (
    <button type="button" onClick={handleDownload} disabled={isDownloading}>
      {isDownloading ? "다운로드 중..." : "전체내역 다운로드"}
    </button>
  );
};

export default ExcelButton;

//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: "white",
//           minHeight: "100vh",
//           padding: "30px",
//         }}
//       >
//         <button type="button" onClick={() => excelDownload(3)}>
//           다운
//         </button>
//       </div>
//     </>
//   );
// };
