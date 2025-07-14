import React from "react";
import * as Styled from "./CustomerSupport.styles";
import { Inquiry } from "./CustomerSupport.types";

// props로 전달받는 타입 정의
interface Props {
  target: Inquiry; // 상태를 변경할 대상 문의 객체
  onChangeStatus: (status: Inquiry["status"]) => void; // 상태 변경 핸들러 함수
  onClose: () => void; // 모달 닫기 함수
}

// 문의 상태 변경을 위한 모달 컴포넌트
const InquiryStatusModal: React.FC<Props> = ({ target, onChangeStatus, onClose }) => {
  return (
    // 모달 뒷배경 오버레이 (클릭 시 모달 닫기)
    <Styled.ModalOverlay onClick={onClose}>
      {/* 모달 본문 영역 - 클릭 이벤트 버블링 막아 닫힘 방지 */}
      <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
        {/* 모달 제목 */}
        <h3>처리 상태 변경</h3>

        {/* 현재 문의 상태 출력 */}
        <p>
          <strong>현재 상태:</strong> {target.status}
        </p>

        {/* 상태 선택 버튼들 */}
        <Styled.StatusBox>
          {["대기", "처리중", "완료"].map((status) => (
            <Styled.StatusButton
              key={status}
              // 선택한 상태로 변경 요청
              onClick={() => onChangeStatus(status as Inquiry["status"])}
              // 현재 상태와 동일한 버튼에 active 클래스 부여
              className={target.status === status ? "active" : ""}
            >
              {status}
            </Styled.StatusButton>
          ))}
        </Styled.StatusBox>

        {/* 닫기 버튼 */}
        <Styled.CloseButton onClick={onClose}>닫기</Styled.CloseButton>
      </Styled.ModalBox>
    </Styled.ModalOverlay>
  );
};

export default InquiryStatusModal;
