// userManagement/UserList.tsx
import React, { useEffect, useState } from "react";
import {
  User,
  getUsers,            // 사용자 목록 API 호출 함수
  updateUserRole,       // 사용자 권한 업데이트 API 함수
  toggleUserStatus,     // 사용자 상태 변경 API 함수
} from "./UserService";

import UserDetailModal from "./UserDetailModal"; // 사용자 상세정보 모달 컴포넌트
import styled, { keyframes } from "styled-components";

// 한 페이지에 보여줄 유저 수
const USERS_PER_PAGE = 10;

// 등장 시 위에서 아래로 부드럽게 나타나는 애니메이션 정의
const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 전체 wrapper: 컬럼 방향 정렬, 간격 설정
const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// 검색바 wrapper: 오른쪽 정렬
const SearchBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// 검색 input: 포커스 시 확장 및 테마 색상 적용
const SearchInput = styled.input`
  width: 240px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  background-color: #2c2f36;
  border: 1px solid #555;
  color: white;
  transition: 0.3s;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    width: 320px;
    background-color: #1e1f24;
    border-color: #4b7bec;
  }
`;

// 사용자 카드 리스트 wrapper
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// 개별 사용자 카드 컴포넌트
const UserCard = styled.div`
  background-color: #2b2e33;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #444;
  display: flex;
  flex-direction: column;
  animation: ${fadeSlideIn} 0.5s ease forwards;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(255, 255, 255, 0.05);
    transition: 0.3s;
  }
`;

// 사용자 정보 (아이콘, 이름, 이메일) 영역
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// 사용자 역할/상태 뱃지 스타일
const Badge = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-weight: bold;
  text-align: center;
`;

// 버튼 영역 wrapper
const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
`;

// 공통 버튼 스타일
const Button = styled.button<{ bg: string; hover: string }>`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  color: white;
  background-color: ${(props) => props.bg};
  transition: 0.2s;

  &:hover {
    background-color: ${(props) => props.hover};
  }
`;

// 페이지네이션 버튼 영역
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  button {
    padding: 0.5rem 1rem;
    background-color: #444;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;

    &.active {
      background-color: #00eaff;
    }

    &:hover {
      background-color: #555;
    }
  }
`;

// ===========================
// UserList 컴포넌트 시작
// ===========================
const UserList: React.FC = () => {
  // 전체 유저 목록
  const [users, setUsers] = useState<User[]>([]);

  // 검색어 필터링된 유저 목록
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");

  // 선택된 유저 정보 (모달 표시용)
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 컴포넌트 마운트 시 유저 목록 로딩
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  // 검색어 변경 시 필터링된 유저 목록 갱신
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // 검색 시 첫 페이지로 초기화
  }, [searchTerm, users]);

  // 페이지 수 계산
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  // 현재 페이지에 해당하는 유저만 슬라이싱
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // 권한 변경 이벤트 처리
  const handleRoleChange = async (id: number, newRole: "USER" | "ADMIN") => {
    const success = await updateUserRole(id, newRole);
    if (success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    }
  };

  // 상태 활성/정지 토글 처리
  const handleStatusToggle = async (id: number) => {
    const success = await toggleUserStatus(id);
    if (success) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                status: u.status === "ACTIVE" ? "BANNED" : "ACTIVE",
              }
            : u
        )
      );
    }
  };

  return (
    <Wrapper>
      {/* 검색창 */}
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="이름 또는 이메일 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          spellCheck={false}
        />
      </SearchBar>

      {/* 사용자 카드 리스트 */}
      <CardList>
        {currentUsers.map((user) => (
          <UserCard key={user.id}>
            <UserInfo>
              <div style={{ fontSize: "2rem" }}>👤</div>
              <div>
                <strong>{user.username}</strong>
                <div style={{ fontSize: "0.85rem", color: "#ccc" }}>
                  {user.email}
                </div>
              </div>
            </UserInfo>

            {/* 역할 및 상태 뱃지 */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Badge color={user.role === "ADMIN" ? "#3b82f6" : "#6b7280"}>
                🛡 {user.role}
              </Badge>
              <Badge color={user.status === "ACTIVE" ? "#10b981" : "#ef4444"}>
                {user.status === "ACTIVE" ? "✅ 활성" : "⛔ 정지"}
              </Badge>
            </div>

            {/* 버튼 영역: 권한변경 / 상태토글 / 상세보기 */}
            <ButtonGroup>
              <Button
                bg="#3b82f6"
                hover="#2563eb"
                onClick={() =>
                  handleRoleChange(
                    user.id,
                    user.role === "ADMIN" ? "USER" : "ADMIN"
                  )
                }
              >
                🔄 권한
              </Button>
              <Button
                bg={user.status === "ACTIVE" ? "#ef4444" : "#10b981"}
                hover={user.status === "ACTIVE" ? "#dc2626" : "#059669"}
                onClick={() => handleStatusToggle(user.id)}
              >
                {user.status === "ACTIVE" ? "⛔ 정지" : "♻️ 복구"}
              </Button>
              <Button
                bg="#6b7280"
                hover="#4b5563"
                onClick={() => setSelectedUser(user)}
              >
                🔍 상세
              </Button>
            </ButtonGroup>
          </UserCard>
        ))}
      </CardList>

      {/* 페이지네이션 */}
      <Pagination>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </Pagination>

      {/* 사용자 상세정보 모달 */}
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </Wrapper>
  );
};

export default UserList;
