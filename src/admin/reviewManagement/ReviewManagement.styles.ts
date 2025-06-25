import styled, { keyframes } from "styled-components";

// 페이지 요소가 아래에서 위로 서서히 올라오며 나타나는 애니메이션
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
 * DOM에 전달되지 않도록 $prop은 withConfig로 차단
 */
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isSidebarOpen", // $isSidebarOpen DOM 전달 차단
})<{ $isSidebarOpen: boolean }>`
  position: relative;                  // 파티클 배치 및 내부 요소 제어를 위한 기준 위치
  z-index: 0;                          // 파티클이 배경으로 가도록 낮은 레이어 설정
  overflow: hidden;                   // 내부 요소가 넘칠 경우 숨김 처리
  animation: ${fadeIn} 0.5s ease;     // 페이드 인 애니메이션 적용
  padding: 2rem;                      // 내부 여백
  min-height: 100vh;                  // 화면 최소 높이 설정
  margin-left: ${(props) => (props.$isSidebarOpen ? "220px" : "0")}; // 사이드바 열림 여부에 따라 좌측 마진 조절
  transition: margin-left 0.3s ease;  // 사이드바 토글 시 부드러운 마진 전환
  background-color: #0e0f11;          // 다크 테마 배경색
  color: white;                       // 기본 텍스트 색상

  // tsparticles를 페이지 배경에 전체 적용
  #tsparticles {
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

/**
 * 모든 콘텐츠를 가운데 정렬하고 수직 배치
 * max-width로 내용 폭을 제한하여 레이아웃 균형 유지
 */
export const InnerWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;                   // 수평 중앙 정렬
  display: flex;
  flex-direction: column;          // 세로로 정렬
`;

/**
 * 페이지 상단 타이틀 스타일
 * 가운데 정렬, 네온 효과, 페이드 인 애니메이션 적용
 */
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #00eaff;                   // 하늘색 계열 강조
  text-shadow: 0 0 10px #00eaff99; // 네온 느낌의 그림자 효과
  animation: ${fadeIn} 0.8s ease-out;
`;

/**
 * 검색창, 필터, 정렬 버튼 등 제어 요소들을 담는 상단 영역
 * 수평 정렬 및 라벨 스타일 포함
 */
export const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #ccc;
  }
`;

/**
 * 검색어 입력 필드
 * 포커스 시 배경 강조, 테두리와 그림자로 시각적 효과 추가
 */
export const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border-radius: 6px;
  width: 250px;
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
    width: 300px;
    border-color: #00eaff;
    background-color: #0e0f11;
    box-shadow: 0 0 8px #00eaff88;
  }
`;

/**
 * 정렬 기능 버튼
 * 기본적으로 파란색 배경이며, hover 시 색상 변경
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
`;

/**
 * 리뷰 데이터를 출력하는 테이블
 * 짙은 배경, 행 hover 시 배경 강조, 페이드 인 애니메이션 포함
 */
export const ReviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #1c1d23;
  border: 1px solid #2a2b30;
  box-shadow: 0 0 20px #00eaff22;
  animation: ${fadeIn} 0.6s ease;

  th, td {
    padding: 1rem;
    border-bottom: 1px solid #333;
    text-align: center;
  }

  th {
    background-color: #2c2f36;
    color: #00eaff;
    font-weight: 600;
  }

  td {
    color: #ddd;
  }

  tbody tr:hover {
    background-color: #2a2d38;
    transition: background-color 0.3s ease;
  }
`;

/**
 * 리뷰가 길어서 잘려보이는 경우 사용되는 '+' 버튼
 * 버튼은 오른쪽에 붙고 밝은 파란 계열로 표시됨
 */
export const MoreButton = styled.button`
  margin-left: 8px;
  padding: 2px 8px;
  background-color: #4b7bec;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 0 6px #4b7bec88;

  &:hover {
    background-color: #5d8bf4;
  }
`;

/**
 * 리뷰 삭제 버튼
 * 붉은 계열의 경고 스타일이며, hover 시 색이 더 밝아짐
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
`;

/**
 * 테이블 하단에 위치한 페이지네이션 영역
 * 가운데 정렬 및 현재 페이지 버튼 강조 스타일
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
  }
`;
