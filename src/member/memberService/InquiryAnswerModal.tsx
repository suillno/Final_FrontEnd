import React from "react";
import styled from "styled-components";
import { Inquiry } from "../../types/types";

// 모달 컴포넌트 props 타입 정의
interface Props {
  inquiry: Inquiry | null;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Box = styled.div`
  width: 90%;
  max-width: 500px;
  background: #1c1d23;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 2rem;
  color: #fff;
  position: relative;
`;

const Close = styled.button`
  position: absolute;
  top: 1rem;
  right: 1.2rem;
  background: none;
  border: none;
  color: #00eaff;
  font-size: 1.2rem;
  cursor: pointer;
`;

const InquiryAnswerModal: React.FC<Props> = ({ inquiry, onClose }) => {
  if (!inquiry) return null;

  return (
    <Overlay onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>✕</Close>
        <h3>{inquiry.category}</h3>
        <p style={{ margin: "1rem 0", whiteSpace: "pre-line" }}>
          {inquiry.content}
        </p>
        <hr style={{ borderColor: "#333" }} />
        <h4 style={{ marginTop: "1rem", color: "#11a57d" }}>관리자 답변</h4>
        <p style={{ marginTop: "1rem", whiteSpace: "pre-line" }}>
          {inquiry.answer || "아직 등록된 답변이 없습니다."}
        </p>
      </Box>
    </Overlay>
  );
};

export default InquiryAnswerModal;
