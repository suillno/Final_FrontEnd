import React, { useEffect, useState } from "react";
import { apiGetSteamPriceByName } from "./api";
import { PriceSvg } from "../../img/SvgImg";

// 부모 컴포넌트로부터 전달받는 props 타입 정의
interface SteamPriceProps {
  gameName: string; // Steam에서 가격을 조회할 게임 이름
  onPriceFetched?: (numericPrice: number, formattedPrice: string) => void;
  // 가격 데이터를 부모 컴포넌트로 전달하는 콜백 함수 (선택적)
}

const SteamPrice: React.FC<SteamPriceProps> = ({
  gameName,
  onPriceFetched,
}) => {
  // 내부 표시용 상태: 포맷팅된 가격 문자열 (ex: "29,800 원")
  const [price, setPrice] = useState<string>("로딩 중...");

  // 컴포넌트가 처음 마운트되거나 gameName이 변경될 때 가격 조회
  useEffect(() => {
    const fetchPrice = async () => {
      // API 호출로 가격 정보 가져오기
      const result = await apiGetSteamPriceByName(gameName);

      // 에러가 있는 경우
      if ("error" in result) {
        setPrice(result.error); // 에러 메시지 출력
        onPriceFetched?.(0, result.error); // 부모에게 에러 전달 (선택적)
        return;
      }

      // 정상 데이터 처리
      const currency = result.currency; // 통화 코드 (예: "KRW")
      const finalPrice = result.final / 100; // 실제 가격 (정수 → 소수 변환)

      // 포맷팅된 가격 문자열 생성
      const formatted =
        currency === "KRW"
          ? `${finalPrice.toLocaleString("ko-KR")} 원`
          : `${finalPrice.toFixed(2)} ${currency}`;

      // 내부 상태 업데이트 (출력용)
      setPrice(formatted);

      // 부모 컴포넌트로 가격 전달 (선택적으로 onPriceFetched 콜백 호출)
      onPriceFetched?.(finalPrice, formatted);
    };

    // 비동기 함수 실행
    fetchPrice();
  }, [gameName]); // gameName이 바뀔 때마다 다시 실행

  // 화면에 표시
  return <>{price}</>;
};

export default SteamPrice;
