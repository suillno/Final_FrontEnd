// 전체 API 응답 최상위 객체
export interface GameResponse {
  count: number; // 전체 게임 수
  next: string | null; // 다음 페이지 URL
  previous: string | null; // 이전 페이지 URL
  results: GameResult[]; // 실제 게임 데이터 리스트
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h1: string;
  noindex: boolean;
  nofollow: boolean;
  description: string;
  filters: any; // (필요시 상세 타입 가능)
  nofollow_collections: any[];
}

export const defaultGameResponse: GameResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  seo_title: "",
  seo_description: "",
  seo_keywords: "",
  seo_h1: "",
  noindex: false,
  nofollow: false,
  description: "",
  filters: null,
  nofollow_collections: [],
};

// 개별 게임 정보
export interface GameResult {
  id: number; // 게임 ID
  slug: string; // URL friendly ID
  name: string; // 게임 이름
  description: string;
  released: string; // 출시일 (YYYY-MM-DD)
  tba: boolean; // 출시일 미정 여부
  background_image: string; // 대표 이미지 URL
  rating: number; // 평균 유저 평점
  rating_top: number; // 최고 평점 (보통 5)
  ratings: Rating[]; // 평점 분포 (추천/비추천 등)
  ratings_count: number; // 전체 평점 개수
  reviews_text_count: number; // 리뷰 개수
  added: number; // RAWG에 추가된 수
  added_by_status: AddedByStatus; // 상태별 유저 수 (소유/플레이 등)
  metacritic: number | null; // 메타크리틱 점수
  playtime: number; // 플레이 타임 (시간 단위)
  suggestions_count: number; // 추천 게임 수
  updated: string; // 마지막 업데이트 일자
  user_game: null; // 사용자별 정보 (사용 안함)
  reviews_count: number; // 리뷰 수
  saturated_color: string; // 색상 (디자인용)
  dominant_color: string; // 색상 (디자인용)
  platforms: PlatformDetail[]; // 상세 플랫폼 정보
  parent_platforms: ParentPlatform[]; // 상위 플랫폼 분류 (PC, 콘솔 등)
  genres: Genre[]; // 장르 리스트
  stores: StoreWrapper[]; // 스토어 정보
  clip: null;
  tags: Tag[]; // 태그 리스트
  esrb_rating: ESRBRating; // ESRB 등급
  short_screenshots: Screenshot[]; // 스크린샷 리스트
  developers: Company[];
  publishers: Company[];
}

// 개별 게임 정보 기본값 설정
export const defaultGameResult: GameResult = {
  id: 0,
  slug: "",
  name: "",
  description: "",
  released: "",
  tba: false,
  background_image: "",
  rating: 0,
  rating_top: 0,
  ratings: [],
  ratings_count: 0,
  reviews_text_count: 0,
  added: 0,
  added_by_status: {
    yet: 0,
    owned: 0,
    beaten: 0,
    toplay: 0,
    dropped: 0,
    playing: 0,
  },
  metacritic: null,
  playtime: 0,
  suggestions_count: 0,
  updated: "",
  user_game: null,
  reviews_count: 0,
  saturated_color: "",
  dominant_color: "",
  platforms: [],
  parent_platforms: [],
  genres: [],
  stores: [],
  clip: null,
  tags: [],
  esrb_rating: {
    id: 0,
    name: "",
    slug: "",
  },
  short_screenshots: [],
  developers: [],
  publishers: [],
};

// 플랫폼 아이콘화
export const platformIcons: { [key: string]: string } = {
  pc: "PC",
  playstation4: "PS4",
  playstation5: "PS5",
  playstation: "PS",
  xboxone: "XONE",
  xbox: "XBOX",
  xboxseriesx: "XSERIES",
  nintendo: "NS",
  switch: "NS",
  ios: "iOS",
  android: "AOS",
  mac: "MAC",
  macintosh: "MACIN",
  macos: "MACOS",
  linux: "LINUX",
  web: "WEB",
};

// 등급정보 표기
export const EsrbNumbers: { [key: string]: string } = {
  Everyone: "All",
  "Everyone 10+": "10+",
  Teen: "13+",
  Mature: "17+",
  "Adults Only": "18+",
  "Rating Pending": "RP",
};

// 등급정보 아이콘 색상
export const EsrbColors: { [key: string]: string } = {
  Everyone: "#2ecc71",
  "Everyone 10+": "#27ae60",
  Teen: "#f1c40f",
  Mature: "#e74c3c",
  "Adults Only": "#c0392b",
  "Rating Pending": "#95a5a6",
};

// 플랫폼 아이콘 테두리 색상 (최적화 추천버전)
export const platformBorderColors: { [key: string]: string } = {
  pc: "#4a90e2", // 파란색 (Windows 블루)
  playstation4: "#003791", // PS4 블루
  playstation5: "#003791", // PS5 동일 계열 유지
  playstation: "#003791", // PS 공통 블루
  xboxone: "#107c10", // XBOX 그린
  xbox: "#107c10",
  xboxseriesx: "#107c10",
  nintendo: "#e60012", // 닌텐도 레드
  switch: "#e60012",
  ios: "#999999", // iOS 실버 계열
  android: "#3ddc84", // Android 그린
  mac: "#666666", // Mac 다크실버 계열
  macintosh: "#666666",
  macos: "#666666",
  linux: "#f5c71a", // Linux Tux 노란색
  web: "#3498db",
};

// 평점 상세 구조
export interface Rating {
  id: number;
  title: string; // 평점명 (Exceptional, Recommended 등)
  count: number; // 해당 평점 수
  percent: number; // 전체 대비 비율
}

// 유저 상태 (소유, 클리어 등)
export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

// 플랫폼 상세 정보 (플랫폼 별 출시일, 요구사양)
export interface PlatformDetail {
  platform: Platform;
  released_at: string;
  requirements_en?: Requirements; // 시스템 요구사항 (영문)
  requirements_ru?: Requirements; // 시스템 요구사항 (러시아어)
}

// 플랫폼 정보 (PC, PS5 등)
export interface Platform {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  year_end: number | null;
  year_start: number | null;
  games_count: number;
  image_background: string;
}

// 시스템 요구 사항 (문자열로 제공됨)
export interface Requirements {
  minimum: string;
  recommended?: string;
}

// 상위 플랫폼 (PC, Xbox, PlayStation 등)
export interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

// 장르 (RPG, Action 등)
export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

// 스토어 리스트 (Steam, PSN, Epic 등)
export interface StoreWrapper {
  id: number;
  store: Store;
}

// 스토어 상세 정보
export interface Store {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

// 태그 (멀티플레이, 싱글플레이 등)
export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

// ESRB 등급 (연령 제한 등)
export interface ESRBRating {
  id: number;
  name: string;
  slug: string;
}

// 스크린샷 정보
export interface Screenshot {
  id: number;
  image: string;
}

export interface Company {
  id: number;
  name: string;
  slug: string;
}

export interface developers {
  id: number;
  name: string;
  slug: string;
}

// Steam API 응답에서 사용하는 price_overview 객체 구조
export interface SteamPriceOverview {
  currency: string;
  initial: number;
  final: number;
  discount_percent: number;
}

// Steam API 단일 게임 가격 응답 구조
export interface SteamAppPriceData {
  success: boolean;
  data?: {
    is_free: boolean;
    price_overview?: SteamPriceOverview;
  };
}

// 개별 이미지 정보
export interface GameShortImg {
  id: number;
  image: string;
}

// API 응답 전체 구조
export interface GameShortImgResponse {
  results: GameShortImg[];
}

// 기본값
export const GameImgDefault: GameShortImgResponse = {
  results: [],
};

// Steam 전체 응답 타입 (appId가 동적으로 key로 사용됨)
export type SteamPriceResponse = Record<string, SteamAppPriceData>;

// 예시 초기값 (기본 응답 구조)
export const defaultSteamPriceResponse: SteamPriceResponse = {
  "0": {
    success: false,
    data: {
      is_free: false,
      price_overview: {
        currency: "KRW",
        initial: 0,
        final: 0,
        discount_percent: 0,
      },
    },
  },
};

export interface Inquiry {
  inquiryId: number;
  userId: number;
  username?: string;
  category: string;
  content: string;
  status: "대기중" | "처리중" | "완료";
  createdAt: string;
  updatedAt?: string;
  answer?: string | null;
}
