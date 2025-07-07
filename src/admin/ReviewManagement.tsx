import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import * as Styled from "./reviewManagement/ReviewManagement.styles";
import { LayoutContext, Review } from "./reviewManagement/ReviewManagement.types";
import ReviewDetailModal from "./reviewManagement/ReviewDetailModal";
import axios from "axios";

// 페이지당 보여줄 리뷰 수
const ITEMS_PER_PAGE = 10;

const ReviewManagement: React.FC = () => {
  // 사이드바 열림 여부를 부모 Layout에서 받아옴
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 상태 변수 정의
  const [reviews, setReviews] = useState<Review[]>([]);         // 전체 리뷰 목록
  const [search, setSearch] = useState("");                     // 검색어
  const [currentPage, setCurrentPage] = useState(1);            // 현재 페이지
  const [selectedReview, setSelectedReview] = useState<Review | null>(null); // 선택된 리뷰 (모달용)

  // 컴포넌트 마운트 시 리뷰 목록을 API로부터 불러옴
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("/api/admin/reviews");
        setReviews(res.data); // 응답 받은 리뷰 데이터 저장
      } catch (error) {
        console.error("리뷰 목록 불러오기 실패:", error);
      }
    };
    fetchReviews();
  }, []);

  // 리뷰 삭제 함수 
  const handleDelete = async (reviewId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      // 🔹 서버에 DELETE 요청
      await axios.delete(`/api/admin/reviews/${reviewId}`);

      // 🔹 삭제 성공 시 프론트 목록에서 제거
      setReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));

      alert("삭제되었습니다.");
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };


  // 검색어 필터링
  const filtered = reviews.filter((r) =>
    (r.userName + r.gameTitle + r.content)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 파티클 애니메이션 초기화
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* 배경 애니메이션 효과 */}
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

      {/* 내부 컨텐츠 */}
      <Styled.InnerWrapper>
        {/* 페이지 타이틀 */}
        <Styled.Title style={{ marginTop: "100px" }}>리뷰 관리</Styled.Title>

        {/* 검색 입력창 */}
        <Styled.Controls>
          <Styled.SearchInput
            type="text"
            placeholder="유저 이름 / 게임 제목 / 내용 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // 검색 시 첫 페이지로 이동
            }}
            spellCheck={false}
          />
        </Styled.Controls>

        {/* 리뷰 테이블 */}
        <Styled.ReviewTable>
          <thead>
            <tr>
              <th>리뷰 ID</th>
              <th>유저 이름</th>
              <th>게임 제목</th>
              <th>내용</th>
              <th>기능</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((review) => (
              <tr key={review.reviewId}>
                <td>{review.reviewId}</td>
                <td>{review.userName}</td>
                <td>{review.gameTitle}</td>
                <td>
                  {/* 🔸 내용이 길면 30자까지만 보여주고 + 버튼 제공 */}
                  {review.content.length > 30 ? (
                    <>
                      {review.content.slice(0, 30)}...
                      <Styled.MoreButton onClick={() => setSelectedReview(review)}>
                        +
                      </Styled.MoreButton>
                    </>
                  ) : (
                    review.content
                  )}
                </td>
                <td>
                  <Styled.DeleteButton onClick={() => handleDelete(review.reviewId)}>
                    삭제
                  </Styled.DeleteButton>
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
