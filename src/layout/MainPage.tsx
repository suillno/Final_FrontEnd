// MainPage.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiGetDiscountList, GameDiscount } from "../components/api/backApi";
import Loader, { LoaderButton } from "../components/common/Loader";
import { Link, useOutletContext } from "react-router-dom";
import DiscountPage from "../components/discount/DiscountPage";
import mainBanner from "../img/mainBanner.png";
import ModalBase from "../components/common/ModalBase";

// 사이드바 열림 여부를 context로 전달받는 타입 정의
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 메인 컨테이너 스타일 (사이드바 열림 여부에 따라 margin 조정)
const MainContainer = styled.div<{ $isSidebarOpen: boolean }>`
  margin-right: 5%;
  margin-left: ${(props: { $isSidebarOpen: boolean }) =>
    props.$isSidebarOpen ? "300px" : "5%"};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 메인 타이틀 스타일
const MainTitle = styled.h2<{ $isSidebarOpen: boolean }>`
  font-size: 3.5vw;
  font-weight: 900;
  max-width: 90%;
  margin-left: ${(props: { $isSidebarOpen: boolean }) =>
    props.$isSidebarOpen ? "250px" : "5%"};
  margin-bottom: 2%;
  transition: margin-left 0.3s ease;
  background: linear-gradient(90deg, #ff512f, #dd2476);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;

  opacity: 0;
  animation: fadeInUp 1s ease forwards;

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    margin: 0 5%;
    font-size: 6vw;
  }
`;

// 메인 페이지 컴포넌트 정의
const MainPage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 할인 게임 리스트 상태
  const [discountList, setDiscountList] = useState<GameDiscount[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더보기 가능 여부

  // 페이지 증가 함수
  const pageNext = () => setPageCount((prev) => prev + 1);

  // 할인 게임 리스트 불러오기 함수
  const getGameList = (page: number) => {
    if (page === 1) {
      setFirstLoading(true);
    } else {
      setIsLoading(true);
    }

    apiGetDiscountList(page)
      .then((res) => {
        const combinedList =
          page === 1 ? res.list : [...discountList, ...res.list];
        setDiscountList(combinedList);
        // 가져온 항목이 20개 미만이면 더 이상 데이터 없음
        if (res.list.length < 20) {
          setHasMore(false);
        }
      })
      .finally(() => {
        setFirstLoading(false);
        setIsLoading(false);
      });
  };

  // pageCount 변경 시 API 호출
  useEffect(() => {
    getGameList(pageCount);
  }, [pageCount]);

  // 리스트 갱신만 수행 (페이지 초기화 없이)
  const fetchDiscountList = () => {
    apiGetDiscountList(0).then((res) => {
      setDiscountList(res.list);
      setHasMore(res.list.length >= 20); // 더보기 여부 다시 판단
    });
  };

  return (
    <>
      {/* 모달 */}
      <ModalBase />
      <div className="bg-[#1e1f24] text-white py-6 w-full mt-10">
        {/* 메인 베너 이미지 */}
        <MainTitle $isSidebarOpen={isSidebarOpen}>
          <img src={mainBanner} alt="메인 베너" />
        </MainTitle>

        {/* 게임 카드 리스트 */}
        <MainContainer
          $isSidebarOpen={isSidebarOpen}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
        >
          {discountList.map((item, idx) => (
            <DiscountPage
              key={item.discountId ?? idx}
              item={item}
              onUpdated={fetchDiscountList}
            />
          ))}
        </MainContainer>

        {/* 로딩 및 더보기 버튼 */}
        {firstLoading ? (
          <Loader />
        ) : (
          <div className="flex justify-center mt-8 h-35">
            {isLoading ? (
              <LoaderButton />
            ) : (
              hasMore && ( // 20개 이하조회시 버튼 숨기기 조건 추가
                <button
                  type="button"
                  className="w-24 h-12 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-center"
                  style={{
                    marginTop: "2em",
                    margin: "10px",
                    fontWeight: "600",
                  }}
                  onClick={pageNext}
                >
                  더보기
                </button>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;
