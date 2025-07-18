import styled, { keyframes } from "styled-components";

/* 아래에서 위로 부드럽게 올라오는 페이드 인 애니메이션 */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* 팝업 등장 시 커지며 나타나는 효과 */
const popIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
`;

/* 좌측 사이드바 여부에 따라 마진 조절되는 메인 컨테이너 */
export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isSidebarOpen",
})<{ $isSidebarOpen: boolean }>`
  position: relative;
  padding: 2rem;
  margin-left: ${(props) => (props.$isSidebarOpen ? "220px" : "0")};
  transition: margin-left 0.3s ease;
  background-color: #1e1f24;
  min-height: 100vh;
  color: white;
  overflow: hidden;
  font-size: 1rem;

  @media (max-width: 1024px) {
    padding: 1.5rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 1.2rem;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    font-size: 0.8rem;
  }

  @media (max-width: 320px) {
    padding: 0.8rem;
    font-size: 0.75rem;
  }
`;

/* 내부 중앙 정렬 래퍼 + 애니메이션 */
export const InnerWrapper = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1000px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease;
`;

/* 페이지 타이틀 */
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #00eaff;
  text-shadow: 0 0 10px #00eaff99;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }

  @media (max-width: 320px) {
    font-size: 1.2rem;
  }
`;

/* 상태 필터 박스 */
export const FilterBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.95rem;
    cursor: pointer;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }

    @media (max-width: 320px) {
      font-size: 0.8rem;
    }
  }

  input {
    accent-color: #00eaff;
    transform: scale(1.1);
  }
`;

/* 검색창 영역 */
export const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
`;

/* 검색 입력창 */
export const SearchInput = styled.input`
  padding: 0.75rem 2.75rem 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #555;
  width: 400px;
  font-size: 1rem;
  background-color: #2c2f36;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    width: 450px;
    border-color: #00eaff;
    background-color: #1f2127;
    box-shadow: 0 0 8px #00eaff88;
  }

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.9rem;

    &:focus {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
    padding: 0.65rem 2rem 0.65rem 0.75rem;
  }
`;

/* 선택 삭제 버튼 */
export const DeleteSelectedButton = styled.button`
  padding: 0.7rem 1.2rem;
  background-color: #e74c3c;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  font-size: 0.95rem;
  transition: background 0.2s ease;
  height: 44px;

  &:hover {
    background-color: #ff6659;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.6rem 1rem;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
    padding: 0.5rem 0.9rem;
  }
`;

/* 문의 목록 테이블 */
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #2c2f36;
  animation: ${fadeIn} 0.4s ease;
  border-radius: 12px;
  overflow: hidden;

  th,
  td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #444;
    text-align: center;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }

    @media (max-width: 320px) {
      font-size: 0.8rem;
    }
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

  input[type="checkbox"] {
    transform: scale(1.2);
    accent-color: #00eaff;
    cursor: pointer;
  }

  /* 📱 모바일 카드형 UI */
  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tbody {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }

    tr {
      display: block;
      width: 100%;
      max-width: 500px;
      background-color: #2c2f36;
      border: 1px solid #444;
      border-radius: 10px;
      padding: 1rem 1.2rem;
    }

    td {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      padding: 0.5rem 0;
      border-bottom: none;
      width: 100%;
      gap: 1rem;

      &::before {
        content: attr(data-label);
        font-weight: 600;
        color: #00eaff;
        flex: 1;
        min-width: 100px;
      }
    }
  }
`;

/* 상세보기 버튼 */
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

/* 상태 변경 버튼 */
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

/* 답변 등록 버튼 */
export const AnswerRegisterButton = styled.button`
  background-color: #34495e;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #2c3e50;
  }
`;

/* 답변 수정 버튼 */
export const AnswerEditButton = styled.button`
  background-color: #6c5b7b;
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #732d91;
  }
`;

/* 삭제 확인 팝업 박스 */
export const ConfirmBox = styled.div`
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

  .actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;

    button {
      padding: 0.7rem 1.5rem;
      border-radius: 6px;
      border: none;
      font-weight: bold;
      cursor: pointer;
      font-size: 0.95rem;
      transition: all 0.2s ease;
    }

    .delete {
      background: #e74c3c;
      color: white;

      &:hover {
        background: #ff6659;
      }
    }

    .cancel {
      background: #555;
      color: white;

      &:hover {
        background: #777;
      }
    }
  }
`;

/* 페이지네이션 버튼 영역 */
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

    @media (max-width: 480px) {
      padding: 0.3rem 0.6rem;
      font-size: 0.85rem;
    }

    @media (max-width: 320px) {
      font-size: 0.8rem;
      padding: 0.25rem 0.5rem;
    }
  }
`;

/* 모달 배경 오버레이 */
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

/* 모달 박스 */
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

/* 모달 닫기 버튼 */
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

/* 상태 버튼 묶음 */
export const StatusBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

/* 상태 버튼 */
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

/* 텍스트 입력창 */
export const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  resize: none;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #1f2127;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00eaff;
    box-shadow: 0 0 6px #00eaff88;
  }

  &::placeholder {
    color: #aaa;
  }
`;

/* 저장 버튼 */
export const SaveButton = styled.button`
  margin-top: 1.5rem;
  background: #f4f4f4;
  border: none;
  padding: 0.5rem 1rem;
  color: #444;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background: rgb(203, 208, 220);
  }
`;
const mobile = "@media (max-width: 768px)";
