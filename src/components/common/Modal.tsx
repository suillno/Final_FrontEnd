import React, { PropsWithChildren } from "react";
import styled from "styled-components";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({ children }: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <DialogBox>{children}</DialogBox>
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  margin-left: 5%;
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  z-index: 1000;
  pointer-events: none;
  @media (max-width: 375px) {
    margin-left: 0%;
  }
`;

const DialogBox = styled.dialog`
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 200px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: none;
  border: 0.5px solid black;
  pointer-events: auto; // 모달만 클릭 가능
`;

export default Modal;
