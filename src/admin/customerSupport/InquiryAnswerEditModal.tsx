import React, { useState } from "react";
import * as Styled from "./CustomerSupport.styles";
import { Inquiry } from "../../types/types";

// props 타입 정의
interface Props {
  target: Inquiry; // 선택된 문의 데이터
  onSubmit: (answer: string) => void; // 저장 시 콜백 함수
  onClose: () => void; // 닫기 함수
}

// 답변 등록 모달 컴포넌트
const InquiryAnswerEditModal: React.FC<Props> = ({
  target,
  onSubmit,
  onClose,
}) => {
  // 초기 답변값 세팅 (기존 답변이 있다면 반영)
  const [answer, setAnswer] = useState(target.answer || "");

  // 저장 버튼 클릭 시 실행
  const handleSave = () => {
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  return (
    <Styled.ModalOverlay onClick={onClose}>
      <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
        {/* 모달 제목 */}
        <h3>답변 등록 - {target.category}</h3>

        {/* 답변 입력 텍스트 영역 */}
        <Styled.TextArea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="답변 내용을 입력하세요"
          rows={6}
        />

        {/* 버튼 영역 */}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          {/* 저장 버튼 */}
          <Styled.SaveButton onClick={handleSave}>저장</Styled.SaveButton>

          {/* 닫기 버튼 */}
          <Styled.CloseButton onClick={onClose}>닫기</Styled.CloseButton>
        </div>
      </Styled.ModalBox>
    </Styled.ModalOverlay>
  );
};

export default InquiryAnswerEditModal;
