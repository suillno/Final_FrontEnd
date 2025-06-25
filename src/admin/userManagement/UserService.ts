// ===== [1] 유저 인터페이스 정의 =====
export interface User {
  id: number;                        // 고유 식별자
  username: string;                 // 사용자명
  email: string;                    // 이메일
  role: "USER" | "ADMIN";           // 역할: 일반 or 관리자
  status: "ACTIVE" | "BANNED";      // 계정 상태: 활성 or 정지
  phone?: string;                   // 전화번호 (선택)
  address?: string;                 // 주소 (선택)
  createdAt?: string;               // 가입일 (선택)
}

// ===== [2] 더미 유저 데이터 생성 =====
const dummyUsers: User[] = Array.from({ length: 34 }, (_, i) => ({
  id: i + 1,
  username: `user${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 5 === 0 ? "ADMIN" : "USER",              // 5번째마다 관리자
  status: i % 4 === 0 ? "BANNED" : "ACTIVE",         // 4번째마다 정지
  phone: "010-1234-5678",
  address: "서울특별시 강남구",
  createdAt: `2024-06-${(i % 30 + 1).toString().padStart(2, "0")}`,
}));

// ===== [3] 유저 목록 조회 (비동기) =====
export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyUsers); // 0.5초 후 데이터 반환
    }, 500);
  });
};

// ===== [4] 유저 권한 변경 =====
export const updateUserRole = async (
  id: number,
  newRole: "USER" | "ADMIN"
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`🔁 권한 변경: ID ${id} → ${newRole}`);
      resolve(true);
    }, 300);
  });
};

// ===== [5] 유저 상태 토글 (정지/활성) =====
export const toggleUserStatus = async (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`⛔️ 상태 토글: ID ${id}`);
      resolve(true);
    }, 300);
  });
};
