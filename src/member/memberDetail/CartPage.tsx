import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

// 장바구니에 담긴 아이템 데이터 타입 정의
interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

// 레이아웃에서 전달받는 사이드바 열림 상태 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 전체 페이지 레이아웃
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

// 장바구니 박스 스타일
const SectionBox = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 30px;
  color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
`;

// 제목 스타일
const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 25px;
  text-align: center;
`;

// 장바구니 목록 영역
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

// 텍스트 정보 컨테이너
const Info = styled.div`
  flex: 1;
`;

// 게임 타이틀 텍스트
const GameTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

// 수량 조절 버튼 영역
const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;

  button {
    background-color: #3b3f45;
    border: none;
    color: white;
    padding: 4px 10px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

// 가격 및 제거 버튼 영역
const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  min-width: 150px;
`;

// 가격 텍스트
const Price = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

// 아이템 제거 버튼
const RemoveButton = styled.button`
  padding: 8px 12px;
  background-color: #a94442;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

// 총합 표시 영역
const TotalBar = styled.div`
  margin-top: 2em;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #555;
  padding-top: 20px;
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

// 장바구니 페이지 컴포넌트
const CartPage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 장바구니 초기 상태 설정
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      title: "SCUM",
      image: "/games/scum.jpg",
      price: 49000,
      quantity: 1,
    },
    {
      id: 2,
      title: "Monster Hunter Rise",
      image: "/games/mhr.jpg",
      price: 11200,
      quantity: 2,
    },
  ]);

  // 항목 제거 함수
  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // // 수량 변경 함수
  // const changeQuantity = (id: number, amount: number) => {
  //   setCart(
  //     cart.map((item) =>
  //       item.id === id
  //         ? { ...item, quantity: Math.max(1, item.quantity + amount) }
  //         : item
  //     )
  //   );
  // };

  // 총 가격 계산
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 결제 버튼 클릭 핸들러
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
              {cart.map((item) => (
                <ItemCard key={item.id}>
                  <Image src={item.image} alt={item.title} />
                  <Info>
                    <GameTitle>{item.title}</GameTitle>
                    {/* <QuantityControl>
                      <button onClick={() => changeQuantity(item.id, -1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => changeQuantity(item.id, 1)}>
                        +
                      </button>
                    </QuantityControl> */}
                  </Info>
                  <PriceBox>
                    <Price>
                      ₩ {(item.price * item.quantity).toLocaleString()}
                    </Price>
                    <RemoveButton onClick={() => removeItem(item.id)}>
                      제거
                    </RemoveButton>
                  </PriceBox>
                </ItemCard>
              ))}
            </List>
            <TotalBar>총 합계: ₩ {total.toLocaleString()}</TotalBar>
            <CheckoutButton onClick={handleCheckout}>결제하기</CheckoutButton>
          </>
        )}
      </SectionBox>
    </PageWrapper>
  );
};

export default CartPage;
