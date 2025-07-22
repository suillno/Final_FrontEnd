import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

/* ======================= 🔸 드롭다운 애니메이션 정의 ======================= */

// 드롭다운 열릴 때
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

// 드롭다운 닫힐 때
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

/* ======================= 🔸 헤더 영역 ======================= */

// 전체 헤더 컨테이너
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

// 사이드바 아이콘 (햄버거 버튼)
export const SidebarIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(1);

  &:hover {
    filter: invert(87%) sepia(3%) saturate(72%) hue-rotate(197deg)
      brightness(122%) contrast(67%);
  }
`;

// 로고 이미지
export const Logo = styled.img`
  width: 100%;
  max-width: 3.2em;
  height: auto;

  &:hover {
    filter: invert(1);
  }

  @media (max-width: 468px) {
    display: none;
  }
`;

// 오른쪽 프로필/닉네임/버튼 그룹
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

// 닉네임 텍스트
export const HideName = styled.a`
  font-size: 1rem;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

/* ======================= 🔸 드롭다운 영역 ======================= */

// 드롭다운 컨테이너
export const Dropdown = styled.div<{ $animateOut: boolean }>`
  position: absolute;
  top: 50px;
  right: 0;
  background: linear-gradient(145deg, #2a2a2e, #1f1f23);
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  min-width: 200px;
  z-index: 2000;

  animation: ${({ $animateOut }) =>
      $animateOut ? dropdownFadeOut : dropdownFadeIn}
    0.5s ease forwards;
`;

// 드롭다운 내부 링크 스타일
export const DropdownLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px 16px;
  font-size: 0.95rem;
  color: #eee;
  text-decoration: none;
  transition: background-color 0.25s ease, transform 0.25s ease;

  &:hover {
    background-color: #00eaff22;
    transform: translateX(6px);
  }

  &:not(:last-child) {
    border-bottom: 1px solid #444;
  }
`;

// 🔹 작은 프로필 이미지 (헤더 우측)
export const SmallProfileImage = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #888;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 0 2px #00eaff;
  }
`;

// 🔸 큰 프로필 이미지 (드롭다운 상단)
export const LargeProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #00eaff;
  margin: 1rem auto 0.5rem;
  display: block;
`;

// 드롭다운 내 닉네임 텍스트
export const UserName = styled.p`
  color: white;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  font-weight: 500;
`;
