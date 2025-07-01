import React from "react";
import * as Styled from "./CustomerSupport.styles";

// 컴포넌트에 전달되는 props 정의
interface Props {
  content: string;       // 표시할 문의 내용 텍스트
  onClose: () => void;   // 모달 닫기 함수
}

// 문의 상세 내용을 보여주는 모달 컴포넌트
const InquiryViewModal: React.FC<Props> = ({ content, onClose }) => {
  return (
    // 모달 뒷배경 오버레이 (화면 전체를 어둡게 처리)
    // 오버레이를 클릭하면 모달을 닫음
    <Styled.ModalOverlay onClick={onClose}>
      {/* 모달 내용 박스 */}
      {/* 내부 박스 클릭 시 이벤트 전파를 막아 배경 클릭 이벤트가 실행되지 않도록 함 */}
      <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
        {/* 모달 상단 제목 */}
        <h3>문의 내용</h3>

        {/* 실제 문의 본문 내용 출력 */}
        <p>{content}</p>

        {/* 닫기 버튼 - 클릭 시 부모에서 전달받은 onClose 함수 실행 */}
        <Styled.CloseButton onClick={onClose}>닫기</Styled.CloseButton>
      </Styled.ModalBox>
    </Styled.ModalOverlay>
  );
};

export default InquiryViewModal;
