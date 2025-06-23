// 유저 인터페이스 정의 (User 데이터의 타입 명세)
export interface User {
  id: number;                  // 고유 ID
  username: string;            // 사용자 이름
  email: string;               // 이메일
  role: "USER" | "ADMIN";      // 역할: 일반 사용자 또는 관리자
  status: "ACTIVE" | "BANNED"; // 계정 상태: 활성 또는 정지
  phone?: string;              // (선택) 전화번호
  address?: string;            // (선택) 주소
  createdAt?: string;          // (선택) 가입일
}

// 더미 유저 데이터 생성 (총 34명)
const dummyUsers: User[] = Array.from({ length: 34 }, (_, i) => ({
  id: i + 1, // ID는 1부터 시작
  username: `user${i + 1}`, // user1, user2, ...
  email: `user${i + 1}@example.com`,
  role: i % 5 === 0 ? "ADMIN" : "USER", // 5번째마다 관리자 권한 부여
  status: i % 4 === 0 ? "BANNED" : "ACTIVE", // 4번째마다 정지 처리
  createdAt: `2024-06-${(i % 30 + 1).toString().padStart(2, "0")}` // 날짜 형식 예시: 2024-06-01 ~ 2024-06-30
}));

// 유저 목록을 비동기적으로 가져오는 함수 (서버 통신 대체)
export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyUsers), 500); // 0.5초 후 데이터 반환 (API 흉내)
  });
};

// 유저의 역할(권한)을 변경하는 비동기 함수
export const updateUserRole = async (
  id: number,                 // 대상 유저 ID
  newRole: "USER" | "ADMIN"   // 변경할 역할
): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`🔁 권한 변경: ID ${id} → ${newRole}`); // 콘솔 로그로 동작 확인
      resolve(true); // 성공 처리
    }, 300); // 0.3초 후 완료
  });
};

// 유저의 상태를 토글하는 함수 (정지 ↔ 활성 전환)
export const toggleUserStatus = async (id: number): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`⛔️ 상태 토글: ID ${id}`); // 콘솔 로그
      resolve(true); // 상태 변경 성공
    }, 300); // 0.3초 대기 후 반환
  });
};
