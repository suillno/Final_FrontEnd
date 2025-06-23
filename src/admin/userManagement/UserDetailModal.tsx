import React from "react";
import styled from "styled-components";
import { User } from "./UserService";

// Props 타입 정의: 유저 정보(User)와 닫기 함수(onClose)를 받음
interface Props {
  user: User | null;
  onClose: () => void;
}

/* ===== 스타일 정의 (styled-components) ===== */

// 화면 전체를 덮는 어두운 배경 오버레이
const Overlay = styled.div`
  position: fixed;
  inset: 0; /* top, right, bottom, left 모두 0 */
  background: rgba(0, 0, 0, 0.6); /* 반투명 검정 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

// 모달 본체 (어두운 배경, 둥근 모서리, 그림자)
const ModalContainer = styled.div`
  background: #1f1f1f;
  color: #fff;
  width: 100%;
  max-width: 900px;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`;

// 상단 타이틀 영역
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #444;
  padding-bottom: 0.75rem;
`;

// 타이틀 텍스트
const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

// 상단 ✕ 닫기 버튼
const CloseIcon = styled.button`
  font-size: 1.2rem;
  color: #aaa;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #f87171; /* hover 시 붉은색 */
  }
`;

// 유저 정보 전체 리스트를 감싸는 컨테이너
const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1rem;
`;

// 각 유저 정보 라인 (레이블 + 값)
const InfoRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
`;

// 정보 항목 이름
const Label = styled.div`
  width: 120px;
  color: #aaa;
  font-weight: 500;
`;

// 정보 값
const Value = styled.div`
  font-weight: 600;
`;

// 권한 / 상태 등 배지 스타일
const Badge = styled.span<{ bg: string }>`
  background-color: ${({ bg }) => bg};
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: bold;
  font-size: 0.9rem;
  color: white;
`;

// 하단 버튼 영역 (닫기 버튼 전용)
const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #444;
`;

// 닫기 버튼
const CloseButton = styled.button`
  background-color: #3b82f6;
  color: #fff;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }
`;

/* ===== 컴포넌트 정의 ===== */
const UserDetailModal: React.FC<Props> = ({ user, onClose }) => {
  // 유저 정보가 없을 경우 렌더링하지 않음
  if (!user) return null;

  return (
    <Overlay>
      <ModalContainer>
        {/* 상단 헤더 */}
        <Header>
          <Title>👤 유저 상세 정보</Title>
          <CloseIcon onClick={onClose}>✕</CloseIcon>
        </Header>

        {/* 유저 정보 리스트 */}
        <InfoList>
          <InfoRow>
            <Label>ID</Label>
            <Value>{user.id}</Value>
          </InfoRow>
          <InfoRow>
            <Label>이름</Label>
            <Value>{user.username}</Value>
          </InfoRow>
          <InfoRow>
            <Label>이메일</Label>
            <Value>{user.email}</Value>
          </InfoRow>
          <InfoRow>
            <Label>권한</Label>
            <Badge bg={user.role === "ADMIN" ? "#2563eb" : "#666"}>
              🛡 {user.role}
            </Badge>
          </InfoRow>
          <InfoRow>
            <Label>상태</Label>
            <Badge bg={user.status === "ACTIVE" ? "#16a34a" : "#dc2626"}>
              {user.status === "ACTIVE" ? "✅ 활성" : "⛔ 정지"}
            </Badge>
          </InfoRow>
          <InfoRow>
            <Label>가입일</Label>
            <Value>{user.createdAt || "2024-01-01"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>전화번호</Label>
            <Value>{user.phone || "010-1234-5678"}</Value>
          </InfoRow>
          <InfoRow>
            <Label>주소</Label>
            <Value>{user.address || "서울특별시 강남구"}</Value>
          </InfoRow>
        </InfoList>

        {/* 하단 닫기 버튼 */}
        <Footer>
          <CloseButton onClick={onClose}>닫기</CloseButton>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

export default UserDetailModal;
