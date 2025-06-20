import React, { useEffect, useState } from "react";
import { apiGetSteamPriceByName } from "./api";

// 컴포넌트에 전달될 props 타입 정의
// gameName: Steam 가격을 검색할 게임 제목
interface SteamPriceProps {
  gameName: string;
}

// SteamPrice 컴포넌트
// 전달받은 gameName을 기반으로 Steam 가격 정보를 가져와 렌더링
const SteamPrice: React.FC<SteamPriceProps> = ({ gameName }) => {
  // 가격 정보 상태 (문자열 형태로 저장)
  const [price, setPrice] = useState<string>("로딩 중...");

  // 마운트 및 gameName 변경 시 가격 조회
  useEffect(() => {
    const fetchPrice = async () => {
      // API 호출 (gameName으로 appid 검색 → 가격 정보 반환)
      const result = await apiGetSteamPriceByName(gameName);

      // 실패 또는 데이터 없음 처리
      if ("error" in result) {
        setPrice(result.error);
        return;
      }

      // 정상 응답 시 가격 포맷팅 처리
      const currency = result.currency;
      const finalPrice = result.final / 100;

      // 원화(KRW)일 경우 ,단위 추가 / 그 외는 통화코드 유지
      const formatted =
        currency === "KRW"
          ? `${finalPrice.toLocaleString("ko-KR")} 원`
          : `${finalPrice.toFixed(2)} ${currency}`;

      setPrice(formatted); // 상태 업데이트
    };

    fetchPrice(); // 함수 실행
  }, [gameName]);

  // 렌더링 영역: 가격 정보와 아이콘 출력
  return (
    <div className="text-sm mt-1">
      <span className="flex items-center gap-1">
        {/* 동그라미 안에 화폐 아이콘 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 23q-2.8 0-5.15-1.275T3 18.325V21H1v-6h6v2H4.525q1.2 1.8 3.163 2.9T12 21q1.875 0 3.513-.712t2.85-1.925t1.925-2.85T21 12h2q0 2.275-.862 4.275t-2.363 3.5t-3.5 2.363T12 23m-.9-4v-1.3q-1.175-.275-1.912-1.012T8.1 14.75l1.65-.65q.3 1.025.938 1.538t1.462.512t1.413-.387t.587-1.213q0-.725-.612-1.175T11.35 12.35q-1.475-.525-2.162-1.25T8.5 9.2q0-1.025.713-1.862T11.15 6.25V5h1.75v1.25q.9.075 1.638.725T15.55 8.5l-1.6.65q-.2-.575-.65-.962T12.05 7.8q-.875 0-1.338.375T10.25 9.2t.575 1.025t2.075.875q1.8.65 2.4 1.525t.6 1.925q0 .725-.25 1.275t-.663.938t-.962.625t-1.175.362V19zM1 12q0-2.275.863-4.275t2.362-3.5t3.5-2.362T12 1q2.8 0 5.15 1.275t3.85 3.4V3h2v6h-6V7h2.475q-1.2-1.8-3.162-2.9T12 3q-1.875 0-3.512.713t-2.85 1.924t-1.925 2.85T3 12z"
          />
        </svg>
        가격: {price}
      </span>
    </div>
  );
};

export default SteamPrice;
