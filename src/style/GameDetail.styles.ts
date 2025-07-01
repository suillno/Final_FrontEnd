// StyledGameDetail.ts
import styled from "styled-components";

// ✅ 전체 콘텐츠 영역 (배경색과 반응형 글꼴 조정)
export const ContentContainer = styled.div`
  background-color: #1e1f24;
  border-radius: 12px;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }

  @media (max-width: 468px) {
    font-size: 0.7em;
    max-height: 180px;
  }
`;

// ✅ 게임 설명 섹션 (스크롤 가능, 반응형 높이 조정)
export const GameAbout = styled.div`
  margin: 5%;
  overflow-y: auto;
  max-height: 500px;

  @media (max-width: 768px) {
    max-height: 250px;
  }

  @media (max-width: 468px) {
    max-height: 200px;
  }

  h2 {
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

    @media (max-width: 468px) {
      font-size: 1.3em;
    }
  }
`;

// ✅ 게임 소개와 상세 정보 배치 영역 (좌우 혹은 세로 방향 정렬)
export const AboutBetween = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 468px) {
    flex-direction: column;
    align-items: center;
    font-size: 0.7em;
  }
`;

// ✅ 상하 구분선 (흰색 반투명 라인)
export const WhiteLine = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
`;
