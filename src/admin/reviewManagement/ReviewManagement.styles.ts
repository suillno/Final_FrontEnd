import styled, { keyframes } from "styled-components";

/* ========================== 공통 애니메이션 ========================== */
/* 아래에서 위로 올라오며 등장하는 fade-in 효과 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0);   }
`;

/* ========================== 파티클 배경 래퍼 ========================== */
/* 파티클 효과를 전체 배경에 고정시키고, z-index로 뒤로 숨김 */
export const ParticleWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100%;
  z-index: -9999;
  pointer-events: none;
  overflow: hidden;

  canvas {
    display: block !important;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

/* ========================== 메인 컨테이너 ========================== */
/* 전체 페이지 영역의 내부 콘텐츠 감싸는 컨테이너 */
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isSidebarOpen",
})<{ $isSidebarOpen: boolean }>`
  position: relative;
  overflow: hidden;
  padding: 2rem;
  min-height: 100vh;
  margin-left: ${(p) => (p.$isSidebarOpen ? "220px" : "0")};
  transition: margin-left 0.3s ease;
  background: transparent;
  color: white;
  font-size: 1rem;
  animation: ${fadeIn} 0.5s ease;
  z-index: 1;

  @media (max-width: 1024px) {
    padding: 1.5rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
  }
`;

/* ========================== 내부 콘텐츠 래퍼 ========================== */
export const InnerWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

/* ========================== 페이지 제목 ========================== */
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #00eaff;
  text-shadow: 0 0 10px #00eaff99;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  @media (max-width: 320px) {
    font-size: 1.1rem;
  }
`;

/* ========================== 상단 검색창 및 버튼 그룹 ========================== */
export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 20px;
`;

/* ========================== 검색 입력창 ========================== */
export const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  width: 400px;
  border: 1px solid #555;
  border-radius: 6px;
  background: #1c1d23;
  color: #fff;
  transition: all 0.3s ease;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    width: 450px;
    border-color: #00eaff;
    background: #0e0f11;
    box-shadow: 0 0 8px #00eaff88;
  }

  @media (max-width: 1024px) {
    width: 350px;
    font-size: 0.95rem;
    &:focus {
      width: 400px;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.85rem;
    &:focus {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    font-size: 0.75rem;
    padding: 0.4rem 2rem 0.4rem 0.6rem;
  }
`;

/* ========================== 선택 삭제 버튼 ========================== */
export const DeleteButton = styled.button`
  background: #eb3b5a;
  color: white;
  border: none;
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff6b81;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.35rem 0.6rem;
  }
`;

/* ========================== 리뷰 테이블 ========================== */
export const ReviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #1c1d23;
  border: 1px solid #2a2b30;
  animation: ${fadeIn} 0.6s ease;

  th,
  td {
    padding: 1rem;
    border-bottom: 1px solid #333;
    text-align: center;
    font-size: 1rem;

    @media (max-width: 1024px) {
      padding: 0.9rem;
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      padding: 0.75rem;
      font-size: 0.8rem;
    }

    @media (max-width: 480px) {
      padding: 0.6rem;
      font-size: 0.75rem;
    }

    @media (max-width: 360px) {
      padding: 0.5rem;
      font-size: 0.7rem;
    }

    @media (max-width: 320px) {
      padding: 0.4rem;
      font-size: 0.65rem;
    }
  }

  th {
    background: #2c2f36;
    color: #00eaff;
    font-weight: 600;
  }

  td {
    color: #ddd;
  }

  tbody tr:hover {
    background: #2a2d38;
  }
`;

/* ========================== 셀 내부 더보기 버튼 ========================== */
export const ContentCell = styled.td`
  position: relative;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 30px;

  @media (max-width: 768px) {
    max-width: 200px;
  }

  @media (max-width: 320px) {
    max-width: 150px;
  }
`;

export const MoreButton = styled.button`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  padding: 2px 8px;
  background: #2a2d38;
  border: none;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: gray;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 2px 6px;
  }

  @media (max-width: 320px) {
    font-size: 0.7rem;
    padding: 1px 5px;
  }
`;

/* ========================== 페이지네이션 ========================== */
export const Pagination = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    background: #2f3138;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    &.active {
      background: #00eaff;
      color: #0e0f11;
      font-weight: bold;
    }

    &:hover {
      background: #12f1ff;
    }

    @media (max-width: 768px) {
      padding: 0.3rem 0.6rem;
      font-size: 0.8rem;
    }

    @media (max-width: 320px) {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }
  }
`;

/* ========================== 삭제 확인 모달 ========================== */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ConfirmBox = styled.div`
  background: #2c2f36;
  padding: 2rem;
  border-radius: 10px;
  width: 320px;
  text-align: center;
  box-shadow: 0 0 20px rgba(21, 22, 22, 0.33);
  color: white;
  animation: ${fadeIn} 0.3s ease-out;

  p {
    margin-bottom: 1.5rem;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
    }

    @media (max-width: 320px) {
      font-size: 0.75rem;
    }
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .cancel,
  .delete {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.85rem;
    }

    @media (max-width: 480px) {
      font-size: 0.75rem;
    }

    @media (max-width: 320px) {
      font-size: 0.7rem;
      padding: 0.4rem 0.8rem;
    }
  }

  .cancel {
    background: #555;
    color: white;
    &:hover {
      background: #777;
    }
  }

  .delete {
    background: #eb3b5a;
    color: white;
    &:hover {
      background: #ff6b81;
    }
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 1.2rem;
  }

  @media (max-width: 320px) {
    width: 95%;
    padding: 1rem;
  }
`;
