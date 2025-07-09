// DiscountPage.tsx - 할인 게임 카드 컴포넌트
import React, { useState } from "react";
import styled from "styled-components";
import {
  apiAddGameCart,
  apiAddGameGroupReservation,
  GameDiscount,
} from "../api/backApi";
import PGLogoContents from "../../img/PGLogoContents.png";
import { CalenderSvg, PriceSvg } from "../../img/SvgImg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../auth/store/userInfo";
import { useEffect } from "react";
import { apiCheckGameCart } from "../api/backApi";
import {
  Card,
  CartIcon,
  CheckIcon,
  DownIcon,
  Info,
} from "./DiscountPage.style";

// 컴포넌트 Prop 정의
interface Props {
  item: GameDiscount;
  onUpdated?: () => void; // 콜백 props 정의
}

// 할인 카드 컴포넌트
const DiscountPage: React.FC<Props> = ({ item, onUpdated }) => {
  // 카트 상태 확인
  const [cartActive, setCartActive] = useState(false);

  const userInfo = useSelector(selectUserInfo);

  // 카트 상태 조회
  useEffect(() => {
    const checkCartStatus = async () => {
      if (!userInfo.username || !item.gameId) return;
      try {
        const result = await apiCheckGameCart(userInfo.username, item.gameId);
        setCartActive(Boolean(result));
      } catch (err) {
        console.error("장바구니 상태 확인 실패", err);
      }
    };

    checkCartStatus();
  }, [item.gameId, userInfo.username]);

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

  const cartSave = async () => {
    if (!userInfo.username) {
      alert("로그인 후 사용 가능합니다");
      return;
    }

    const data = {
      userName: userInfo.username,
      gameId: item.gameId,
      title: item.title,
      backgroundImage: item.backgroundImage,
      price: item.price,
      released: item.released,
      esrbRating: item.esrbRating || "정보 없음",
      salePrice: item.salePrice || 0,
    };

    try {
      const res = await apiAddGameCart(data);
      const [status, message] = res.split(":").map((s: string) => s.trim());
      if (status === "SUCCESS") {
        alert(message);
        setCartActive((prev) => !prev);
      } else {
        alert("에러: " + message);
      }
    } catch (error) {
      alert("요청 처리 중 오류 발생");
    }
  };

  // 공동구매 신청자 목록을 쉼표로 분리하여 배열로 만듦 (ex: ["user1", "user2"])
  const applicantNames =
    item.applicantList?.split(",").map((s) => s.trim()) || [];

  // 현재 로그인한 사용자가 공동구매 신청자에 포함되어 있는지 여부
  const isApplicant = applicantNames.includes(userInfo.username);

  // 게임이 현재 공동구매 신청 가능한 상태인지 여부
  const isActive = item.isActive === 1;

  // 버튼 렌더링을 위한 조건들 정리
  const showGroupPurchaseButton = isActive && item.applicantList; // 공동구매 신청 버튼 노출
  const showCartButton = !isActive && isApplicant; // 공동구매 종료 + 신청자 → 장바구니 버튼
  const showEndMessage = !isActive && !isApplicant; // 공동구매 종료 + 비신청자 → 안내 메시지
  // 게임 이미지 표기
  const gameImg = (
    <img
      src={item.backgroundImage || PGLogoContents}
      alt={item.title}
      style={{
        width: "100%",
        height: "160px",
        objectFit: "cover",
      }}
    />
  );
  // 신청종료시 이미지클릭
  const handleImageClick = () => {
    alert("이 게임의 공동구매는 마감되었습니다.");
  };

  // 이미지 클릭시 정보전달
  const navigate = useNavigate();
  const onGameClick = (item: any) => {
    navigate(`/game/${item.gameId}`, {
      state: {
        priceDiscountInfo: item.salePrice.toLocaleString(),
        priceInfo: item.price.toLocaleString(),
        discountPercent: item.discountPercent?.toFixed(1),
        showCartButton,
      },
    });
  };

  return (
    <Card>
      {/* 썸네일 이미지 (이미지 없을 시 대체) */}
      {showEndMessage ? (
        <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
          {gameImg}
        </div>
      ) : (
        <div onClick={() => onGameClick(item)}>{gameImg}</div>
      )}

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
              <span className="flex font-semibold text-red-400">
                {item.discountPercent?.toFixed(1)}%
                <DownIcon />
              </span>
            </div>
          </div>
          {/* 할인가 / 공동구매체크 양쪽정렬 */}
          <div className="flex justify-between">
            <div className="flex items-center gap-1 text-green-400 font-semibold">
              <PriceSvg />
              할인가: {item.salePrice.toLocaleString()}원
            </div>
            <div>
              {showGroupPurchaseButton ? (
                <button
                  className="flex items-center"
                  type="button"
                  onClick={GameGroupReservation}
                >
                  <CheckIcon />
                  <span className="text-gray-400 text-sm">
                    {item.countApplicants}명 참여시 구매가능
                  </span>
                </button>
              ) : showCartButton ? (
                <button
                  onClick={cartSave}
                  className="group hover:bg-black-700 text-white font-bold rounded shadow"
                >
                  <CartIcon
                    className={`group-hover:text-green-500 transition-colors duration-200 ${
                      cartActive ? "text-green-500" : "text-white"
                    }`}
                  />
                </button>
              ) : showEndMessage ? (
                <p className="text-gray-400 text-sm">
                  공동구매가 마감되었습니다.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </Info>
    </Card>
  );
};

export default DiscountPage;
