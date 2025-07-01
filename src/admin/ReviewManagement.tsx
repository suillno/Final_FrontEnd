import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import * as Styled from "./reviewManagement/ReviewManagement.styles";
import { LayoutContext, Review } from "./reviewManagement/ReviewManagement.types";
import ReviewDetailModal from "./reviewManagement/ReviewDetailModal";

// 초기 리뷰 더미 데이터
const initialReviews: Review[] = [
  { id: 1, userId: "userA", gameTitle: "Elden Ring", content: "정말 재미있어요!", reportCount: 0 },
  { id: 2, userId: "userB", gameTitle: "GTA V", content: "욕설이 많아요", reportCount: 2 },
  { id: 3, userId: "userC", gameTitle: "Zelda", content: "역시 갓겜입니다.", reportCount: 0 },
  { id: 4, userId: "userD", gameTitle: "The Witcher 3", content: "버그 너무 많음", reportCount: 3 },
  { id: 5, userId: "userE", gameTitle: "Cyberpunk 2077", content: "최적화가 필요해요. 너무 무거움. 버그도 많고 고쳐야 될 점이 많습니다.", reportCount: 1 },
];

const ITEMS_PER_PAGE = 10; // 한 페이지에 보여줄 리뷰 수

const ReviewManagement: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>(); // 사이드바 열림 여부 가져오기

  // 상태값들 정의
  const [reviews, setReviews] = useState<Review[]>(initialReviews); // 전체 리뷰 목록
  const [search, setSearch] = useState(""); // 검색어
  const [filterReported, setFilterReported] = useState(false); // 신고된 리뷰만 보기 필터
  const [sortByReport, setSortByReport] = useState(false); // 신고 수 기준 정렬 여부
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // 상세보기용 선택된 리뷰

  // 리뷰 삭제 함수
  const handleDelete = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setReviews((prev) => prev.filter((review) => review.id !== id));
    }
  };

  // 필터링: 검색어 + 신고 여부 체크
  const filtered = reviews
    .filter((r) =>
      (r.userId + r.gameTitle + r.content).toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) => (filterReported ? r.reportCount > 0 : true));

  // 정렬: 신고 수 기준 내림차순 정렬
  const sorted = sortByReport
    ? [...filtered].sort((a, b) => b.reportCount - a.reportCount)
    : filtered;

  // 페이지네이션 처리
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 파티클 효과 초기화 함수
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* 파티클 배경 효과 */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#0e0f11" },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
          },
          particles: {
            color: { value: "#00eaff" },
            links: { enable: true, color: "#00eaff", distance: 120 },
            move: { enable: true, speed: 1.5 },
            number: { value: 40 },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
      />

      {/* 전체 콘텐츠 래퍼 */}
      <Styled.InnerWrapper>
        {/* 페이지 제목 */}
        <Styled.Title style={{ marginTop: "100px" }}>리뷰 관리</Styled.Title>

        {/* 검색 및 정렬, 필터 제어 영역 */}
        <Styled.Controls>
          {/* 검색 입력창 */}
          <Styled.SearchInput
            type="text"
            placeholder="유저ID / 게임제목 / 내용 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // 검색 시 페이지 초기화
            }}
            spellCheck={false}
          />

          {/* 신고 수 정렬 버튼 */}
          <Styled.SortButton onClick={() => setSortByReport((prev) => !prev)}>
            📊 신고순 {sortByReport ? "▲" : "▼"}
          </Styled.SortButton>

          {/* 신고된 리뷰만 보기 체크박스 */}
          <label>
            <input
              type="checkbox"
              checked={filterReported}
              onChange={() => setFilterReported(!filterReported)}
            />
            신고된 리뷰만 보기
          </label>
        </Styled.Controls>

        {/* 리뷰 테이블 */}
        <Styled.ReviewTable>
          <thead>
            <tr>
              <th>유저 ID</th>
              <th>게임 제목</th>
              <th>내용</th>
              <th>신고 수</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((review) => (
              <tr key={review.id}>
                <td>{review.userId}</td>
                <td>{review.gameTitle}</td>
                <td>
                  {/* 리뷰 내용이 길 경우 '+' 버튼으로 상세보기 모달 표시 */}
                  {review.content.length > 30 ? (
                    <>
                      {review.content.slice(0, 30)}...
                      <Styled.MoreButton onClick={() => setSelectedReview(review)}>+</Styled.MoreButton>
                    </>
                  ) : (
                    review.content
                  )}
                </td>
                <td>{review.reportCount}</td>
                <td>
                  <Styled.DeleteButton onClick={() => handleDelete(review.id)}>삭제</Styled.DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Styled.ReviewTable>

        {/* 페이지네이션 버튼 */}
        <Styled.Pagination>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </Styled.Pagination>
      </Styled.InnerWrapper>

      {/* 리뷰 상세 모달 */}
      {selectedReview && (
        <ReviewDetailModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}
    </Styled.Container>
  );
};

export default ReviewManagement;
