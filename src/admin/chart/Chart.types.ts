/* 사이드바 열림 여부를 공유하기 위한 Context */
export interface LayoutContext {
  isSidebarOpen: boolean;
}

/* 요일 단위 데이터 (방문자・가입자 공용으로 사용) */
export interface DailyData {
  day: string; // 요일 정보 ('월', '화', ...)
  visitors?: number; // 일별 방문자 수 (방문자 차트용, optional)
  signups?: number; // 일별 신규 가입자 수 (가입자 차트용, optional)
  isToday?: boolean; // 오늘 날짜 여부 (차트에서 강조용)
}

/* 방문자 요약 정보 (카운트) */
export interface VisitorCount {
  today: number; // 오늘 방문자 수
  total: number; // 최근 7일 누적 방문자 수
}

/* 신규 가입자 요약 정보 (카운트) */
export interface SignupCount {
  today: number; // 오늘 가입자 수
  total: number; // 최근 7일 누적 가입자 수
}

/* 신규 가입자 차트용 데이터 */
export interface SignupData {
  day: string; // 요일
  signups: number; // 가입자 수
}

/* 매출 차트용 데이터 11*/
export interface RevenueData {
  day: string; // 요일
  amount: number; // 매출액
}
