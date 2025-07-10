import { instanceBack } from "../../components/api/instance";

// 사용자 정보 타입 정의
export interface User {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  phone?: string;
  address?: string;
  createdAt?: string;
}

// [1] 사용자 전체 목록 조회
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await instanceBack.get("/member/vo-list");

    return response.data.map((user: any) => ({
      id: user.userId,
      username: user.username,
      email: user.email,
      role: user.role === "ROLE_ADMIN" ? "ADMIN" : "USER",
      status: user.active ? "ACTIVE" : "BANNED",
      createdAt: user.createdAt || "-",
    }));
  } catch (error) {
    console.error("유저 목록 조회 실패:", error);
    return [];
  }
};

// [2] 사용자 권한 변경 요청
export const updateUserRole = async (
  id: number,
  newRole: "USER" | "ADMIN"
): Promise<boolean> => {
  try {
    const payload = {
      userId: id,
      role: newRole,
    };

    await instanceBack.patch("/member/update-role", payload);

    return true;
  } catch (error) {
    console.error("권한 변경 실패:", error);
    return false;
  }
};

// [3] 사용자 상태 토글 요청
export const toggleUserStatus = async (id: number): Promise<boolean> => {
  try {
    await instanceBack.patch(`/member/toggle-status?userId=${id}`);
    return true;
  } catch (error) {
    console.error("상태 토글 실패:", error);
    return false;
  }
};
