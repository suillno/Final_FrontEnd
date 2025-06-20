export interface Inquiry {
  id: number;
  status: "처리중" | "완료" | "대기";
  username: string;
  date: string;
  content: string;
}

export interface LayoutContext {
  isSidebarOpen: boolean;
}
