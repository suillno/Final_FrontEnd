import styled, { keyframes } from "styled-components";

// ======================= 🔸 드롭다운 애니메이션 정의 =======================

// 열릴 때: 위에서 아래로 서서히 나타나는 효과
export const dropdownFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 닫힐 때: 아래에서 위로 사라지는 효과
export const dropdownFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

// ======================= 🔸 스타일 컴포넌트 =======================

// 헤더 전체 영역 (고정 위치)
export const HeaderWrapper = styled.header`
  position: fixed;
  background-color: #3b3e45;
  width: 100%;
  padding: 10px 24px;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

// 사이드바 토글 아이콘 버튼
export const SidebarIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(1); // 흰색화 처리
`;

// 로고 이미지
export const Logo = styled.img`
  width: 100%;
  max-width: 3.2em;
  height: auto;

  &:hover {
    filter: invert(1); // 반전 효과
  }

  @media (max-width: 468px) {
    display: none;
  }
`;

// 로그인/닉네임 영역
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.875rem;
    }
  }

  button {
    background: none;
    border: none;
    color: #fff;
    cursor: pointer;
  }
`;

// 닉네임 텍스트 (모바일에서는 숨김)
export const HideName = styled.a`
  font-size: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

// 드롭다운 스타일 (애니메이션 포함)
export const Dropdown = styled.div<{ animateOut: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  background-color: #2a2a2e;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  min-width: 180px;
  z-index: 2000;

  // 열림/닫힘에 따라 애니메이션 선택
  animation: ${({ animateOut }) =>
      animateOut ? dropdownFadeOut : dropdownFadeIn}
    0.5s ease forwards;

  a {
    display: block;
    padding: 12px 18px;
    color: #ffffff;
    font-size: 0.95rem;
    text-decoration: none;
    transition: background-color 0.25s ease, padding-left 0.25s ease;

    &:hover {
      background-color: #3e3f47;
      padding-left: 22px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #444;
    }
  }
`;
