import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router";

// 🔷 장바구니에 담기는 상품 아이템 타입 정의
interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  discount: number; // 할인율 (예: 10은 10%)
}

// 🔷 Layout에서 전달되는 context 타입 (사이드바 열림 여부)
interface LayoutContext {
  isSidebarOpen: boolean;
}

// ========================= 스타일 컴포넌트 =========================

// 🔹 페이지 전체 감싸는 래퍼 (사이드바 상태에 따라 margin 조정)
const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2em;
  background-color: #121317;
  box-sizing: border-box;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// 🔹 장바구니 전체 박스 스타일
const SectionBox = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1e1f1f;
  border-radius: 12px;
  padding: 40px;
  color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  margin-top: 100px;
`;

// 🔹 제목 스타일
const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

// 🔹 장바구니 항목 리스트 박스
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 🔹 개별 게임 카드
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

// 🔹 게임 이미지
const Image = styled.img`
  width: 130px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`;

// 🔹 게임 정보 영역
const Info = styled.div`
  flex: 1;
`;

// 🔹 게임 타이틀
const GameTitle = styled.h3`
  font-size: 20px;
  margin: 0 0 10px 0;
  font-weight: bold;
`;

// 🔹 가격 및 제거 버튼 컨테이너
const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  min-width: 150px;
`;

// 🔹 원가 표시 (줄긋기 효과 추가됨)
const Price = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
  color: #ccc;
`;

// 🔹 할인가 표시
const Discount = styled.div`
  font-size: 15px;
  color: #00e676;
  margin-bottom: 10px;
  font-weight: bold;
`;

// 🔹 항목 제거 버튼
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

// 🔹 총액 정보 바 (원가/할인/최종금액)
const TotalBar = styled.div`
  margin-top: 2em;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #555;
  padding-top: 20px;
  line-height: 1.8;
`;

// 🔹 결제 버튼
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

// ========================= 메인 컴포넌트 =========================

const CartPage: React.FC = () => {
  // 🔸 사이드바 열림 여부 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 🔸 초기 장바구니 상태 설정 (더미 데이터)
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

  // 🔸 항목 제거 함수
  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // 🔸 정가 총액
  const originalTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 🔸 할인 적용된 총액
  const discountedTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - item.discount / 100),
    0
  );

  // 🔸 총 할인 금액
  const totalDiscount = originalTotal - discountedTotal;

  // 🔸 결제 버튼 클릭 시
  const handleCheckout = () => {
    alert("결제 페이지로 이동합니다.");
  };

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <SectionBox>
        <Title>장바구니</Title>

        {/* 장바구니가 비었을 경우 */}
        {cart.length === 0 ? (
          <p style={{ color: "#ccc", textAlign: "center" }}>
            장바구니가 비어 있습니다.
          </p>
        ) : (
          <>
            {/* 장바구니 목록 */}
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
                      {/* 원가 - 흐릿하게 줄긋기 */}
                      <Price>
                        원가:{" "}
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                          }}
                        >
                          ₩ {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </Price>
                      {/* 할인가 - 강조 표시 */}
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

            {/* 총액 영역 */}
            <TotalBar>
              원가 총액: ₩ {originalTotal.toLocaleString()} <br />
              할인 금액: ₩ {totalDiscount.toLocaleString()} <br />
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
