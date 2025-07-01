import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext, useNavigate } from "react-router-dom";

// ===============================
// 🔷 LayoutContext: 사이드바 열림 여부 받아오기 위한 타입
// ===============================
interface LayoutContext {
  isSidebarOpen: boolean;
}

// ===============================
// 🔷 GameItem: 찜한 게임 항목에 대한 타입 정의
// ===============================
interface GameItem {
  id: number;
  title: string;
  price: number;
  discountRate?: number;
  image: string;
}

// ===============================
// 🔷 초기 찜목록 더미 데이터
//     - 이미지 URL은 안전한 placehold.co 도메인 사용
// ===============================
const initialWishlist: GameItem[] = [
  {
    id: 1,
    title: "Elden Ring",
    price: 59900,
    discountRate: 20,
    image: "https://placehold.co/150x200?text=Elden+Ring",
  },
  {
    id: 2,
    title: "God of War",
    price: 49900,
    image: "https://placehold.co/150x200?text=God+of+War",
  },
  {
    id: 3,
    title: "Hades",
    price: 19900,
    discountRate: 10,
    image: "https://placehold.co/150x200?text=Hades",
  },
];

// ===============================
// 💅 styled-components 정의 (페이지 레이아웃 및 카드 스타일)
// ===============================
const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  padding: 2em;
  background-color: #1e1f24;
  min-height: 100vh;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;
`;

const SectionBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  margin-top: 100px;
  margin-bottom: 100px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #ffffff;
`;

const CartMoveButton = styled.button`
  background-color: #00bfff;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #008ecc;
  }
`;

const GameGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const GameCard = styled.div`
  background-color: #292b32;
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
`;

const GameImage = styled.img`
  width: 120px;
  height: auto;
  border-radius: 6px;
  cursor: pointer;
`;

const GameInfo = styled.div`
  flex: 1;
`;

const GameTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 8px;
`;

const PriceWrapper = styled.div`
  margin: 10px 0;
`;

const OriginalPrice = styled.span`
  color: #aaa;
  text-decoration: line-through;
  margin-right: 6px;
  font-size: 14px;
`;

const DiscountedPrice = styled.span`
  color: #00bfff;
  font-weight: bold;
`;

const DiscountRateTag = styled.span`
  display: inline-block;
  margin-top: 6px;
  padding: 4px 8px;
  font-size: 12px;
  color: #fff;
  background-color: #ff3d3d;
  border-radius: 12px;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  border: none;
`;

const CartButton = styled(Button)`
  background: linear-gradient(135deg, #4caf50, #66bb6a);
  color: white;

  &:hover {
    background: #43a047;
  }
`;

const RemoveButton = styled(Button)`
  background: linear-gradient(135deg, #d32f2f, #f44336);
  color: white;

  &:hover {
    background: #b71c1c;
  }
`;

const EmptyMessage = styled.p`
  font-size: 18px;
  color: #aaa;
  text-align: center;
  margin-top: 30px;
`;

// ===============================
// 📦 WishList 컴포넌트 구현부
// ===============================
const WishList: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>(); // 레이아웃 컨텍스트
  const navigate = useNavigate(); // 라우터 내비게이션
  const [wishlist, setWishlist] = useState<GameItem[]>(initialWishlist); // 찜목록 상태

  // 🔸 찜 해제 버튼 클릭 시 항목 제거
  const handleRemove = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  // 🔸 장바구니 담기 버튼 클릭 시 알림
  const handleAddToCart = (game: GameItem) => {
    alert(`"${game.title}" 장바구니에 담았습니다.`);
  };

  // 🔸 게임 이미지 클릭 시 상세페이지로 이동
  const handleViewDetail = (id: number) => {
    navigate(`/game/${id}`);
  };

  // 🔸 상단 버튼 클릭 시 장바구니 페이지로 이동
  const handleGoToCart = () => {
    navigate("/member/CartPage");
  };

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <SectionBox>
        <HeaderRow>
          <Title>찜한 게임 목록</Title>
          <CartMoveButton onClick={handleGoToCart}>
            장바구니로 이동ss
          </CartMoveButton>
        </HeaderRow>

        {wishlist.length === 0 ? (
          <EmptyMessage>찜한 게임이 없습니다.</EmptyMessage>
        ) : (
          <GameGrid>
            {wishlist.map((game) => {
              const hasDiscount = game.discountRate && game.discountRate > 0;
              const discountedPrice = hasDiscount
                ? Math.floor(game.price * (1 - game.discountRate! / 100))
                : game.price;

              return (
                <GameCard key={game.id}>
                  <GameImage
                    src={game.image}
                    alt={game.title}
                    onClick={() => handleViewDetail(game.id)}
                    onError={(e) => {
                      e.currentTarget.src = "/fallback-image.png"; // 이미지 깨질 경우 대체 이미지
                    }}
                  />
                  <GameInfo>
                    <GameTitle>{game.title}</GameTitle>
                    <PriceWrapper>
                      {hasDiscount ? (
                        <>
                          <OriginalPrice>
                            {game.price.toLocaleString()}원
                          </OriginalPrice>
                          <DiscountedPrice>
                            {discountedPrice.toLocaleString()}원
                          </DiscountedPrice>
                          <DiscountRateTag>
                            {game.discountRate}% 할인
                          </DiscountRateTag>
                        </>
                      ) : (
                        <DiscountedPrice>
                          {game.price.toLocaleString()}원
                        </DiscountedPrice>
                      )}
                    </PriceWrapper>
                    <ButtonGroup>
                      <CartButton onClick={() => handleAddToCart(game)}>
                        장바구니 담기
                      </CartButton>
                      <RemoveButton onClick={() => handleRemove(game.id)}>
                        찜 해제
                      </RemoveButton>
                    </ButtonGroup>
                  </GameInfo>
                </GameCard>
              );
            })}
          </GameGrid>
        )}
      </SectionBox>
    </PageWrapper>
  );
};

export default WishList;
