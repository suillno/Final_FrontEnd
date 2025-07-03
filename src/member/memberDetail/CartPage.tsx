import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import {
  apiGetCartList,
  apiAddGameCart,
  CartItem,
} from "../../components/api/backApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameActionButtons from "../../components/gamedetail/GameActionButtons";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";

// 🔷 Layout에서 전달되는 context 타입 정의
interface LayoutContext {
  isSidebarOpen: boolean;
}

/* ======================= 💅 Styled-components ======================= */

const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2em;
  background-color: #121317;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;
`;

const SectionBox = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1e1f1f;
  border-radius: 12px;
  padding: 40px;
  color: #fff;
  margin-top: 100px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemCard = styled.div`
  background-color: #292c31;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

const Image = styled.img`
  width: 130px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
`;

const Info = styled.div`
  flex: 1;
`;

const GameTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const SubInfo = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-top: 4px;
  line-height: 1.6;
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 160px;
`;

const Price = styled.div`
  font-size: 16px;
  color: #ccc;
`;

const OriginalPrice = styled.div`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;
`;

const SalePrice = styled.div`
  font-size: 16px;
  color: #00eaff;
  font-weight: bold;
`;

const DiscountRate = styled.span`
  font-size: 13px;
  color: #ff6b6b;
  margin-left: 6px;
`;

const TotalBar = styled.div`
  margin-top: 2em;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #555;
  padding-top: 20px;
  line-height: 1.8;
`;

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

  &:hover {
    background-color: #00b04c;
  }
`;

/* ======================= 🧾 Main Cart Component ======================= */

const CartPage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const userInfo = useSelector(selectUserInfo);
  const username = userInfo?.username;

  const fetchCartItems = async () => {
    if (!username) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      const data = await apiGetCartList(username);
      setCart(data);
    } catch (err) {
      console.error("장바구니 불러오기 실패", err);
      setError("장바구니 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [username]);

  const handleRemove = async (item: CartItem) => {
    const confirmed = window.confirm(
      `"${item.title}" 을(를) 장바구니에서 삭제하시겠습니까?`
    );
    if (!confirmed) return;

    try {
      const result = await apiAddGameCart({
        userName: username,
        gameId: item.gameId,
        title: item.title,
        backgroundImage: item.backgroundImage,
        price: item.price,
        salePrice: item.salePrice,
      });

      if (result.includes("취소")) {
        toast.success(`🗑 "${item.title}" 삭제 완료`, {
          position: "bottom-center",
          autoClose: 2000,
        });
        fetchCartItems();
      } else {
        toast.error("❗삭제 실패: " + result);
      }
    } catch (err) {
      toast.error("❌ 삭제 중 오류가 발생했습니다.");
    }
  };

  // 🔢 할인율 계산 함수
  const getDiscountRate = (price: number, salePrice: number): number => {
    if (price <= 0 || salePrice <= 0) return 0;
    return Math.floor(((price - salePrice) / price) * 100);
  };

  // ✅ 총합 계산: 할인 있으면 salePrice, 없으면 price 사용
  const finalTotal = cart.reduce((sum, item) => {
    return sum + (item.salePrice >= 1 ? item.salePrice : item.price);
  }, 0);

  if (error) {
    return (
      <PageWrapper $isSidebarOpen={isSidebarOpen}>
        <SectionBox>
          <Title>장바구니</Title>
          <p style={{ color: "#f55" }}>{error}</p>
        </SectionBox>
        <ToastContainer />
      </PageWrapper>
    );
  }

  if (cart.length === 0) {
    return (
      <PageWrapper $isSidebarOpen={isSidebarOpen}>
        <SectionBox>
          <Title>장바구니</Title>
          <p style={{ color: "#ccc", textAlign: "center" }}>
            장바구니가 비어 있습니다.
          </p>
        </SectionBox>
        <ToastContainer />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <SectionBox>
        <Title>장바구니</Title>

        <List>
          {cart.map((item) => (
            <ItemCard key={item.gameId}>
              <Image src={item.backgroundImage} alt={item.title} />
              <Info>
                <GameTitle>{item.title}</GameTitle>
                <SubInfo>
                  📅 출시일: {item.released || "정보 없음"}
                  <br />
                  🔞 연령등급: {item.esrbRating || "정보 없음"}
                  <br />
                  💰 정가: ₩ {item.price.toLocaleString()}
                </SubInfo>
              </Info>
              <PriceBox>
                {item.salePrice >= 1 ? (
                  <>
                    <OriginalPrice>
                      ₩ {item.price.toLocaleString()}
                    </OriginalPrice>
                    <SalePrice>
                      ₩ {item.salePrice.toLocaleString()}
                      <DiscountRate>
                        -{getDiscountRate(item.price, item.salePrice)}%
                      </DiscountRate>
                    </SalePrice>
                  </>
                ) : (
                  <Price>₩ {item.price.toLocaleString()}</Price>
                )}
                <GameActionButtons
                  showDeleteButton
                  onDeleteClick={() => handleRemove(item)}
                />
              </PriceBox>
            </ItemCard>
          ))}
        </List>

        <TotalBar>총 합계: ₩ {finalTotal.toLocaleString()}</TotalBar>

        <CheckoutButton onClick={() => alert("결제 기능 준비 중입니다.")}>
          💳 결제하기
        </CheckoutButton>
      </SectionBox>
      <ToastContainer />
    </PageWrapper>
  );
};

export default CartPage;
