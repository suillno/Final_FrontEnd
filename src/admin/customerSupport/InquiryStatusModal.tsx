import React from "react";
import * as Styled from "./CustomerSupport.styles";
import { Inquiry } from "./CustomerSupport.types";

interface Props {
  target: Inquiry;
  onChangeStatus: (status: Inquiry["status"]) => void;
  onClose: () => void;
}

const InquiryStatusModal: React.FC<Props> = ({ target, onChangeStatus, onClose }) => {
  return (
    <Styled.ModalOverlay onClick={onClose}>
      <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>처리 상태 변경</h3>
        <p><strong>현재 상태:</strong> {target.status}</p>
        <Styled.StatusBox>
          {["대기", "처리중", "완료"].map((status) => (
            <Styled.StatusButton
              key={status}
              onClick={() => onChangeStatus(status as Inquiry["status"])}
              className={target.status === status ? "active" : ""}
            >
              {status}
            </Styled.StatusButton>
          ))}
        </Styled.StatusBox>
        <Styled.CloseButton onClick={onClose}>닫기</Styled.CloseButton>
      </Styled.ModalBox>
    </Styled.ModalOverlay>
  );
};

export default InquiryStatusModal;
