import React, { useEffect, useState } from "react";
import {
  User,
  getUsers,
  updateUserRole,
  toggleUserStatus,
} from "./UserService";
import UserDetailModal from "./UserDetailModal";

// 한 페이지에 보여줄 유저 수
const USERS_PER_PAGE = 10;

const UserList: React.FC = () => {
  // 전체 유저 목록
  const [users, setUsers] = useState<User[]>([]);

  // 검색 필터가 적용된 유저 목록
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState("");

  // 모달로 보여줄 선택된 유저
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // 컴포넌트 마운트 시 유저 데이터 불러오기
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  // 검색어 변경 시 유저 목록 필터링
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // 검색 시 페이지를 1로 초기화
  }, [searchTerm, users]);

  // 페이지 계산
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

  // 정지/복구 상태 변경 함수
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
    <div className="text-white p-6">
      {/* 🔍 검색창 영역 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="  🔍 이름 또는 이메일로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg px-4 py-2 rounded-md text-black text-sm border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{
            backgroundColor: "#f1f1f1",
            height: "42px",
            marginBottom: "20px",
          }}
        />
      </div>

      {/* 👥 유저 카드 목록 */}
      <div className="space-y-6">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 border border-gray-600 rounded-xl p-6 bg-gray-800 shadow-md hover:shadow-xl transition"
          >
            {/* 👤 프로필 정보 */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-3xl" style={{ marginLeft: "20px" }}>
                👤
              </div>
              <div>
                <p className="font-bold text-lg">{user.username}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  가입일: {user.createdAt || "2024-01-01"}
                </p>
              </div>
            </div>

            {/* 🛡 상태 + 권한 뱃지 */}
            <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto h-full min-h-[100px]">
              <div className="flex gap-3">
                <span
                  className={`text-base font-semibold px-5 py-2 rounded-full flex items-center justify-center gap-2 ${
                    user.role === "ADMIN" ? "bg-blue-600" : "bg-gray-600"
                  }`}
                  style={{ minWidth: "100px", textAlign: "center" }}
                >
                  🛡 {user.role}
                </span>
                <span
                  className={`text-base font-semibold px-5 py-2 rounded-full flex items-center justify-center gap-2 ${
                    user.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
                  }`}
                  style={{ minWidth: "100px", textAlign: "center" }}
                >
                  {user.status === "ACTIVE" ? "✅ 활성" : "⛔ 정지"}
                </span>
              </div>
            </div>

            {/* 🔧 액션 버튼 */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-end w-full sm:w-auto">
              <button
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
                onClick={() =>
                  handleRoleChange(
                    user.id,
                    user.role === "ADMIN" ? "USER" : "ADMIN"
                  )
                }
              >
                🔄 권한 변경
              </button>
              <button
                className={`${
                  user.status === "ACTIVE"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } px-3 py-1 rounded text-sm`}
                onClick={() => handleStatusToggle(user.id)}
              >
                {user.status === "ACTIVE" ? "⛔ 정지" : "♻️ 복구"}
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-sm"
                onClick={() => setSelectedUser(user)}
              >
                🔍 상세보기
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 📄 페이지네이션 */}
      <div className="flex justify-center mt-10 space-x-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`min-w-[40px] px-4 py-2 rounded-md text-sm font-medium transition ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 🔍 상세보기 모달 */}
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default UserList;
