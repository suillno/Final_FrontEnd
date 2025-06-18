import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

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
  background-color: #1e1f24;
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
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 30px;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
`;

// 장바구니 제목
const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
`;

// 게임 리스트 컨테이너
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 개별 아이템 카드
const ItemCard = styled.div`
  background-color: #2b2b2b;
  border-radius: 6px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.01);
  }
`;

// 게임 이미지
const Image = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

// 텍스트 정보 영역
const Info = styled.div`
  flex: 1;
`;

// 게임 제목
const GameTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
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
`;

// 할인가 표시
const Discount = styled.div`
  font-size: 14px;
  color: #00e676;
  margin-bottom: 8px;
`;

// 제거 버튼
const RemoveButton = styled.button`
  padding: 8px 12px;
  background-color: #a94442;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
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
  margin-top: 1em;
  width: 100%;
  padding: 15px;
  background-color: #00c853;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #00b04c;
  }
`;

// === 메인 장바구니 컴포넌트 ===
const CartPage: React.FC = () => {
  // 사이드바 열림 상태 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 장바구니 초기 상태 (더미 데이터)
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      title: "SCUM",
      image: "/games/scum.jpg",
      price: 49000,
      quantity: 1,
      discount: 10,
    },
    {
      id: 2,
      title: "Monster Hunter Rise",
      image: "/games/mhr.jpg",
      price: 11200,
      quantity: 2,
      discount: 20,
    },
  ]);

  // 항목 제거
  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 총 정가 계산
  const originalTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 총 할인 금액 적용한 결제 금액 계산
  const discountedTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - item.discount / 100),
    0
  );

  // 할인된 총액
  const totalDiscount = originalTotal - discountedTotal;

  // 결제 버튼 클릭 시
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
            {/* 장바구니 아이템 리스트 */}
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

            {/* 총 금액 정보 */}
            <TotalBar>
              원가 총액: ₩ {originalTotal.toLocaleString()} <br />
              할인 금액: - ₩ {totalDiscount.toLocaleString()} <br />
              <span style={{ color: "#00e676" }}>
                최종 결제 금액: ₩ {discountedTotal.toLocaleString()}
              </span>
            </TotalBar>

            {/* 결제 버튼 */}
            <CheckoutButton onClick={handleCheckout}>결제하기</CheckoutButton>
          </>
        )}
      </SectionBox>
    </PageWrapper>
  );
};

export default CartPage;
