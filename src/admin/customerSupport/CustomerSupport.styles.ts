import styled, { keyframes } from "styled-components";

// 요소가 아래에서 위로 부드럽게 나타나는 페이드 인 애니메이션
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 요소가 축소된 상태에서 커지며 등장하는 팝업 애니메이션
const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
`;

// 사이드바 열림 여부에 따라 좌측 여백이 조정되는 전체 페이지 컨테이너
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isSidebarOpen", // DOM 전달 차단
})<{ $isSidebarOpen: boolean }>`
  position: relative;
  padding: 2rem;
  margin-left: ${(props) => (props.$isSidebarOpen ? "220px" : "0")}; // 사이드바 열림 시 여백 확보
  transition: margin-left 0.3s ease;
  background-color: #1e1f24; // 다크 배경
  min-height: 100vh;
  color: white;
  overflow: hidden;
`;

// 내부 콘텐츠를 가운데 정렬하고 부드럽게 나타나게 하는 래퍼
export const InnerWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease; // 진입 애니메이션
`;

// 페이지의 메인 타이틀 스타일
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #00eaff;
  text-shadow: 0 0 10px #00eaff99; // 네온 효과
  margin-bottom: 2rem;
`;

// 필터 체크박스를 묶는 영역 (상태별 필터링)
export const FilterBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.95rem;
    cursor: pointer;
  }

  input {
    accent-color: #00eaff;
  }
`;


// 검색창과 아이콘 감싸는 wrapper (입력창과 아이콘을 같이 제어)
export const SearchBar = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;
  margin-bottom: 2rem;
  position: relative;

  // hover 시 왼쪽 아이콘 표시
  &:hover .search-icon-left {
    opacity: 1;
    transform: translateX(0);
  }
`;


// 검색 입력창 스타일. 포커스 시 확장되고 강조됨
export const SearchInput = styled.input`
  padding: 0.75rem 2.75rem 0.75rem 1rem;  // 전체적으로 넉넉한 패딩
  border-radius: 8px;
  border: 1px solid #555;
  width: 400px;                           // 기본 너비 확대
  font-size: 1rem;
  background-color: #2c2f36;
  color: white;
  justify-content: center;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    width: 450px;                         // 포커스 시 더 넓어짐
    border-color: #00eaff;
    background-color: #1f2127;
    box-shadow: 0 0 8px #00eaff88;
  }

  &::placeholder {
    color: #aaa;
  }
`;

// 고객문의 리스트를 나타내는 테이블
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #2c2f36;
  animation: ${fadeIn} 0.4s ease;

  th, td {
    padding: 1rem;
    border-bottom: 1px solid #444;
    text-align: center;
  }

  th {
    background-color: #3b3e45;
    color: #00eaff;
    font-weight: 600;
  }

  td {
    color: #ddd;
  }

  tr:hover {
    background-color: #35383f;
  }
`;

// '내용 보기' 버튼 스타일
export const ViewButton = styled.button`
  padding: 0.4rem 0.8rem;
  background: #4b7bec;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #5d8bf4;
  }
`;

// '상태 변경' 버튼 스타일
export const ChangeButton = styled.button`
  padding: 0.4rem 0.8rem;
  background: #20bf6b;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #28c76f;
  }
`;

// 페이지 하단의 페이지네이션 버튼을 감싸는 컨테이너
export const Pagination = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    background-color: #444;
    color: white;
    cursor: pointer;

    &.active {
      background-color: #00eaff;
      color: #1e1f24;
      font-weight: bold;
    }

    &:hover {
      background-color: #5ef1ff;
    }
  }
`;

// 모달 전체를 덮는 어두운 배경 오버레이
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5); // 반투명 블랙
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// 모달 내용이 들어가는 박스 (중앙 팝업창)
export const ModalBox = styled.div`
  background: #2c2f36;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  color: white;
  animation: ${popIn} 0.3s ease;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    color: #00eaff;
  }

  p {
    margin-bottom: 1rem;
  }
`;

// 모달 내 '닫기' 버튼 스타일
export const CloseButton = styled.button`
  margin-top: 1.5rem;
  background: #444;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background: #555;
  }
`;

// 모달 안에서 상태 변경 버튼들을 정렬하는 영역
export const StatusBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

// 개별 상태 버튼 (선택 상태일 경우 색상 강조)
export const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #666;
  color: white;
  cursor: pointer;
  font-weight: bold;

  &.active {
    background-color: #ff9f43;
  }

  &:hover {
    background-color: #888;
  }
`;
