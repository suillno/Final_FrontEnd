export interface InquiryForm {
  game: string;         // 게임 제목 (검색용)
  title: string;        // 문의 제목
  content: string;      // 문의 내용
  gameId: number | null; // 게임 ID (DB에 저장용)
}
