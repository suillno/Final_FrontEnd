// 사이드바 열림 여부를 전달받기 위한 Context 타입
export interface LayoutContext {
  isSidebarOpen: boolean;
}

// 요일 기준 데이터 (매출, 방문자수, 가입자수 등에 공통적으로 사용)
export interface DailyData {
  day: string;
  sales?: number;     // 매출
  visitors?: number;  // 방문자수
  count?: number;     // 가입자수
}

// 월별 매출 데이터 타입
export interface MonthlyData {
  month: string;
  sales: number;
}

// 오늘 및 누적 방문자수
export interface VisitorCount {
  today: number;
  total: number;
}
