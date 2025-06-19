import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiGetGameSearch } from "../../components/api/api";
import Loader from "../../components/common/Loader";
import { Link, useOutletContext, useLocation } from "react-router-dom";
import dayjs from "dayjs";

// 🔹 레이아웃 컨텍스트 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 🔹 최소 렌더링에 필요한 타입 정의
interface GameSearchItem {
  id: number;
  name: string;
  background_image?: string;
  released?: string;
  rating?: number;
}

// 🔹 메인 컨테이너 스타일 정의
const MainContainer = styled.div<{ isSidebarOpen: boolean }>`
  margin-right: 5%;
  margin-left: ${(props) => (props.isSidebarOpen ? "300px" : "5%")};
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 🔹 타이틀 스타일 정의
const MainTitle = styled.h2<{ isSidebarOpen: boolean }>`
  font-size: 3vw;
  line-height: 50px;
  font-weight: 700;
  padding-bottom: 1em;
  margin-right: 5%;
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "5%")};
  transition: margin-left 0.3s ease;
  @media (max-width: 768px) {
    margin: 0 5%;
  }
`;

// 🔹 개별 카드 스타일
const Card = styled.div`
  background-color: #2a2b32;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
`;

const Info = styled.div`
  padding: 0.8rem;
  background-color: #1e1f24;
  color: white;
`;

const Img = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  background-color: #555;
`;

const SearchGame: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchKeyword = searchParams.get("search") || "";
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [games, setGames] = useState<GameSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 검색
  const getGameList = async (keyword: string) => {
    if (!keyword) return;
    setIsLoading(true);
    const res = await apiGetGameSearch(keyword);
    if (res?.results) {
      // ❗ 유효한 정보만 필터링
      const filtered = res.results.filter(
        (item: any) => item.name && item.id && item.background_image
      );
      setGames(filtered);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getGameList(searchKeyword);
  }, [searchKeyword]);

  return (
    <div className="bg-[#1e1f24] text-white py-6 w-full">
      <MainTitle isSidebarOpen={isSidebarOpen}>
        "{searchKeyword}" 검색 결과
      </MainTitle>

      <MainContainer
        isSidebarOpen={isSidebarOpen}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
      >
        {games.map((item) => (
          <Link to={`/game/${item.id}`} key={item.id}>
            <Card>
              <Img src={item.background_image} alt={item.name} />
              <Info>
                <div className="font-bold text-lg">{item.name}</div>
                <div className="text-sm text-gray-400">
                  출시일:{" "}
                  {item.released
                    ? dayjs(item.released).format("YYYY-MM-DD")
                    : "미정"}
                </div>
                <div className="text-sm text-gray-400">
                  평점: {item.rating?.toFixed(1) ?? "없음"}
                </div>
              </Info>
            </Card>
          </Link>
        ))}
      </MainContainer>

      {isLoading && <Loader />}
    </div>
  );
};

export default SearchGame;
