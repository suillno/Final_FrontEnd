import styled, { keyframes } from "styled-components";

/* 페이드 인 애니메이션 (위에서 아래로 자연스럽게 등장) */
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

/* 배경 파티클 효과를 담는 Wrapper (컨텐츠 뒤에 배치됨) */
export const ParticleWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

/* 전체 페이지 컨테이너 (사이드바 여닫이에 따라 여백 조정됨) */
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isSidebarOpen",
})<{ $isSidebarOpen: boolean }>`
  margin-left: ${(props) => (props.$isSidebarOpen ? "220px" : "0")};
  padding: 2rem 2rem 4rem;
  background-color: #0e0f11;
  color: white;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  font-size: 1rem;

  @media (max-width: 1024px) {
    padding: 1.5rem 1.5rem 3rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem 1rem 2.5rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 1rem;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    padding: 0.8rem;
  }
`;

/* 페이지 최상단 타이틀 텍스트 */
export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.2rem;
  color: #00eaff;
  text-shadow: 0 0 10px #00eaffaa;
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }

  @media (max-width: 320px) {
    font-size: 1.4rem;
  }
`;

/* 방문자 요약 정보 박스 */
export const VisitorInfo = styled.div`
  font-size: 1.1rem;
  background: #1c1d23;
  padding: 1.2rem;
  border-radius: 10px;
  max-width: 720px;
  margin: 0 auto 2rem;
  text-align: center;
  box-shadow: 0 0 20px #00eaff33;
  animation: ${fadeIn} 1.1s ease-out;
  position: relative;
  z-index: 2;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 1rem;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
    padding: 0.9rem;
  }
`;

/* 신규 가입자 요약 박스 */
export const SignupInfo = styled(VisitorInfo)`
  /* 방문자 박스와 동일한 스타일 공유 */
`;

/* 매출 요약 박스 (박스 그림자 색상만 다름) */
export const RevenueInfo = styled(VisitorInfo)`
  box-shadow: 0 0 20px #ffd70033;
`;

/* 차트들을 나열하는 2열 그리드 레이아웃 */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, 1fr));
  gap: 2rem;
  justify-content: center;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

/* 개별 차트나 데이터 박스를 담는 카드 박스 */
export const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(0, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 14px;
  padding: 1.5rem;
  box-shadow: 0 0 20px #00eaff22;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 30px #00eaffaa;
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
  }

  @media (max-width: 320px) {
    padding: 1rem;
  }
`;

/* 차트 상단에 표시되는 소제목 텍스트 */
export const ChartTitle = styled.h3`
  font-size: 1.05rem;
  margin-bottom: 1rem;
  color: #ffffffcc;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
  }
`;

/* 차트를 그리는 실제 그래프 영역 */
export const ChartWrapper = styled.div`
  width: 100%;
  height: 260px;
  animation: ${fadeIn} 1.2s ease;

  @media (max-width: 480px) {
    height: 220px;
  }

  @media (max-width: 320px) {
    height: 200px;
  }
`;
