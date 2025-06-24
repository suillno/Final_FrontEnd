// UserList.tsx
import React, { useEffect, useState } from "react";
import {
  User,
  getUsers,
  updateUserRole,
  toggleUserStatus,
} from "./UserService";
import UserDetailModal from "./UserDetailModal";
import styled, { keyframes } from "styled-components";

const USERS_PER_PAGE = 10; // 한 페이지당 유저 수 설정

// ========== 애니메이션 정의 ========== //
// 카드가 등장할 때 아래에서 위로 올라오며 페이드인
const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ========== 스타일 컴포넌트 정의 ========== //

// 전체 페이지 감싸는 컨테이너
const PageWrapper = styled.div`
  color: white;
  padding: 2rem;
`;

// 검색 인풋 필드 스타일
const SearchInput = styled.input`
  transition: all 0.3s ease;
  width: 240px;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  color: white;
  background-color: #2c2f36;
  border: 1px solid #555;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    width: 320px;
    background-color: #1e1f24;
    border-color: #4b7bec;
  }
`;

// 유저 카드 스타일 (유저별 정보 박스)
const UserCard = styled.div`
  background-color: #2b2e33;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #444;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${fadeSlideIn} 0.5s ease forwards;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 255, 255, 0.08);
    transition: all 0.3s ease;
  }

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

// 역할/상태 뱃지
const Badge = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
`;

// 공통 버튼 스타일
const Button = styled.button`
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease;

  &.blue {
    background-color: #3b82f6;
    &:hover {
      background-color: #2563eb;
    }
  }
  &.red {
    background-color: #ef4444;
    &:hover {
      background-color: #dc2626;
    }
  }
  &.green {
    background-color: #10b981;
    &:hover {
      background-color: #059669;
    }
  }
  &.gray {
    background-color: #6b7280;
    &:hover {
      background-color: #4b5563;
    }
  }
`;

// 페이지네이션 버튼 스타일
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    background-color: #444;
    color: white;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s ease;

    &.active {
      background-color: #4b7bec;
    }

    &:hover {
      background-color: #555;
    }
  }
`;

// ========== 메인 컴포넌트 ========== //
const UserList: React.FC = () => {
  // 전체 유저 데이터
  const [users, setUsers] = useState<User[]>([]);
  // 필터링된 유저 목록
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");
  // 선택된 유저 (상세보기용)
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 유저 목록 초기 로딩
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  // 검색어에 따라 필터링 적용
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // 검색 시 페이지 초기화
  }, [searchTerm, users]);

  // 현재 페이지의 유저만 잘라서 표시
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // 권한 변경 처리 함수
  const handleRoleChange = async (id: number, newRole: "USER" | "ADMIN") => {
    const success = await updateUserRole(id, newRole);
    if (success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    }
  };

  // 계정 활성/정지 토글 함수
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
    <PageWrapper>
      {/* 검색 인풋 */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SearchInput
          type="text"
          placeholder=" 이름 또는 이메일로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* 👥 유저 리스트 */}
      <div className="space-y-6">
        {currentUsers.map((user) => (
          <UserCard key={user.id}>
            {/* 유저 기본 정보 */}
            <div className="flex items-center gap-4">
              <div className="text-3xl">👤</div>
              <div>
                <p className="font-bold text-lg">{user.username}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  가입일: {user.createdAt || "2024-01-01"}
                </p>
              </div>
            </div>

            {/* 역할 / 상태 뱃지 */}
            <div className="flex gap-3">
              <Badge color={user.role === "ADMIN" ? "#3b82f6" : "#6b7280"}>
                🛡 {user.role}
              </Badge>
              <Badge color={user.status === "ACTIVE" ? "#10b981" : "#ef4444"}>
                {user.status === "ACTIVE" ? "✅ 활성" : "⛔ 정지"}
              </Badge>
            </div>

            {/* 조작 버튼 */}
            <div className="flex gap-2 flex-wrap justify-end">
              <Button
                className="blue"
                onClick={() =>
                  handleRoleChange(
                    user.id,
                    user.role === "ADMIN" ? "USER" : "ADMIN"
                  )
                }
              >
                🔄 권한 변경
              </Button>
              <Button
                className={user.status === "ACTIVE" ? "red" : "green"}
                onClick={() => handleStatusToggle(user.id)}
              >
                {user.status === "ACTIVE" ? "⛔ 정지" : "♻️ 복구"}
              </Button>
              <Button className="gray" onClick={() => setSelectedUser(user)}>
                🔍 상세보기
              </Button>
            </div>
          </UserCard>
        ))}
      </div>

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

      {/* 유저 상세보기 모달 */}
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </PageWrapper>
  );
};

export default UserList;
