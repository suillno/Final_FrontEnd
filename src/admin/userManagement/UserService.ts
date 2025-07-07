import axios from "axios";

// 사용자 타입 정의 (UserVO와 매칭)
export interface User {
  id: number;                      // userId → id로 매핑
  username: string;
  email: string;
  role: "USER" | "ADMIN";          // ROLE_USER / ROLE_ADMIN → 변환 처리
  status: "ACTIVE" | "BANNED";     // active (true/false) → 변환
  phone?: string;                  // 프론트에서 별도 처리 (-)
  address?: string;                // 프론트에서 별도 처리 (-)
  createdAt?: string;              // 날짜 → 문자열 변환
}

// [1] 사용자 전체 목록 조회
export const getUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("/api/member/vo-list", 
    //   {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );

    // 백엔드에서 반환된 VO 기반 필드에 맞게 변환
    return response.data.map((user: any) => ({
      id: user.userId,  // 반드시 userId → id로 매핑
      username: user.username,
      email: user.email,
      role: user.role === "ROLE_ADMIN" ? "ADMIN" : "USER",
      status: user.active ? "ACTIVE" : "BANNED",
      phone: "-",       // 현재 VO에 없음 → 기본값 처리
      address: "-",     // 현재 VO에 없음 → 기본값 처리
      createdAt: user.createdAt || "-",
    }));
  } catch (error) {
    console.error("유저 목록 조회 실패:", error);
    return [];
  }
};

// [2] 유저 권한 변경 (ADMIN ↔ USER)
export const updateUserRole = async (id: number, newRole: "USER" | "ADMIN"): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const payload = {
      userId: id,
      role: newRole,
    };

    console.log("📤 권한 변경 요청:", payload);

    await axios.patch("/api/member/update-role", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        // Accept 제거
      },
    });

    return true;
  } catch (error) {
    console.error("❌ 권한 변경 실패:", error);
    return false;
  }
};



// [3] 유저 상태 토글 (ACTIVE ↔ BANNED)
export const toggleUserStatus = async (id: number): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(`/api/member/toggle-status/${id}`, null, {
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
