// components/auth/Find.styles.ts
import styled, { keyframes } from "styled-components";
import bgImage from "../img/g3.jpg";

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
    background-image: linear-gradient(
      -45deg,
      rgb(90, 8, 177) 0%,
      rgb(90, 8, 177) 100%
    );
    transition: 1s ease-in-out;
    z-index: 6;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-right-radius: max(50vw, 50vh);
    border-top-left-radius: max(50vw, 50vh);
    z-index: -2;
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
  &.find-pw::before {
    transform: translate(0, 0);
    right: 50%;
  }

  &.find-id::before {
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

export const FormBox = styled.div`
  width: 400px;
  height: 500px;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: 0;
  visibility: hidden;
  transition: all 1s;
  transition-delay: 1000ms;
  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  h2 {
    font-size: 2em;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const InputBox = styled.div`
  position: relative;
  /* width: 310px; */
  width: 100%;
  border-bottom: 2px solid #fff;
  margin-bottom: 20px;

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
  }

  input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 0 15px 0 5px;
    color: #fff;
  }

  svg {
    position: absolute;
    right: 8px;
    color: #fff;
    font-size: 1.2em;
    top: 20px;
  }
`;
export const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background: ${({ disabled }) => (disabled ? "#ccc" : "transparent")};
  border: 2px solid ${({ disabled }) => (disabled ? "#ccc" : "#fff")};
  color: ${({ disabled }) => (disabled ? "#666" : "#fff")};
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: 1em;
  font-weight: 600;
  margin-top: 5px;
  transition: background 0.3s, color 0.3s, border 0.3s;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#666" : "black")};
  }
`;

// 나타났다 서서히 사라지는 애니메이션
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

// 에러 메시지 스타일
export const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.8rem;
  margin-top: 4px;
  animation: ${fadeOut} 6s forwards;
`;

export const ToggleText = styled.p`
  color: #fff;
  margin-top: 20px;

  span {
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ResultBox = styled.div`
  margin-top: 20px;
  color: #fff;
  text-align: center;
  font-size: 1.1em;
`;

export const Login = styled.div`
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
  transition: opacity 0.6s ease;
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
  transition: opacity 0.6s ease;
  opacity: ${(props: { $visible: any }) => (props.$visible ? 1 : 0)};
`;
