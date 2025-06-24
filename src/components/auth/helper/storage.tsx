// 사용자 정보 인터페이스 정의 (필요에 따라 확장 가능)
export interface User {
  id: number;
  username: string;
  role: number; // ex: 1 = system, 2 = admin, 3 = user
}

// 사용자 정보 저장
export const setCurrentUser = (user: User | null): void => {
  try {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  } catch (error) {
    console.log("스토리지 저장 오류", error);
  }
};

// 사용자 정보 제거
export const removeCurrentUser = (): void => {
  localStorage.removeItem("user");
};

// 사용자 정보 불러오기
export const getCurrentUser = (): User | null => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : null;
  } catch (error) {
    console.log("스토리지 로드 오류", error);
    return null;
  }
};
