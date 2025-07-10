export interface Inquiry {
  id: number;                  // INQUIRY_ID
  userId: number;              // USER_ID
  username: string;            // 사용자 이름 (프론트에서 매핑용)
  category: string;            // CATEGORY
  content: string;             // CONTENT
  status: "대기중" | "처리중" | "완료"; // STATUS
  createdAt: string;           // CREATED_AT
  updatedAt?: string;          // UPDATED_AT (선택적)
}

export interface LayoutContext {
  isSidebarOpen: boolean;
}

