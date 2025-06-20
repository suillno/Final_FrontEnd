import React from "react";
import * as Styled from "./CustomerSupport.styles";

interface Props {
  content: string;
  onClose: () => void;
}

const InquiryViewModal: React.FC<Props> = ({ content, onClose }) => {
  return (
    <Styled.ModalOverlay onClick={onClose}>
      <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>문의 내용</h3>
        <p>{content}</p>
        <Styled.CloseButton onClick={onClose}>닫기</Styled.CloseButton>
      </Styled.ModalBox>
    </Styled.ModalOverlay>
  );
};

export default InquiryViewModal;
