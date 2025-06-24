import styled from "styled-components";

/* 전체 페이지 컨테이너 - 사이드바 열림 여부에 따라 왼쪽 여백 조정 */
export const Container = styled.div<{ isSidebarOpen: boolean }>`
  padding: 2rem;
  margin-left: ${(props) => (props.isSidebarOpen ? "220px" : "5%")};
  transition: margin-left 0.3s ease;
  color: white;
  background-color: #1e1f24;
  min-height: 100vh;
`;

/* 상단 타이틀 */
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

/* 상태 필터 박스 - 체크박스 정렬 */
export const FilterBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
`;

/* 🔍 검색 바 전체 wrapper */
export const SearchBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

/* 🔍 검색 입력창 */
export const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 0.75rem; /* 오른쪽 패딩으로 아이콘 공간 확보 */
  border-radius: 6px;
  border: 1px solid #555;
  width: 180px;
  background-color: #2c2f36;
  color: white;
  font-size: 1rem;
  transition: width 0.3s ease, background-color 0.3s ease;

  &:focus {
    width: 300px;
    border-color: #4b7bec;
    background-color: #1f2127;
  }

  &::placeholder {
    color: #bbb;
  }
`;

/* 🔍 돋보기 아이콘 버튼 */
export const SearchIcon = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #4b7bec;
  cursor: pointer;

  &:hover {
    color: #82b1ff;
  }
`;

/* 문의 목록 테이블 */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #2c2f36;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #444;
  }

  th {
    background-color: #3b3e45;
    color: #fff;
  }

  td {
    color: #ddd;
  }
`;

/* 상세 보기 버튼 */
export const ViewButton = styled.button`
  padding: 0.4rem 0.8rem;
  background: #4b7bec;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &:hover {
    background: #5d8bf4;
  }
`;

/* 처리 상태 변경 버튼 */
export const ChangeButton = styled.button`
  padding: 0.4rem 0.8rem;
  background: #20bf6b;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &:hover {
    background: #28c76f;
  }
`;

/* 페이지네이션 버튼 컨테이너 */
export const Pagination = styled.div`
  margin-top: 1.5rem;
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
      background-color: #4b7bec;
    }
  }
`;

/* 모달 오버레이 (배경 어둡게) */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

/* 모달 내부 박스 */
export const ModalBox = styled.div`
  background: #2c2f36;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
  }
`;

/* 모달 닫기 버튼 */
export const CloseButton = styled.button`
  margin-top: 1.5rem;
  background: #444;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  align-self: center;
`;

/* 상태 버튼 감싸는 박스 */
export const StatusBox = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

/* 처리 상태 버튼 (대기, 처리중, 완료) */
export const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #666;
  color: white;
  cursor: pointer;

  &.active {
    background-color: #ff9f43;
  }
`;
