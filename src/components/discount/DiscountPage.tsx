// DiscountPage.tsx - 할인 게임 카드 컴포넌트
import React from "react";
import styled from "styled-components";
import { apiAddGameGroupReservation, GameDiscount } from "../api/backApi";
import PGLogoContents from "../../img/PGLogoContents.png";
import { CalenderSvg, PriceSvg } from "../../img/SvgImg";
import { Link } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineTrendingDown } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../auth/store/userInfo";

// 카드 전체 스타일

const Card = styled.div`
  background-color: #2a2b32;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;

  img {
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
`;

// 카드 하단 정보 영역
const Info = styled.div`
  padding: 0.8rem;
  color: white;
  background-color: #1e1f24;
`;

// 컴포넌트 Prop 정의
interface Props {
  item: GameDiscount;
  onUpdated?: () => void; // 콜백 props 정의
}

// 체크 아이콘
const CheckIcon = styled(GiCheckMark)`
  color: gray;
  transition: color 0.2s;
  cursor: pointer;
  width: 20px;
  height: 20px;

  button:hover & {
    color: green;
  }
`;

// 할인가
const DownIcon = styled(MdOutlineTrendingDown)`
  width: 20px;
  height: 20px;
`;

// 할인 카드 컴포넌트
const DiscountPage: React.FC<Props> = ({ item, onUpdated }) => {
  const userInfo = useSelector(selectUserInfo);
  // 공동구매 신청 호출
  const GameGroupReservation = async () => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }
    const reservationDate = {
      userName: userInfo.username,
      gameId: item.gameId,
    };
    try {
      const response = await apiAddGameGroupReservation(reservationDate);
      // 문자열 앞 SUCCESS 및 ERROR 자르고 배열의 두 요소를 각각 변수에 담음
      const [status, message] = response
        // 문자열을 ":" 기준으로 분리합니다.
        .split(":")
        // 배열의 각 요소에 대해 trim()을 적용해서 앞뒤 공백 제거
        .map((s: string) => s.trim());

      if (status === "SUCCESS") {
        alert(message); // 성공 메세지
        onUpdated?.();
      } else {
        alert("에러: " + message);
      }
    } catch (error) {
      console.error("공동구매 신청 오류", error);
      alert("공동구매 신청 등록중 오류가 발생했습니다.");
    }
  };

  return (
    <Card>
      {/* 썸네일 이미지 (이미지 없을 시 대체) */}
      <Link to={`/game/${item.gameId}`}>
        <img
          src={item.backgroundImage || PGLogoContents}
          alt={item.title}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
          }}
        />
      </Link>
      {/* 게임 정보 */}
      <Info>
        {/* 게임 제목 */}
        <div className="font-bold text-lg mb-1">{item.title}</div>

        {/* 출시일 */}
        <div className="text-sm mb-1 flex items-center gap-1">
          <CalenderSvg />
          출시일: {item.released || "미정"}
        </div>

        {/* 원래 가격 / 할인 가격 */}
        <div className="text-sm flex flex-col gap-0.5">
          {/* 정가 / 할인율 양쪽정렬 */}
          <div className="flex justify-between">
            <div className="flex items-center gap-1 line-through text-gray-400">
              <PriceSvg />
              정가: {item.price.toLocaleString()}원
            </div>
            <div className="text-sm mb-1">
              할인율:{" "}
              <span className="font-semibold text-red-400">
                {item.discountPercent?.toFixed(1)}%
              </span>
            </div>
          </div>
          {/* 할인가 / 공동구매체크 양쪽정렬 */}
          <div className="flex justify-between">
            <div className="flex items-center gap-1 text-green-400 font-semibold">
              <DownIcon />
              할인가: {item.salePrice.toLocaleString()}원
            </div>
            <div>
              <button
                className="flex items-center gap-1"
                type="button"
                onClick={GameGroupReservation}
              >
                <CheckIcon />
                <span>{item.countApplicants}명 신청시 구매가능</span>
              </button>
            </div>
          </div>
        </div>
      </Info>
    </Card>
  );
};

export default DiscountPage;
