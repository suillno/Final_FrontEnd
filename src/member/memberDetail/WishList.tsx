import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  FaRegCalendarAlt,
  FaUserShield,
  FaTags,
  FaHeart,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import {
  apiAddGameLike,
  apiGetWishlist,
  CartItem,
} from "../../components/api/backApi";

// 🔹 Layout Sidebar 상태
interface LayoutContext {
  isSidebarOpen: boolean;
}

/* ===================== 💅 Styled Components ===================== */
const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 3rem 2rem;
  background-color: #111218;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;
`;

const GridBox = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color: #00eaff;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
  text-shadow: 0 0 8px #00eaff66;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const GameCard = styled.div`
  background-color: #1d1e24;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.15);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const GameImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: 1rem;
`;

const GameTitle = styled.h3`
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const Detail = styled.div`
  font-size: 0.9rem;
  color: #ccc;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const PriceSection = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Price = styled.div`
  font-size: 1rem;
  color: #ddd;
`;

const OriginalPrice = styled.div`
  font-size: 0.9rem;
  color: #999;
  text-decoration: line-through;
`;

const SalePrice = styled.div`
  font-size: 1.1rem;
  color: #00eaff;
  font-weight: bold;
`;

const DiscountBadge = styled.span`
  font-size: 0.8rem;
  color: #ff5252;
  margin-left: 8px;
`;

const RemoveButton = styled.button`
  margin-top: 12px;
  padding: 6px 12px;
  background: #ff1744;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: #d50032;
  }
`;

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

/* ===================== 📦 Main Component ===================== */
const WishlistPage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetItem, setTargetItem] = useState<CartItem | null>(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = localStorage.getItem("currentUser");
      if (!user) return;
      const username = JSON.parse(user).username;

      try {
        const wishItems = await apiGetWishlist(username);
        setWishlist(wishItems);
      } catch (err) {
        console.error("찜 목록 실패:", err);
        toast.error("찜 목록을 불러오는 데 실패했습니다.");
      }
    };
    fetchWishlist();
  }, []);

  const handleRemoveClick = (item: CartItem) => {
    setTargetItem(item);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!targetItem) return;
    const user = localStorage.getItem("currentUser");
    if (!user) return;
    const username = JSON.parse(user).username;

    try {
      const result = await apiAddGameLike({
        userName: username,
        gameId: targetItem.gameId,
        title: targetItem.title,
        backgroundImage: targetItem.backgroundImage,
        price: targetItem.price,
        salePrice: targetItem.salePrice,
      });

      if (result.startsWith("SUCCESS")) {
        setWishlist((prev) =>
          prev.filter((g) => g.gameId !== targetItem.gameId)
        );
        toast.success(`"${targetItem.title}" 찜 해제됨`);
      } else {
        toast.error("찜 해제 실패: " + result);
      }
    } catch (err) {
      toast.error("서버 오류로 찜 해제 실패");
    }

    setShowConfirm(false);
    setTargetItem(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setTargetItem(null);
  };

  const getDiscountRate = (price: number, salePrice: number): number => {
    if (price <= 0 || salePrice <= 0 || salePrice >= price) return 0;
    return Math.floor(((price - salePrice) / price) * 100);
  };

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <GridBox>
        <Title>💖 찜한 게임 모음</Title>

        {wishlist.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            아직 찜한 게임이 없습니다.
          </p>
        ) : (
          <CardGrid>
            {wishlist.map((item) => {
              const hasDiscount = item.salePrice < item.price;
              return (
                <GameCard key={item.gameId}>
                  <ImageWrapper>
                    <GameImage src={item.backgroundImage} alt={item.title} />
                  </ImageWrapper>
                  <GameInfo>
                    <GameTitle>{item.title}</GameTitle>
                    <Detail>
                      <FaRegCalendarAlt />
                      {item.released || "출시일 정보 없음"}
                    </Detail>
                    <Detail>
                      <FaUserShield />
                      {item.esrbRating || "연령 등급 정보 없음"}
                    </Detail>
                    <PriceSection>
                      {hasDiscount ? (
                        <>
                          <OriginalPrice>
                            ₩ {item.price.toLocaleString()}
                          </OriginalPrice>
                          <SalePrice>
                            ₩ {item.salePrice.toLocaleString()}
                            <DiscountBadge>
                              -{getDiscountRate(item.price, item.salePrice)}%
                            </DiscountBadge>
                          </SalePrice>
                        </>
                      ) : (
                        <Price>₩ {item.price.toLocaleString()}</Price>
                      )}
                      <RemoveButton onClick={() => handleRemoveClick(item)}>
                        찜 해제
                      </RemoveButton>
                    </PriceSection>
                  </GameInfo>
                </GameCard>
              );
            })}
          </CardGrid>
        )}
      </GridBox>

      {showConfirm && targetItem && (
        <ModalOverlay>
          <ModalBox>
            <ModalText>
              "{targetItem.title}" 을(를) 찜 목록에서 삭제할까요?
            </ModalText>
            <ModalButtonGroup>
              <ModalButton $variant="cancel" onClick={cancelDelete}>
                취소
              </ModalButton>
              <ModalButton $variant="confirm" onClick={confirmDelete}>
                삭제
              </ModalButton>
            </ModalButtonGroup>
          </ModalBox>
        </ModalOverlay>
      )}

      <ToastContainer />
    </PageWrapper>
  );
};

export default WishlistPage;
