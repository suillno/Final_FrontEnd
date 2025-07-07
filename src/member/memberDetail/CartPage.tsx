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
import { FaRegCalendarAlt, FaUserShield, FaTags } from "react-icons/fa";

// 🔷 Layout Context 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

/* 💅 Styled-components (모달 포함) */
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

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #00eaff;
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

  div {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    gap: 6px;
  }
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

/* 🧩 모달 컴포넌트 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background-color: #222;
  padding: 2rem;
  border-radius: 12px;
  width: 360px;
  color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  text-align: center;
`;

const ModalText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ModalButton = styled.button<{ $variant: "cancel" | "confirm" }>`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) =>
    props.$variant === "cancel" ? "#888" : "#00e676"};
  color: #000;

  &:hover {
    opacity: 0.9;
  }
`;

// ========================= 🧾 Main Component =========================

const CartPage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [targetItem, setTargetItem] = useState<CartItem | null>(null);

  const userInfo = useSelector(selectUserInfo);
  const username = userInfo?.username;

  const fetchCartItems = async () => {
    if (!username) {
      setError("로그인이 필요합니다.");
      return;
    }

    try {
      const data = await apiGetCartList(username);

      // ✅ CART 타입만 필터링
      const cartOnly = data.filter((item) => item.cartType === "CART");

      setCart(cartOnly);
      setSelectedIds(cartOnly.map((item) => item.gameId));
    } catch {
      setError("장바구니 정보를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [username]);

  const handleRemoveClick = (item: CartItem) => {
    setTargetItem(item);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!targetItem || !username) return;

    try {
      const result = await apiAddGameCart({
        userName: username,
        gameId: targetItem.gameId,
        title: targetItem.title,
        backgroundImage: targetItem.backgroundImage,
        price: targetItem.price,
        salePrice: targetItem.salePrice,
      });

      if (result.includes("취소")) {
        toast.success(`🗑 "${targetItem.title}" 삭제 완료`);
        fetchCartItems();
      } else {
        toast.error("❗삭제 실패: " + result);
      }
    } catch {
      toast.error("❌ 삭제 중 오류가 발생했습니다.");
    } finally {
      setShowConfirm(false);
      setTargetItem(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setTargetItem(null);
  };

  const handleCheckboxChange = (gameId: number) => {
    setSelectedIds((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId]
    );
  };

  const getDiscountRate = (price: number, salePrice: number): number => {
    if (price <= 0 || salePrice <= 0) return 0;
    return Math.floor(((price - salePrice) / price) * 100);
  };

  const finalTotal = cart.reduce((sum, item) => {
    if (!selectedIds.includes(item.gameId)) return sum;
    return sum + (item.salePrice >= 1 ? item.salePrice : item.price);
  }, 0);

  const selectedItems = cart.filter((item) =>
    selectedIds.includes(item.gameId)
  );

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.warn("결제할 항목을 선택해주세요.");
      return;
    }

    alert(
      `선택된 ${
        selectedItems.length
      }개의 항목을 결제합니다.\n총 결제 금액: ₩ ${finalTotal.toLocaleString()}`
    );
  };

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
              <Checkbox
                type="checkbox"
                checked={selectedIds.includes(item.gameId)}
                onChange={() => handleCheckboxChange(item.gameId)}
              />
              <Image src={item.backgroundImage} alt={item.title} />
              <Info>
                <GameTitle>{item.title}</GameTitle>
                <SubInfo>
                  <div>
                    <FaRegCalendarAlt />
                    출시일: {item.released || "정보 없음"}
                  </div>
                  <div>
                    <FaUserShield />
                    연령등급: {item.esrbRating || "정보 없음"}
                  </div>
                  <div>
                    <FaTags />
                    정가: ₩ {item.price.toLocaleString()}
                  </div>
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
                  onDeleteClick={() => handleRemoveClick(item)}
                />
              </PriceBox>
            </ItemCard>
          ))}
        </List>

        <TotalBar>총 합계: ₩ {finalTotal.toLocaleString()}</TotalBar>

        <CheckoutButton onClick={handleCheckout}>
          💳 선택 항목 결제하기
        </CheckoutButton>
      </SectionBox>

      {showConfirm && targetItem && (
        <ModalOverlay>
          <ModalBox>
            <ModalText>
              "{targetItem.title}" 을(를) 장바구니에서 삭제하시겠습니까?
            </ModalText>
            <ModalButtonGroup>
              <ModalButton $variant="cancel" onClick={cancelDelete}>
                취소
              </ModalButton>
              <ModalButton $variant="confirm" onClick={confirmDelete}>
                확인
              </ModalButton>
            </ModalButtonGroup>
          </ModalBox>
        </ModalOverlay>
      )}

      <ToastContainer />
    </PageWrapper>
  );
};

export default CartPage;
