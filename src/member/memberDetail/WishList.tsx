// src/pages/member/WishlistPage.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOutletContext, useNavigate } from "react-router-dom";
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
  apiGetDiscountList,
  apiGetWishlist,
  CartItem,
} from "../../components/api/backApi";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";

// 🔷 Layout Context 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

type SortType =
  | "default"
  | "alphabet"
  | "price-high"
  | "price-low"
  | "discount-high"
  | "discount-low";

/* 💅 스타일 정의 */
const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  padding: 5rem 2.5rem 2.5rem;
  min-height: 100vh;
  background-color: #111218;
  margin-left: ${(props) => (props.$isSidebarOpen ? "240px" : "0")};
  transition: margin-left 0.3s ease;
`;

const GridBox = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const Title = styled.h2`
  font-size: 2.3rem;
  color: #00eaff;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  font-size: 0.95rem;
  background: #222;
  color: white;
  border: 1px solid #555;
  border-radius: 6px;
  margin-bottom: 2rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
`;

const GameCard = styled.div<{ $highlighted?: boolean }>`
  background-color: #1d1e24;
  border: ${(props) =>
    props.$highlighted ? "2px solid hotpink" : "1px solid #333"};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-6px);
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const GameTitle = styled.h3<{ $highlighted?: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.$highlighted ? "#ff4d4d" : "#fff")};
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

const PriceWrap = styled.div`
  margin-top: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OriginalPrice = styled.div<{ $strike?: boolean }>`
  font-size: 0.9rem;
  color: #aaa;
  ${(props) => props.$strike && "text-decoration: line-through;"}
  margin-bottom: 5%;
`;

const DiscountPrice = styled.div`
  font-size: 1.1rem;
  color: #00eaff;
  font-weight: bold;
  text-align: right;
`;

const Spacer = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 8px;
  background: #ff69b422;
  color: white;
  border: 1px solid hotpink;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: hotpink;
    color: black;
    font-weight: bold;
  }
`;

// ============================== Component ==============================
const WishlistPage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<CartItem[]>([]);
  const [sortType, setSortType] = useState<SortType>("default");
  // 유저정보
  const userInfo = useSelector(selectUserInfo);
  const username = userInfo.username;

  // 💾 위시리스트 + 할인 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo) return;

      try {
        const wishListResult = await apiGetWishlist(userInfo.username);
        const discountResult = await apiGetDiscountList(0);
        const discountMap = new Map(
          discountResult.list.map((d: CartItem) => [d.gameId, d.salePrice])
        );

        const enriched = wishListResult.map((item) => ({
          ...item,
          discountSalePrice: discountMap.get(item.gameId) ?? undefined,
        }));

        setWishlist(enriched);
      } catch (err) {
        toast.error("데이터 로딩 실패");
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as SortType);
  };

  const handleRemove = async (item: CartItem) => {
    try {
      const result = await apiAddGameLike({ ...item, userName: username });
      if (result.startsWith("SUCCESS")) {
        setWishlist((prev) => prev.filter((g) => g.gameId !== item.gameId));
        toast.success(`"${item.title}" 찜 해제됨`);
      } else {
        toast.error("찜 해제 실패");
      }
    } catch {
      toast.error("서버 오류");
    }
  };

  const goToGroupBuy = () => navigate("/");
  const goToGameDetail = (item: number) => navigate(`/game/${item}`);

  const getDiscountRate = (original: number, sale: number) =>
    Math.floor(((original - sale) / original) * 100);

  // 🔽 정렬 처리
  const sortedList = [...wishlist].sort((a, b) => {
    switch (sortType) {
      case "alphabet":
        return a.title.localeCompare(b.title, "ko");
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      case "discount-high":
        return (
          (b.price - (b.discountSalePrice ?? b.price)) / b.price -
          (a.price - (a.discountSalePrice ?? a.price)) / a.price
        );
      case "discount-low":
        return (
          (a.price - (a.discountSalePrice ?? a.price)) / a.price -
          (b.price - (b.discountSalePrice ?? b.price)) / b.price
        );
      default:
        return 0;
    }
  });

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <GridBox>
        <Title>💖 찜한 게임</Title>
        <SortSelect value={sortType} onChange={handleSortChange}>
          <option value="default">기본 정렬</option>
          <option value="alphabet">가나다순</option>
          <option value="price-high">가격 높은순</option>
          <option value="price-low">가격 낮은순</option>
          <option value="discount-high">할인율 높은순</option>
          <option value="discount-low">할인율 낮은순</option>
        </SortSelect>

        {sortedList.length === 0 ? (
          <p style={{ color: "#ccc", textAlign: "center" }}>
            찜한 게임이 없습니다.
          </p>
        ) : (
          <CardGrid>
            {sortedList.map((item) => {
              const isDiscounted =
                typeof item.discountSalePrice === "number" &&
                item.discountSalePrice < item.price;

              return (
                <GameCard key={item.gameId} $highlighted={isDiscounted}>
                  <GameImage src={item.backgroundImage} />
                  <GameInfo>
                    <GameTitle $highlighted={isDiscounted}>
                      {item.title}
                    </GameTitle>
                    <Detail>
                      <FaRegCalendarAlt /> {item.released || "출시일 없음"}
                    </Detail>
                    <Detail>
                      <FaUserShield /> {item.esrbRating || "등급 정보 없음"}
                    </Detail>

                    <PriceWrap>
                      <OriginalPrice $strike={isDiscounted}>
                        정상가 : ₩ {item.price.toLocaleString()}
                      </OriginalPrice>
                      {isDiscounted && (
                        <DiscountPrice>
                          <div>
                            ₩ {item.discountSalePrice!.toLocaleString()}
                          </div>
                          <div className="flex items-center justify-center">
                            <FaTags className="mr-1" />-
                            {getDiscountRate(
                              item.price,
                              item.discountSalePrice!
                            )}
                            %
                          </div>
                        </DiscountPrice>
                      )}
                    </PriceWrap>

                    <Spacer />
                    <ButtonGroup>
                      <ActionBtn onClick={() => handleRemove(item)}>
                        <div className="flex items-center justify-center">
                          <FaHeart /> <span className="ml-2">찜 해제</span>
                        </div>
                      </ActionBtn>
                      {isDiscounted && (
                        <ActionBtn onClick={goToGroupBuy}>
                          🤝 공동 구매
                        </ActionBtn>
                      )}
                      {!isDiscounted && (
                        <ActionBtn onClick={() => goToGameDetail(item.gameId)}>
                          🤝 게임 정보
                        </ActionBtn>
                      )}
                    </ButtonGroup>
                  </GameInfo>
                </GameCard>
              );
            })}
          </CardGrid>
        )}
      </GridBox>

      <ToastContainer />
    </PageWrapper>
  );
};

export default WishlistPage;
