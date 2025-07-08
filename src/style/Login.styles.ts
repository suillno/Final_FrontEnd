// components/auth/Login.styles.ts
import styled, { keyframes } from "styled-components";
import bgImage from "../img/g1.jpg";

export const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300vw;
    transform: translate(35%, 0);
    background-image: linear-gradient(-45deg, #420583 0%, #420583 100%);
    transition: 1s ease-in-out;
    z-index: -2;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-right-radius: max(50vw, 50vh);
    border-top-left-radius: max(50vw, 50vh);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(${bgImage}) no-repeat center center / cover;
    z-index: -3;
  }

  &.sign-in::before {
    transform: translate(0, 0);
    right: 50%;
  }

  &.sign-up::before {
    transform: translate(100%, 0);
    right: 50%;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Panel = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* transition: all 0.2s ease; */
  transform: translateX(
    ${(props: { $active: boolean }) => (props.$active ? "0%" : "100%")}
  );
  opacity: ${(props: { $active: boolean }) => (props.$active ? 1 : 0)};
  pointer-events: ${(props: { $active: boolean }) =>
    props.$active ? "auto" : "none"};

  @media (max-width: 768px) {
    display: ${(props) => (props.$active ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    position: relative;
    transform: translateX(${(props) => (props.$active ? "0%" : "100%")});
    opacity: ${(props) => (props.$active ? 1 : 0)};
    pointer-events: ${(props) => (props.$active ? "auto" : "none")};
  }
`;

export const SignPanel = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  transform: translateX(${(props) => (props.$active ? "0%" : "100%")});
  opacity: ${(props) => (props.$active ? 1 : 0)};
  pointer-events: ${(props) => (props.$active ? "auto" : "none")};
  width: 100%;
  height: 100%;
  padding: 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: ${(props) => (props.$active ? "flex" : "none")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    transform: translateX(${(props) => (props.$active ? "0%" : "100%")});
    opacity: ${(props) => (props.$active ? 1 : 0)};
    pointer-events: ${(props) => (props.$active ? "auto" : "none")};
    width: 100%;
    height: 100%;
    padding: 2rem;
    box-sizing: border-box;
  }
`;

export const FormBox = styled.div<{ $isLogin?: boolean }>`
  width: 410px;
  height: 470px;
  max-height: 600px;
  /* overflow-y: auto; */
  background-color: transparent;
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  visibility: hidden;
  transition: all 1s;
  transition-delay: 1000ms;

  ${(props) =>
    props.$isLogin &&
    `
     border: 2px solid rgba(255, 255, 255, 0.5);
     border-radius: 20px;
     padding: 40px;
     justify-content: center;
     padding-bottom: 20px;
    `}

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

export const H2 = styled.p`
  font-size: 2em;
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

export const Div = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 40px;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: all 1s;
  transition-delay: 1000ms;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

export const Form = styled.form<{ $isLogin?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  ${(props) =>
    !props.$isLogin &&
    `
     overflow-y: auto;
     max-height: 430px;
     padding-right: 4px;
    //  margin-bottom: 50px;
    `}
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.8rem;
  margin-top: 4px;
  animation: ${fadeOut} 3s forwards;
`;

export const InputBox = styled.div`
  position: relative;
  z-index: 20;
  width: 100%;
  border-bottom: 2px solid #fff;
  margin-bottom: 20px;

  p.error-message {
    position: absolute;
    bottom: -18px; /* 인풋 바로 아래 */
    left: 5px;
    color: #ff4d4f;
    font-size: 0.75em;
    user-select: none;
    pointer-events: none;
    white-space: nowrap;

    height: 18px; /* 공간 고정 */
    line-height: 18px;
    visibility: hidden; /* 기본은 숨김 */
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &.error p.error-message {
    visibility: visible; /* 에러 있을 때만 표시 */
    opacity: 1;
  }

  /* (기존 나머지 스타일 유지) */
  input[type="date"] {
    color: transparent;
    background-color: transparent;
    padding-right: 2.5rem;
  }
  input[type="date"]:focus,
  input[type="date"]:valid {
    color: white;
  }
  input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1) brightness(2);
    cursor: pointer;
    opacity: 1;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    height: 1.2em;
    width: 1.2em;
    z-index: 1;
  }
  input[type="date"]::-webkit-calendar-picker-indicator:hover {
    filter: invert(59%) sepia(10%) saturate(130%) hue-rotate(315deg)
      brightness(91%) contrast(95%);
  }
  label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1em;
    pointer-events: none;
    transition: 0.5s;
  }
  input:focus ~ label,
  input:valid ~ label {
    top: -5px;
    font-size: 0.8em;
  }
  input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 0 2.5rem 0 5px;
    color: #fff;
    background-color: transparent;
    transition: background-color 5000s ease-in-out 0s;
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: #fff !important;
    box-shadow: transparent inset !important;
  }
  svg {
    position: absolute;
    top: 50%;
    right: 0.74rem;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1.2em;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  margin-top: 10px;

  &:hover {
    background: #fff;
    color: black;
  }
`;

export const Find = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 10px;

  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ToggleText = styled.p`
  color: #fff;
  margin-top: 10px;
  text-align: center;

  span {
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const LeftText = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  font-size: clamp(1rem, 4vw, 4rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 255);
  user-select: none;
  pointer-events: none;
  transition: opacity 0.5s ease;
  opacity: ${(props: { $visible: any }) => (props.$visible ? 1 : 0)};
`;

export const RightText = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  font-size: clamp(1rem, 4vw, 4rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 255);
  user-select: none;
  pointer-events: none;
  transition: opacity 0.5s ease;
  opacity: ${(props: { $visible: any }) => (props.$visible ? 1 : 0)};
`;

// 로고 이미지
export const Logo = styled.img<{ $visible: boolean }>`
  position: absolute;
  top: 20px;
  left: 30px;
  width: 100px;
  z-index: 10;

  /* 애니메이션 */
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.$visible ? "0" : "-20px")});
  transition: opacity 0.5s ease, transform 0.5s ease, visibility 0.5s;

  &:hover {
    filter: invert(1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// 로고 이미지2
export const SubLogo = styled.img<{ $visible: boolean }>`
  position: absolute;
  top: 20px;
  right: 30px;
  width: 100px;
  z-index: 10;

  /* 애니메이션 */
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.$visible ? "0" : "-20px")});
  transition: opacity 0.5s ease, transform 0.5s ease, visibility 0.5s;

  &:hover {
    filter: invert(1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CheckButton = styled.button`
  position: absolute;
  right: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  background-color: transparent;
  border: 1px solid #fff;
  color: #fff;
  padding: 3px 8px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
