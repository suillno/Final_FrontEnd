import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import {
  apiGetCartList,
  apiAddGameCart,
  CartItem,
  apiChargeWallet,
} from "../../components/api/backApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GameActionButtons from "../../components/gamedetail/GameActionButtons";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";
import { FaRegCalendarAlt, FaUserShield, FaTags } from "react-icons/fa";
import {
  PageWrapper,
  SectionBox,
  Title,
  List,
  ItemCard,
  Checkbox,
  Image,
  Info,
  GameTitle,
  SubInfo,
  PriceBox,
  Price,
  OriginalPrice,
  SalePrice,
  DiscountRate,
  TotalBar,
  CheckoutButton,
  ModalOverlay,
  ModalBox,
  ModalText,
  ModalButtonGroup,
  ModalButton,
} from "../member.style/CartPage.style";

// 🔷 Layout Context 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

const CartPage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);
  const [targetItem, setTargetItem] = useState<CartItem | null>(null);

  const userInfo = useSelector(selectUserInfo);
  const username = userInfo?.username;
  const userId = userInfo?.id;

  // 구매버틍시 알림표시
  const [showPurchaseConfirm, setShowPurchaseConfirm] = useState(false);

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
        released: targetItem.released,
        esrbRating: targetItem.esrbRating,
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

  // 결제버튼 동작
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      toast.warn("결제할 항목을 선택해주세요.");
      return;
    }
    setShowPurchaseConfirm(true); // ✅ 모달 열기
  };

  // ✅ [🔽 여기에 추가하세요] 모달에서 '확인' 버튼 누를 때 실행될 함수
  const confirmPurchase = async () => {
    setShowPurchaseConfirm(false); // 모달 닫기

    const totalAmount = selectedItems.reduce((sum, item) => {
      return sum + (item.salePrice >= 1 ? item.salePrice : item.price);
    }, 0);

    try {
      const result = await apiChargeWallet(
        userId,
        totalAmount,
        userInfo.username,
        1
      );

      if (result.startsWith("SUCCESS")) {
        const successMessage = result.replace("SUCCESS: ", "").trim();

        for (const item of selectedItems) {
          await apiAddGameCart({
            userName: userInfo.username,
            gameId: item.gameId,
            title: item.title,
            backgroundImage: item.backgroundImage,
            price: item.price,
            salePrice: item.salePrice,
            released: item.released,
            esrbRating: item.esrbRating,
            actionType: 1,
            purchase: true,
          });
        }

        alert(successMessage);
        await fetchCartItems();
      } else {
        const errorMessage = result.replace("ERROR: ", "").trim();
        toast.error("❌ 결제 실패: " + errorMessage);
      }
    } catch (error) {
      toast.error("⚠️ 결제 중 오류가 발생했습니다.");
    }
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

      {/* 장바구니 삭제 알림 */}
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

      {/* 구매버튼 클릭시 알림 */}
      {showPurchaseConfirm && (
        <ModalOverlay>
          <ModalBox>
            <ModalText>
              {selectedItems.length}개의 게임을 총 ₩{" "}
              {selectedItems
                .reduce(
                  (sum, item) =>
                    sum + (item.salePrice >= 1 ? item.salePrice : item.price),
                  0
                )
                .toLocaleString()}
              에 결제하시겠습니까?
            </ModalText>
            <ModalButtonGroup>
              <ModalButton
                $variant="cancel"
                onClick={() => setShowPurchaseConfirm(false)}
              >
                취소
              </ModalButton>
              <ModalButton $variant="confirm" onClick={confirmPurchase}>
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
