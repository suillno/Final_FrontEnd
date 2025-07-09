import styled from "styled-components";

// 전체 페이지 래퍼: 사이드바 열림 여부에 따라 왼쪽 마진 조정
export const PageWrapper = styled.div<{ $isSidebarOpen?: boolean }>`
  display: flex;
  justify-content: center; // 수평 중앙 정렬
  align-items: flex-start; // 상단 정렬
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

// 가운데 정렬된 폼 영역 (최대 너비 제한)
export const FormWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
`;


// "고객 문의" 타이틀 스타일
export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 2.5rem;
  text-align: center;
  color: white;
`;

// 전체 폼 레이아웃: 요소 간 간격 조절
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// 각 입력 필드 앞 라벨 스타일
export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.2rem;
`;

// 텍스트 입력 필드 (제목 등)
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
`;

// 긴 텍스트 영역 (문의 내용 입력용)
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
`;

// 제출 버튼 스타일
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
`;


// 셀렉트 박스 커스텀 스타일
export const Select = styled.select`
  width: 100%;
  padding: 0.75rem 2.5rem 0.75rem 0.75rem; // 오른쪽에 화살표 공간 확보
  font-size: 1rem;
  background-color: #1c1d23;
  color: white;
  border: 1px solid #555;
  border-radius: 6px;
  appearance: none;
  transition: all 0.3s ease;

  // 커스텀 화살표
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
`;

// 셀렉트 → 직접입력 전환 버튼 or 그 반대 버튼 스타일
export const SwitchButton = styled.button`
  margin-top: 0.5rem;
  align-self: flex-end;
  background: none;             // 배경 제거
  border: none;                 // 테두리 제거
  color: #00eaff;               // 메인 포인트 색
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;

  // 밑줄 제거
  text-decoration: none;

  &:hover {
    color: #00c2cc;             // 호버 시 살짝 색 변화
  }
`;



// 자동완성 결과 리스트 (ul)
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

// 자동완성 리스트 항목 (li)
export const SuggestionItem = styled.li`
  padding: 0.75rem 1rem;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #00eaff22;
  }
`;
