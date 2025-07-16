import React from "react";
import styled from "styled-components";
interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
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
  max-width: 360px;
  background: #1c1d23;
  border: 1px solid #333;
  border-radius: 10px;
  padding: 1.8rem;
  color: #fff;
  text-align: center;
`;

const BtnRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const Button = styled.button<{ $danger?: boolean }>`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  background: ${({ $danger }) => ($danger ? "#ff4d4f" : "#555")};
  color: #fff;
`;

const InquiryDeleteModal: React.FC<Props> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <Box onClick={(e) => e.stopPropagation()}>
        <p>정말로 문의를 삭제하시겠습니까?</p>
        <BtnRow>
          <Button $danger onClick={onConfirm}>
            삭제
          </Button>
          <Button onClick={onCancel}>취소</Button>
        </BtnRow>
      </Box>
    </Overlay>
  );
};

export default InquiryDeleteModal;
