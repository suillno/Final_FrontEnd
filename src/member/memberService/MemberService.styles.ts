import styled from "styled-components";

// 전체 페이지 래퍼: 사이드바 열림에 따라 margin-left 조정, 중앙 정렬
export const PageWrapper = styled.div<{ $isSidebarOpen?: boolean }>`
  display: flex;
  justify-content: center; // 수평 가운데 정렬
  align-items: flex-start; // 상단부터 시작
  min-height: 100vh;
  padding: 6rem 1.5rem 8rem;
  background-color: #121317;
  box-sizing: border-box;
  transition: margin 0.3s ease;

  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 4rem 1rem 6rem;
  }
`;

// 가운데 배치될 폼 전체 컨테이너
export const FormWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
`;

// "고객 문의" 타이틀
export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  color: white;
`;

// 입력 폼 레이아웃
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; // 입력 요소 간 간격
`;

// 입력 필드 라벨
export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.2rem;
`;

// 일반 입력 필드 (제목, 검색 등)
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: #1c1d23;
  color: white;
  border: 1px solid #555;
  border-radius: 6px;
  font-size: 1rem;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: #00eaff;
    box-shadow: 0 0 8px #00eaff88;
    background-color: #0e0f11;
  }
`;

// 긴 텍스트 필드 (문의 내용)
export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  min-height: 150px;
  background-color: #1c1d23;
  color: white;
  border: 1px solid #555;
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
  transition: 0.3s;

  &:focus {
    outline: none;
    border-color: #00eaff;
    box-shadow: 0 0 8px #00eaff88;
    background-color: #0e0f11;
  }
`;

// 제출 버튼
export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #00eaff;
  color: #000;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00c2cc;
  }
`;

// 셀렉트박스 (사용 안 하더라도 유지 가능)
export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  background-color: #1c1d23;
  color: white;
  border: 1px solid #555;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00eaff;
    box-shadow: 0 0 8px #00eaff88;
    background-color: #0e0f11;
  }
`;

// 자동완성 추천 게임 리스트 (ul 형태)
export const SuggestionList = styled.ul`
  width: 100%;
  margin-top: -1rem; // 입력창과 간격 줄이기
  background-color: #1c1d23;
  border: 1px solid #555;
  border-radius: 6px;
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  position: absolute;
`;

// 자동완성 리스트 항목
export const SuggestionItem = styled.li`
  padding: 0.75rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #00eaff22;
  }
`;
