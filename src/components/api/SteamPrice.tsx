import React, { useEffect, useState } from "react";
import { apiGetSteamPriceByName } from "./api";
import { PriceSvg } from "../../img/SvgImg";

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
  return <>{price}</>;
};

export default SteamPrice;
