import styled from "styled-components";

/* 페이지 전체 wrapper */
export const PageWrapper = styled.div<{ $isSidebarOpen?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 6rem 1.5rem 8rem;
  background-color: #121317;
  transition: margin 0.3s ease;
  box-sizing: border-box;

  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 4rem 1rem 6rem;
  }

  @media (max-width: 480px) {
    padding: 3.5rem 0.75rem 5rem;
  }

  @media (max-width: 320px) {
    padding: 3rem 0.5rem 4rem;
  }
`;

/* 중앙 정렬 폼 wrapper */
export const FormWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
`;

/* 타이틀 텍스트 */
export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  color: white;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 320px) {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
`;

/* 전체 폼 layout */
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 480px) {
    gap: 1.2rem;
  }

  @media (max-width: 320px) {
    gap: 1rem;
  }
`;

/* 라벨 */
export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.2rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
  }
`;

/*  일반 input 필드 */
export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: #1c1d23;
  color: white;
  border: 1px solid #555;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00eaff;
    background-color: #0e0f11;
    box-shadow: 0 0 8px #00eaff88;
  }

  @media (max-width: 480px) {
    padding: 0.65rem;
    font-size: 0.95rem;
  }

  @media (max-width: 320px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

/* 텍스트 영역 (textarea) */
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
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00eaff;
    background-color: #0e0f11;
    box-shadow: 0 0 8px #00eaff88;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.65rem;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

/* 제출 버튼 */
export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4b6cb7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00c2cc;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.65rem;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

/* 셀렉트 박스 */
export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem;
  font-size: 1rem;
  background-color: #1c1d23;
  color: white;
  border: 1px solid #555;
  border-radius: 6px;
  appearance: none;
  transition: all 0.3s ease;

  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='30,50 70,90 110,50' stroke='white' stroke-width='15' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 0.75rem;

  &:focus {
    outline: none;
    border-color: #00eaff;
    background-color: #0e0f11;
    box-shadow: 0 0 8px #00eaff88;
  }

  option {
    background-color: #1c1d23;
    color: white;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.65rem 2rem 0.65rem 0.65rem;
  }

  @media (max-width: 320px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.8rem 0.6rem 0.6rem;
  }
`;

/* 직접입력 전환 버튼 */
export const SwitchButton = styled.button`
  margin-top: 0.5rem;
  align-self: flex-end;
  background: none;
  border: none;
  color: #00eaff;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
  text-decoration: none;

  &:hover {
    color: #00c2cc;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }

  @media (max-width: 320px) {
    font-size: 0.8rem;
  }
`;

/* 자동완성 리스트 (ul) */
export const SuggestionList = styled.ul`
  width: 100%;
  margin-top: -1rem;
  background-color: #1c1d23;
  border: 1px solid #555;
  border-radius: 6px;
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  position: absolute;
  box-shadow: 0 4px 12px rgba(0, 234, 255, 0.2);
`;

/* 자동완성 항목 (li) */
export const SuggestionItem = styled.li`
  padding: 0.75rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #00eaff22;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.9rem;
    font-size: 0.95rem;
  }

  @media (max-width: 320px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
  }
`;
