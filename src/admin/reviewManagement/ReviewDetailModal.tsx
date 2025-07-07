import React from "react";
import styled from "styled-components";
import { Review } from "./ReviewManagement.types";

// 컴포넌트에 전달되는 props 타입 정의
interface Props {
  review: Review;       // 선택된 리뷰 객체
  onClose: () => void;  // 모달을 닫는 함수
}

// 모달 전체를 덮는 어두운 배경 오버레이 스타일
const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.6); // 반투명 블랙
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // 다른 요소 위에 표시
`;

// 모달 박스 본체 스타일
const ModalBox = styled.div`
  background: #2c2f36;        // 다크 테마 배경
  padding: 2rem;              // 내부 여백
  border-radius: 10px;        // 모서리 둥글게
  width: 400px;
  color: white;
  text-align: center;

  h3 {
    margin-bottom: 1rem;      // 제목과 내용 사이 간격
  }

  p {
    margin: 0.5rem 0;         // 문단 간 여백
  }
`;

// 닫기 버튼 스타일
const CloseButton = styled.button`
  margin-top: 1.5rem;
  background: #555;           // 중간 회색 배경
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #666;         // 호버 시 약간 더 밝은 회색
  }
`;

// 리뷰 상세 정보를 보여주는 모달 컴포넌트
const ReviewDetailModal: React.FC<Props> = ({ review, onClose }) => {
  return (
    // 배경 클릭 시 모달 닫기
    <Overlay onClick={onClose}>
      {/* 모달 내용 영역 클릭 시 닫힘 방지 */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>리뷰 상세 보기</h3>
        <p><strong>유저 ID:</strong> {review.reviewId}</p>
        <p><strong>게임 제목:</strong> {review.gameTitle}</p>
        <p><strong>내용:</strong> {review.content}</p>
        {/* 닫기 버튼 */}
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalBox>
    </Overlay>
  );
};

export default ReviewDetailModal;
