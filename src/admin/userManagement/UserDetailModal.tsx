import React from "react";
import styled from "styled-components";
import { User } from "./UserService";

// =======================
// 스타일 컴포넌트 정의
// =======================

/**
 * 모달의 배경 오버레이
 * 클릭 시 모달을 닫을 수 있도록 전체 화면을 덮는 반투명한 배경
 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // 어두운 반투명 배경
  z-index: 999; // 모달보다 한 단계 아래 레이어
`;

/**
 * 모달 내용 박스
 * 화면 중앙에 고정되며, 다크 테마 배경 및 그림자 처리 포함
 */
const ModalBox = styled.div`
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%); // 정확한 중앙 정렬
  background: #2b2e33;             // 다크 배경
  border: 1px solid #444;          // 외곽 테두리
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  z-index: 1000;                   // 오버레이 위에 위치
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6); // 그림자 효과
`;

/**
 * 모달 닫기 버튼
 * 오른쪽 상단에 위치하며 마우스 오버 시 색상 강조
 */
const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: transparent;
  color: #aaa;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

/**
 * 사용자 정보를 행 단위로 나열하기 위한 컨테이너
 * 각 항목은 라벨(굵은 글씨)과 값으로 구성됨
 */
const InfoRow = styled.div`
  margin-bottom: 1rem;
  color: white;
  font-size: 0.95rem;

  span {
    font-weight: bold;
    color: #00eaff;
    margin-right: 0.5rem;
  }
`;

// =======================
// 컴포넌트 정의
// =======================

/**
 * Props 타입 정의
 * - user: 선택된 사용자 정보 (null일 수 있음)
 * - onClose: 모달 닫기 이벤트 핸들러
 */
interface Props {
  user: User | null;
  onClose: () => void;
}

/**
 * 유저 상세 정보를 표시하는 모달 컴포넌트
 * props로 전달받은 user 객체가 존재할 경우만 렌더링됨
 */
const UserDetailModal: React.FC<Props> = ({ user, onClose }) => {
  // 유저 정보가 없으면 아무것도 렌더링하지 않음
  if (!user) return null;

  return (
    <>
      {/* 배경 오버레이 클릭 시 모달 닫기 */}
      <ModalOverlay onClick={onClose} />

      {/* 모달 내용 상자 */}
      <ModalBox onClick={(e) => e.stopPropagation()}>
        {/* 상단 제목 */}
        <CloseButton onClick={onClose}>✖</CloseButton>
        <h2 style={{ color: "#00eaff", marginBottom: "1.5rem" }}>
          👤 유저 상세 정보
        </h2>

        {/* 각 항목별 사용자 정보 출력 */}
        <InfoRow><span>ID:</span>{user.id}</InfoRow>
        <InfoRow><span>이름:</span>{user.username}</InfoRow>
        <InfoRow><span>이메일:</span>{user.email}</InfoRow>
        <InfoRow><span>권한:</span>{user.role}</InfoRow>
        <InfoRow>
          <span>상태:</span>
          {user.status === "ACTIVE" ? "✅ 활성" : "⛔ 정지"}
        </InfoRow>
        <InfoRow><span>전화번호:</span>{user.phone || "없음"}</InfoRow>
        <InfoRow><span>주소:</span>{user.address || "없음"}</InfoRow>
        <InfoRow><span>가입일:</span>{user.createdAt || "N/A"}</InfoRow>
      </ModalBox>
    </>
  );
};

export default UserDetailModal;
