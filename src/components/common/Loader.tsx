import React from "react";
import styled, { keyframes } from "styled-components";

// spin 애니메이션 정의
const spin = keyframes`
  0%, 100% { box-shadow: .2em 0px 0 0px currentcolor; }
  12% { box-shadow: .2em .2em 0 0 currentcolor; }
  25% { box-shadow: 0 .2em 0 0px currentcolor; }
  37% { box-shadow: -.2em .2em 0 0 currentcolor; }
  50% { box-shadow: -.2em 0 0 0 currentcolor; }
  62% { box-shadow: -.2em -.2em 0 0 currentcolor; }
  75% { box-shadow: 0px -.2em 0 0 currentcolor; }
  87% { box-shadow: .2em -.2em 0 0 currentcolor; }
`;

// 중앙정렬 컨테이너
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15%;
  height: 100vh;
  background-color: #1e1f24;
`;

// 스피너 본체
const LoaderCircle = styled.span`
  position: relative;
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #fff;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
  }

  &::before {
    transform: rotateX(70deg);
    animation: ${spin} 1s linear infinite;
    color: #fff;
  }

  &::after {
    transform: rotateY(70deg);
    animation: ${spin} 1s linear infinite;
    animation-delay: 0.4s;
    color: #ff3d00;
  }
`;

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <LoaderCircle />
    </LoaderContainer>
  );
};

export default Loader;
