import styled from "styled-components";

/* 전체 페이지 레이아웃 */
export const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2em;
  background-color: #1e1f24;
  margin-left: ${(props) => (props.$isSidebarOpen ? "180px" : "80px")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1.5em;
  }
`;

/* 설정 섹션 박스 */
export const SectionBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

/* 사이드바 토글 스위치 라벨 */
export const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  gap: 10px;
`;

/* 제목 텍스트 */
export const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

/* 폼 필드 블록 */
export const Field = styled.div`
  margin-bottom: 16px;
`;

/* 인풋 필드 */
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #555;
  background-color: #1f1f1f;
  color: #fff;
  font-size: 15px;
`;

/* 버튼 (색상 지정 가능) */
export const Button = styled.button<{ color?: string }>`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => props.color || "#00bfff"};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background-color: ${(props) =>
      props.color === "#4caf50" ? "#43a047" : "#008ecc"};
  }
`;

/* 프로필 이미지 */
export const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

/* 이미지 감싸는 컨테이너 */
export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* 이미지 선택 영역 그리드 */
export const ImageSelectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 1rem;
  justify-content: center;
`;

/* 체크박스 (ex: 사용자 선택) */
export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

/* 선택 가능한 프로필 이미지 */
export const SelectableImage = styled.img<{ $selected: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: ${({ $selected }) =>
    $selected ? "3px solid #00eaff" : "2px solid #444"};
  cursor: pointer;
  transition: all 0.2s ease;
`;

/* 탭 메뉴 영역 */
export const TabMenu = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

/* 탭 버튼 */
export const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  font-weight: bold;
  background-color: ${(props) => (props.$active ? "#00bfff" : "#444")};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
