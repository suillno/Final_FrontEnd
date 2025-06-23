import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router";

// === 타입 정의 ===

// 장바구니에 들어가는 상품 항목 타입
interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  discount: number; // 할인율 (예: 10은 10%)
}

// 레이아웃 컨텍스트 타입 (사이드바 열림 여부)
interface LayoutContext {
  isSidebarOpen: boolean;
}

// === 스타일 컴포넌트 정의 ===

// 전체 페이지 감싸는 컨테이너 (사이드바 열림 시 좌측 여백 조정)
const PageWrapper = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2em;
  background-color: #121317;
  box-sizing: border-box;
  margin-left: ${(props) => (props.isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// 장바구니 전체 영역 박스
const SectionBox = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1e1f1f;
  border-radius: 12px;
  padding: 40px;
  color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
`;

// 장바구니 제목
const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

// 게임 리스트 컨테이너
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 개별 아이템 카드
const ItemCard = styled.div`
  background-color: #292c31;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.01);
  }
`;

// 게임 이미지
const Image = styled.img`
  width: 130px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`;

// 텍스트 정보 영역
const Info = styled.div`
  flex: 1;
`;

// 게임 제목
const GameTitle = styled.h3`
  font-size: 20px;
  margin: 0 0 10px 0;
  font-weight: bold;
`;

// 가격 정보, 제거 버튼을 감싸는 박스
const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  min-width: 150px;
`;

// 정가 표시
const Price = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: #ccc;
`;

// 할인가 표시
const Discount = styled.div`
  font-size: 15px;
  color: #00e676;
  margin-bottom: 10px;
  font-weight: bold;
`;

// 제거 버튼
const RemoveButton = styled.button`
  padding: 8px 12px;
  background-color: #d32f2f;
  border: none;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b71c1c;
  }
`;

// 최종 결제 금액 요약
const TotalBar = styled.div`
  margin-top: 2em;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #555;
  padding-top: 20px;
  line-height: 1.8;
`;

// 결제 버튼
const CheckoutButton = styled.button`
  margin-top: 1.5em;
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #00c853, #009b46);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #00b04c;
  }
`;

// === 메인 장바구니 컴포넌트 ===
const CartPage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      title: "엘든 링",
      image: "/games/scum.jpg",
      price: 49000,
      quantity: 1,
      discount: 10,
    },
    {
      id: 2,
      title: "스타듀 밸리",
      image: "/games/mhr.jpg",
      price: 11200,
      quantity: 2,
      discount: 20,
    },
  ]);

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const originalTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountedTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - item.discount / 100),
    0
  );

  const totalDiscount = originalTotal - discountedTotal;

  const handleCheckout = () => {
    alert("결제 페이지로 이동합니다.");
  };

  return (
    <PageWrapper isSidebarOpen={isSidebarOpen}>
      <SectionBox>
        <Title>장바구니</Title>

        {cart.length === 0 ? (
          <p style={{ color: "#ccc", textAlign: "center" }}>
            장바구니가 비어 있습니다.
          </p>
        ) : (
          <>
            <List>
              {cart.map((item) => {
                const discounted =
                  item.price * item.quantity * (1 - item.discount / 100);

                return (
                  <ItemCard key={item.id}>
                    <Image src={item.image} alt={item.title} />
                    <Info>
                      <GameTitle>{item.title}</GameTitle>
                    </Info>
                    <PriceBox>
                      <Price>
                        원가: ₩ {(item.price * item.quantity).toLocaleString()}
                      </Price>
                      <Discount>
                        할인가: ₩ {discounted.toLocaleString()} ({item.discount}
                        % ↓)
                      </Discount>
                      <RemoveButton onClick={() => removeItem(item.id)}>
                        제거
                      </RemoveButton>
                    </PriceBox>
                  </ItemCard>
                );
              })}
            </List>

            <TotalBar>
              원가 총액: ₩ {originalTotal.toLocaleString()} <br />
              할인 금액: - ₩ {totalDiscount.toLocaleString()} <br />
              <span style={{ color: "#00e676" }}>
                최종 결제 금액: ₩ {discountedTotal.toLocaleString()}
              </span>
            </TotalBar>

            <CheckoutButton onClick={handleCheckout}>결제하기</CheckoutButton>
          </>
        )}
      </SectionBox>
    </PageWrapper>
  );
};

export default CartPage;
