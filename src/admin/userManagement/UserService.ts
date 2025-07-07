import axios from "axios";

// 사용자 정보 타입 정의 (UserVO와 매칭됨)
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

// 공통 토큰 추출 함수
const getAccessToken = () => {
  const tokenObj = localStorage.getItem("user");
  return tokenObj ? JSON.parse(tokenObj).accessToken : null;
};

// [1] 사용자 전체 목록 조회
export const getUsers = async (): Promise<User[]> => {
  try {
    const token = getAccessToken();

    const response = await axios.get("/api/member/vo-list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
export const updateUserRole = async (id: number, newRole: "USER" | "ADMIN"): Promise<boolean> => {
  try {
    const tokenObj = localStorage.getItem("user");
    const token = tokenObj ? JSON.parse(tokenObj).accessToken : null;

    const payload = {
      userId: id,
      role: newRole,
    };

    await axios.patch("/api/member/update-role", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return true;
  } catch (error) {
    console.error("권한 변경 실패:", error);
    return false;
  }
};


// [3] 사용자 상태 토글 요청
export const toggleUserStatus = async (id: number): Promise<boolean> => {
  try {
    const token = getAccessToken();

    await axios.patch(`/api/member/toggle-status?userId=${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    console.error("상태 토글 실패:", error);
    return false;
  }
};
