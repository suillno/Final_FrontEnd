import styled, { keyframes } from "styled-components";

/* 페이드 인 애니메이션 */
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  100% { opacity: 1; transform: translateY(0); }
`;

/* 파티클 효과 Wrapper (배경용) */
export const ParticleWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

/* 전체 컨테이너 (사이드바 상태에 따라 여백 조절) */
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isSidebarOpen", // DOM에 전달 방지
})<{ $isSidebarOpen: boolean }>`
  margin-left: ${(props) => (props.$isSidebarOpen ? "220px" : "0")};
  padding: 2rem 2rem 4rem;
  background-color: #0e0f11;
  color: white;
  min-height: 100vh;
  position: relative;
  z-index: 1;
`;

/* 대시보드 타이틀 */
export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.2rem;
  color: #00eaff;
  text-shadow: 0 0 10px #00eaffaa;
  animation: ${fadeIn} 1s ease-out;
  z-index: 2;
  position: relative;
`;

/* 방문자 요약 박스 */
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
`;

/* 가입자 요약 박스 */
export const SignupInfo = styled.div`
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
`;

/* 매출 요약 박스 */
export const RevenueInfo = styled.div`
  font-size: 1.1rem;
  background: #1c1d23;
  padding: 1.2rem;
  border-radius: 10px;
  max-width: 720px;
  margin: 0 auto 2rem;
  text-align: center;
  box-shadow: 0 0 20px #ffd70033;
  animation: ${fadeIn} 1.1s ease-out;
  position: relative;
  z-index: 2;
`;

/* 2열 레이아웃 차트 그리드 */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(320px, 1fr));
  gap: 2rem;
  justify-content: center;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* 카드 스타일 (차트, 데이터 박스용) */
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
`;

/* 차트 타이틀 */
export const ChartTitle = styled.h3`
  font-size: 1.05rem;
  margin-bottom: 1rem;
  color: #ffffffcc;
`;

/* 차트 그리는 영역 */
export const ChartWrapper = styled.div`
  width: 100%;
  height: 260px;
  animation: ${fadeIn} 1.2s ease;
`;
