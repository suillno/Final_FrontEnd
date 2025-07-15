import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";
import { fetchUserLibrary } from "../../components/api/backApi";

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
const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2em;
  background-color: #121317;
  box-sizing: border-box;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// 라이브러리 콘텐츠 박스
const LibraryBox = styled.div`
  width: 100%;
  max-width: 800px;
  min-width: 200px;
  background-color: #1f1f1f;
  border-radius: 12px;
  padding: 40px;
  color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  margin-top: 150px;

  @media (max-width: 768px) {
    padding: 30px;
    margin-top: 90px;
  }
  @media (max-width: 460px) {
    padding: 20px;
    margin-top: 50px;
  }
`;

// 페이지 타이틀
const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 460px) {
    font-size: 1.2rem;
  }
`;

// 게임 카드 목록을 세로로 정렬
const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// 개별 게임 카드
const Card = styled.div`
  background-color: #2a2c34;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

// 게임 커버 이미지
const Image = styled.img`
  width: 130px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    width: 110px;
    height: 70px;
  }
  @media (max-width: 460px) {
    width: 90px;
    height: 60px;
  }
`;

// 카드 오른쪽 텍스트 영역
const Info = styled.div`
  flex: 1;
`;

// 게임 제목
const GameTitle = styled.h3`
  font-size: 20px;
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 460px) {
    font-size: 0.8rem;
  }
`;

// 구매일 표시
const Date = styled.p`
  font-size: 13px;
  color: #bbb;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  @media (max-width: 460px) {
    font-size: 0.6rem;
  }
`;

// 더보기 / 접기 버튼
const MoreButton = styled.button`
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #3a3a3a;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5a5a5a;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 10px 20px;
  }
  @media (max-width: 460px) {
    font-size: 0.6rem;
    padding: 8px 18px;
  }
`;

const Library: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const userInfo = useSelector(selectUserInfo);
  const [games, setGames] = useState<Game[]>([]);
  const INITIAL_COUNT = 2;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const isAllVisible = visibleCount >= games.length;

  const handleToggle = () => {
    setVisibleCount(isAllVisible ? INITIAL_COUNT : games.length);
  };
  useEffect(() => {
    const loadGames = async () => {
      if (!userInfo?.username) return;
      const data = await fetchUserLibrary(userInfo.username);
      setGames(data);
    };
    loadGames();
  }, [userInfo]);

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <LibraryBox>
        <Title>내 게임 라이브러리</Title>

        {games.length === 0 ? (
          <p style={{ color: "#ccc" }}>구매한 게임이 없습니다.</p>
        ) : (
          <>
            <Grid>
              {games.slice(0, visibleCount).map((game) => (
                <Card key={game.id}>
                  <Image src={game.coverImage} alt={game.title} />
                  <Info>
                    <GameTitle>{game.title}</GameTitle>
                    <Date>구매일: {game.purchasedAt}</Date>
                  </Info>
                </Card>
              ))}
            </Grid>

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
