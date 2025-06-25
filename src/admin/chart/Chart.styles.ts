import styled from "styled-components";

// 전체 컨테이너 (사이드바 열림 여부에 따라 margin 조정)
export const Container = styled.div<{ $isSidebarOpen: boolean }>`
  padding: 2rem;
  margin-left: ${(props) => (props.$isSidebarOpen ? "220px" : "5%")};
  transition: margin-left 0.3s ease;
  color: white;
  background-color: #1e1f24;
  min-height: 100vh;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`;

// 페이지 상단 타이틀
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

// 방문자 정보 요약 카드
export const VisitorInfo = styled.div`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  background: #2d2f36;
  padding: 1rem;
  border-radius: 10px;
`;

// 차트 카드들을 담는 그리드 레이아웃
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// 개별 차트 카드 스타일
export const Card = styled.div`
  background-color: #2d2f36;
  padding: 1rem;
  border-radius: 10px;
  height: 100%;
`;

// 차트 카드 제목
export const ChartTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

// 차트 크기 지정
export const ChartWrapper = styled.div`
  width: 100%;
  height: 250px;
`;
