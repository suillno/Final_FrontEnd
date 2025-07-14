import styled, { keyframes } from "styled-components";

// 페이지 요소가 아래에서 위로 서서히 나타나는 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px); // 아래에서 시작
  }
  to {
    opacity: 1;
    transform: translateY(0);    // 본래 위치로 이동
  }
`;

/**
 * 전체 페이지를 감싸는 최상위 컨테이너
 * 사이드바가 열렸는지 여부에 따라 좌측 여백을 조정하며,
 * 파티클 애니메이션이 배경에 깔리도록 설정됨
 */
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isSidebarOpen", // $isSidebarOpen DOM 전달 방지
})<{ $isSidebarOpen: boolean }>`
  position: relative;
  z-index: 0;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease;
  padding: 2rem;
  min-height: 100vh;
  margin-left: ${(props) => (props.$isSidebarOpen ? "220px" : "0")};
  transition: margin-left 0.3s ease;
  background-color: #0e0f11;
  color: white;
  font-size: 1rem;

  #tsparticles {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.875rem; /* 모바일에서는 기본 폰트 크기 축소 */
  }
`;

/**
 * 콘텐츠를 감싸는 래퍼
 * 최대 너비를 제한하고 가운데 정렬
 */
export const InnerWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

/**
 * 페이지 제목
 * 가운데 정렬 + 네온 효과
 */
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #00eaff;
  text-shadow: 0 0 10px #00eaff99;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

/**
 * 검색창과 정렬 버튼이 포함된 상단 컨트롤 영역
 */
export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  gap: 1rem;
  flex-wrap: wrap;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ccc;
  }
`;

/**
 * 검색 입력 필드
 * 포커스 시 배경 강조 + 그림자 처리
 */
export const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border-radius: 6px;
  width: 400px;
  font-size: 1rem;
  border: 1px solid #555;
  background-color: #1c1d23;
  color: #fff;
  transition: all 0.3s ease;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    width: 450px;
    border-color: #00eaff;
    background-color: #0e0f11;
    box-shadow: 0 0 8px #00eaff88;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;

    &:focus {
      width: 100%;
    }
  }
`;

/**
 * 정렬용 버튼
 */
export const SortButton = styled.button`
  background: #00eaff;
  color: #0e0f11;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: #12f1ff;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 0.4rem 0.6rem;
  }
`;

/**
 * 테이블 기본 스타일
 * 다크 배경, 애니메이션 포함
 */
export const ReviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #1c1d23;
  border: 1px solid #2a2b30;
  box-shadow: 0 0 20px #00eaff22;
  animation: ${fadeIn} 0.6s ease;

  th,
  td {
    padding: 1rem;
    border-bottom: 1px solid #333;
    text-align: center;
    word-break: break-word;
  }

  th {
    background-color: #2c2f36;
    color: #00eaff;
    font-weight: 600;
    font-size: 1rem;
  }

  td {
    color: #ddd;
    font-size: 0.95rem;
  }

  tbody tr:hover {
    background-color: #2a2d38;
    transition: background-color 0.3s ease;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 0.8rem;
      padding: 0.75rem;
    }
  }
`;

/**
 * 긴 리뷰 내용을 한 줄로 자르고, + 버튼을 오른쪽에 고정한 셀
 */
export const ContentCell = styled.td`
  position: relative;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 30px;
  vertical-align: middle;

  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

/**
 * '+' 버튼 (모달 열기용)
 * 항상 셀 오른쪽에 고정됨
 */
export const MoreButton = styled.button`
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  padding: 2px 8px;
  background-color: #4b7bec;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 0 6px #4b7bec88;

  &:hover {
    background-color: #5d8bf4;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 2px 6px;
  }
`;

/**
 * 삭제 버튼 스타일
 * 빨간 계열 강조, hover 시 밝아짐
 */
export const DeleteButton = styled.button`
  background: #eb3b5a;
  color: white;
  border: none;
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s ease;
  box-shadow: 0 0 6px #eb3b5a55;

  &:hover {
    background: #ff6b81;
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.35rem 0.6rem;
  }
`;

/**
 * 페이지네이션 버튼 그룹
 * 현재 페이지는 강조 처리
 */
export const Pagination = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    background-color: #2f3138;
    color: white;
    cursor: pointer;
    transition: background 0.3s ease;

    &.active {
      background-color: #00eaff;
      color: #0e0f11;
      font-weight: bold;
    }

    &:hover {
      background-color: #12f1ff;
    }

    @media (max-width: 768px) {
      padding: 0.3rem 0.6rem;
      font-size: 0.8rem;
    }
  }
`;
