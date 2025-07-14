export interface Review {
  reviewId: number;     // 리뷰 ID
  userName: string;     // 유저 이름
  gameTitle: string;    // 게임 제목
  content: string;      // 리뷰 내용
}

export interface LayoutContext {
  isSidebarOpen: boolean;
}
