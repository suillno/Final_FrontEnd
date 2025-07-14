/* 사이드바 열림 여부를 공유하기 위한 Context */
export interface LayoutContext {
  isSidebarOpen: boolean;
}

/* 요일 단위 데이터 (방문자・가입자 공용) */
export interface DailyData {
  day: string; // 요일 (월, 화, … 또는 일)
  visitors?: number; // 일별 방문자 수
  signups?: number; // 일별 신규 가입자 수
  isToday?: boolean; // 오늘 날짜 여부 (그래프 강조용)
}

/* 방문자 요약 정보 */
export interface VisitorCount {
  today: number; // 오늘 방문자 수
  total: number; // 최근 7일 누적 방문자 수
}

/* 신규 가입자 요약 정보 */
export interface SignupCount {
  today: number; // 오늘 가입자 수
  total: number; // 최근 7일 누적 가입자 수
}

/* 일별 신규 가입자 차트용 데이터 */
export interface SignupData {
  day: string;
  signups: number;
}
