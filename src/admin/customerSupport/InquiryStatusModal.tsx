import React from "react";
import * as Styled from "./CustomerSupport.styles";
import { Inquiry } from "./CustomerSupport.types";

// props 타입 지정
interface Props {
  target: Inquiry; // 현재 선택된 문의 항목
  onChangeStatus: (status: Inquiry["status"]) => void; // 상태 변경 핸들러
  onClose: () => void; // 모달 닫기 핸들러
}

const InquiryStatusModal: React.FC<Props> = ({ target, onChangeStatus, onClose }) => {
  return (
    <Styled.ModalOverlay onClick={onClose}>
      <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>처리 상태 변경</h3>

        <p>
          <strong>현재 상태:</strong> {target.status}
        </p>

        <Styled.StatusBox>
          {["대기중", "처리중", "완료"].map((status) => (
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
