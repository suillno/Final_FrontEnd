export interface Review {
  id: number;
  userId: string;
  gameTitle: string;
  content: string;
  reportCount: number;
}

export interface LayoutContext {
  isSidebarOpen: boolean;
}
