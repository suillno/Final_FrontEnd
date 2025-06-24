import React, { useEffect, useState } from "react";
import {
  User,
  getUsers,
  updateUserRole,
  toggleUserStatus,
} from "./UserService";
import UserDetailModal from "./UserDetailModal";

const USERS_PER_PAGE = 10;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
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
      {/* 🔍 검색 입력 */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
       <input 
          type="text"
          placeholder=" 이름 또는 이메일로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="transition-all duration-300 w-full sm:w-[240px] focus:w-[320px] max-w-full px-4 py-2 rounded-md text-sm text-white bg-[#2c2f36] border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 👥 유저 리스트 */}
      <div className="space-y-6">
        {currentUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-600 rounded-xl p-6 bg-gray-800 shadow-md hover:shadow-xl transition"
          >
            {/* 👤 유저 정보 */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-3xl ml-2">👤</div>
              <div>
                <p className="font-bold text-lg">{user.username}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  가입일: {user.createdAt || "2024-01-01"}
                </p>
              </div>
            </div>

            {/* 🛡 상태 뱃지 */}
            <div className="flex items-center justify-center w-full sm:w-auto min-h-[100px]">
              <div className="flex gap-3">
                <span
                  className={`text-base font-semibold px-5 py-2 rounded-full ${
                    user.role === "ADMIN" ? "bg-blue-600" : "bg-gray-600"
                  }`}
                  style={{ minWidth: "100px" }}
                >
                  🛡 {user.role}
                </span>
                <span
                  className={`text-base font-semibold px-5 py-2 rounded-full ${
                    user.status === "ACTIVE" ? "bg-green-600" : "bg-red-600"
                  }`}
                  style={{ minWidth: "100px" }}
                >
                  {user.status === "ACTIVE" ? "✅ 활성" : "⛔ 정지"}
                </span>
              </div>
            </div>

            {/* 🔧 유저 관리 버튼 */}
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

      {/* 🔍 유저 상세 모달 */}
      <UserDetailModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default UserList;
