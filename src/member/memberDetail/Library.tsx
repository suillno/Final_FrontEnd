import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

// 게임 데이터 타입 정의
interface Game {
  id: number;
  title: string;
  coverImage: string;
  purchasedAt: string;
}

// Layout에서 전달되는 사이드바 열림 여부 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

// === 스타일 정의 영역 ===

// 전체 페이지 래퍼 - 사이드바 열림 여부에 따라 좌측 여백 조정
const PageWrapper = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start; // 위쪽 정렬
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

// 라이브러리 콘텐츠 박스
const LibraryBox = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 30px;
  color: #fff;
`;

// 페이지 타이틀
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

// 게임 카드 목록을 세로로 정렬
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; // 카드 간격
`;

// 개별 게임 카드
const Card = styled.div`
  background-color: #2b2b2b;
  border-radius: 6px;
  padding: 15px;
  display: flex; // 이미지 + 텍스트 가로 배치
  align-items: center;
  gap: 20px;
`;

// 게임 커버 이미지
const Image = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
`;

// 카드 오른쪽 텍스트 영역
const Info = styled.div`
  flex: 1;
`;

// 게임 제목
const GameTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 8px 0;
`;

// 구매일 표시
const Date = styled.p`
  font-size: 12px;
  color: #bbb;
  margin-bottom: 10px;
`;

// 설치 버튼
const Button = styled.button`
  padding: 8px 12px;
  background-color: #00bfff;
  border: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

// 더보기 / 접기 버튼
const MoreButton = styled.button`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #444;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: #666;
  }
`;

const Library: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 더미 게임 데이터 (향후 API로 대체 가능)
  const [games] = useState<Game[]>([
    {
      id: 1,
      title: "엘든 링",
      coverImage: "/games/eldenring.jpg",
      purchasedAt: "2024-11-03",
    },
    {
      id: 2,
      title: "스타듀 밸리",
      coverImage: "/games/stardew.jpg",
      purchasedAt: "2024-09-17",
    },
    {
      id: 3,
      title: "디아블로 4",
      coverImage: "/games/diablo4.jpg",
      purchasedAt: "2024-06-21",
    },
    {
      id: 4,
      title: "발더스 게이트 3",
      coverImage: "/games/bg3.jpg",
      purchasedAt: "2024-04-12",
    },
    {
      id: 5,
      title: "사이버펑크 2077",
      coverImage: "/games/cyberpunk.jpg",
      purchasedAt: "2024-01-18",
    },
  ]);

  // 초기 보여줄 게임 개수
  const INITIAL_COUNT = 2;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // 모두 보여주고 있는지 여부
  const isAllVisible = visibleCount >= games.length;

  // 더보기 / 접기 토글
  const handleToggle = () => {
    if (isAllVisible) {
      setVisibleCount(INITIAL_COUNT);
    } else {
      setVisibleCount(games.length);
    }
  };

  return (
    <PageWrapper isSidebarOpen={isSidebarOpen}>
      <LibraryBox>
        <Title>내 게임 라이브러리</Title>

        {games.length === 0 ? (
          <p style={{ color: "#ccc" }}>구매한 게임이 없습니다.</p>
        ) : (
          <>
            {/* 게임 카드 리스트 */}
            <Grid>
              {games.slice(0, visibleCount).map((game) => (
                <Card key={game.id}>
                  <Image src={game.coverImage} alt={game.title} />
                  <Info>
                    <GameTitle>{game.title}</GameTitle>
                    <Date>구매일: {game.purchasedAt}</Date>
                    <Button>설치 / 실행</Button>
                  </Info>
                </Card>
              ))}
            </Grid>

            {/* 더보기 / 접기 버튼 */}
            {games.length > INITIAL_COUNT && (
              <div style={{ textAlign: "center" }}>
                <MoreButton onClick={handleToggle}>
                  {isAllVisible ? "접기 ▲" : "더보기 ▼"}
                </MoreButton>
              </div>
            )}
          </>
        )}
      </LibraryBox>
    </PageWrapper>
  );
};

export default Library;
