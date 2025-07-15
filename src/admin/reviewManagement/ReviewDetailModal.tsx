/**
 * 리뷰 상세 내용을 보여주는 모달 컴포넌트
 */
import React from "react";
import styled from "styled-components";
import { Review } from "./ReviewManagement.types";

/* ────────────── 스타일 정의 ────────────── */
// 배경 오버레이
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 본체
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

  @media (max-width: 480px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

// 닫기 버튼
const CloseButton = styled.button`
  margin-top: 1.5rem;
  background: #555;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #666;
  }
`;

/* ────────────── 컴포넌트 ────────────── */
interface Props {
  review: Review;
  onClose: () => void;
}

const ReviewDetailModal: React.FC<Props> = ({ review, onClose }) => (
  <Overlay onClick={onClose}>
    {/* 모달 영역 클릭 시 닫힘 방지 */}
    <ModalBox onClick={(e) => e.stopPropagation()}>
      <h3>리뷰 상세 보기</h3>
      <p>
        <strong>리뷰&nbsp;ID:</strong> {review.reviewId}
      </p>
      <p>
        <strong>게임&nbsp;제목:</strong> {review.gameTitle}
      </p>
      <p>
        <strong>내용:</strong> {review.content}
      </p>
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalBox>
  </Overlay>
);

export default ReviewDetailModal;
