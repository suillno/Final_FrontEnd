// 사이드바 열림 여부를 전달받기 위한 Context 타입
export interface LayoutContext {
  isSidebarOpen: boolean;
}

// 요일 기준 데이터 (방문자 수 전용으로 사용 중)
export interface DailyData {
  day: string;         // 요일 (예: "월", "화", ...)
  visitors: number;    // 해당 요일 방문자 수
  isToday?: boolean;   // 오늘 날짜인지 여부 (그래프 강조용)
}

// 오늘 및 누적 방문자 수
export interface VisitorCount {
  today: number;       // 오늘 방문자 수
  total: number;       // 총 방문자 수
}
