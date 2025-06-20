import React from "react";
import styled from "styled-components";
import { Review } from "./ReviewManagement.types";

interface Props {
  review: Review;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #2c2f36;
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  color: white;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const CloseButton = styled.button`
  margin-top: 1.5rem;
  background: #555;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const ReviewDetailModal: React.FC<Props> = ({ review, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>리뷰 상세 보기</h3>
        <p><strong>유저 ID:</strong> {review.userId}</p>
        <p><strong>게임 제목:</strong> {review.gameTitle}</p>
        <p><strong>내용:</strong> {review.content}</p>
        <p><strong>신고 수:</strong> {review.reportCount}</p>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalBox>
    </Overlay>
  );
};

export default ReviewDetailModal;
