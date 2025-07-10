// userManagement/UserList.tsx
import React, { useEffect, useState } from "react";
import {
  User,
  getUsers,
  updateUserRole,
  toggleUserStatus,
} from "./UserService";
import UserDetailModal from "./UserDetailModal";
import styled, { keyframes } from "styled-components";

// 한 페이지당 보여줄 사용자 수
const USERS_PER_PAGE = 10;

// 등장 애니메이션 효과
const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 전체 wrapper
const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

// 타이틀 + 검색창 wrapper
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

// 타이틀 스타일
const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: #00eaff;
  text-align: center;
  text-shadow: 0 0 10px #00eaff88;
`;

// 검색창 wrapper
const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

// 검색 입력창 스타일
const SearchInput = styled.input`
  width: 250px;
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #1c1d23;
  color: white;
  transition: 0.3s ease;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: none;
    width: 300px;
    border-color: #00eaff;
    background-color: #0e0f11;
    box-shadow: 0 0 8px #00eaff88;
  }
`;

// 카드 리스트 wrapper
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// 유저 카드 스타일
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

// 유저 정보 영역
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// 뱃지 스타일
const Badge = styled.span<{ color: string }>`
  background-color: ${(props: { color: any }) => props.color};
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  font-weight: bold;
`;

// 버튼 그룹
const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
`;

// 버튼 스타일
const Button = styled.button<{ $bg: string; $hover: string }>`
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: none;
  font-size: 0.875rem;
  cursor: pointer;
  color: white;
  background-color: ${(props: { $bg: any }) => props.$bg};
  transition: 0.2s;

  &:hover {
    background-color: ${(props: { $hover: any }) => props.$hover};
  }
`;

// 페이지네이션
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

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then((data) => {
      const uniqueUsers = Array.from(
        new Map(data.map((u) => [u.id, u])).values()
      );
      setUsers(uniqueUsers);
      setFilteredUsers(uniqueUsers);
    });
  }, []);

  // 검색어 변경 시 필터링
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // 검색 시 첫 페이지로 초기화
  }, [searchTerm, users]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleRoleChange = async (id: number, newRole: "USER" | "ADMIN") => {
    const success = await updateUserRole(id, newRole);
    if (success) {
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
    }
  };

  const handleStatusToggle = async (id: number) => {
    const success = await toggleUserStatus(id);
    if (success) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? { ...u, status: u.status === "ACTIVE" ? "BANNED" : "ACTIVE" }
            : u
        )
      );
    }
  };

  return (
    <Wrapper>
      {/* 타이틀 + 검색창 */}
      <HeaderWrapper>
        <Title>회원 관리</Title>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="이름 또는 이메일 검색"
            value={searchTerm}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
      </HeaderWrapper>

      {/* 사용자 카드 리스트 */}
      <CardList>
        {currentUsers.map((user) => (
          <UserCard key={`user-${user.id}`}>
            <UserInfo>
              <div style={{ fontSize: "2rem" }}>👤</div>
              <div>
                <strong>{user.username}</strong>
                <div style={{ fontSize: "0.85rem", color: "#ccc" }}>
                  {user.email}
                </div>
              </div>
            </UserInfo>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Badge color={user.role === "ADMIN" ? "#3b82f6" : "#6b7280"}>
                🛡 {user.role}
              </Badge>
              <Badge color={user.status === "ACTIVE" ? "#10b981" : "#ef4444"}>
                {user.status === "ACTIVE" ? "✅ 활성" : "⛔ 정지"}
              </Badge>
            </div>

            <ButtonGroup>
              <Button
                $bg="#3b82f6"
                $hover="#2563eb"
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
                $bg={user.status === "ACTIVE" ? "#ef4444" : "#10b981"}
                $hover={user.status === "ACTIVE" ? "#dc2626" : "#059669"}
                onClick={() => handleStatusToggle(user.id)}
              >
                {user.status === "ACTIVE" ? "⛔ 정지" : "♻️ 복구"}
              </Button>
              <Button
                $bg="#6b7280"
                $hover="#4b5563"
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
            key={`page-${i + 1}`}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </Pagination>

      {/* 상세 모달 */}
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </Wrapper>
  );
};

export default UserList;
