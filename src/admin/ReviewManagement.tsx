import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import * as Styled from "./reviewManagement/ReviewManagement.styles";
import { LayoutContext, Review } from "./reviewManagement/ReviewManagement.types";
import ReviewDetailModal from "./reviewManagement/ReviewDetailModal";

const initialReviews: Review[] = [
  { id: 1, userId: "userA", gameTitle: "Elden Ring", content: "정말 재미있어요!", reportCount: 0 },
  { id: 2, userId: "userB", gameTitle: "GTA V", content: "욕설이 많아요", reportCount: 2 },
  { id: 3, userId: "userC", gameTitle: "Zelda", content: "역시 갓겜입니다.", reportCount: 0 },
  { id: 4, userId: "userD", gameTitle: "The Witcher 3", content: "버그 너무 많음", reportCount: 3 },
  { id: 5, userId: "userE", gameTitle: "Cyberpunk 2077", content: "최적화가 필요해요. 너무 무거움. 버그도 많고 고쳐야 될 점이 많습니다.", reportCount: 1 },
];

const ITEMS_PER_PAGE = 10;

const ReviewManagement: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [search, setSearch] = useState("");
  const [filterReported, setFilterReported] = useState(false);
  const [sortByReport, setSortByReport] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setReviews((prev) => prev.filter((review) => review.id !== id));
    }
  };

  const filtered = reviews
    .filter((r) =>
      (r.userId + r.gameTitle + r.content).toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) => (filterReported ? r.reportCount > 0 : true));

  const sorted = sortByReport
    ? [...filtered].sort((a, b) => b.reportCount - a.reportCount)
    : filtered;

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Styled.Container isSidebarOpen={isSidebarOpen}>
      <Styled.InnerWrapper>
        <Styled.Title style={{ marginTop: "100px" }}>리뷰 관리</Styled.Title>

        <Styled.Controls>
          <Styled.SearchInput
            type="text"
            placeholder="검색 유저ID 게임제목"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            spellCheck={false}
          />
          <Styled.SortButton onClick={() => setSortByReport((prev) => !prev)}>
            신고순 정렬 {sortByReport ? "▲" : "▼"}
          </Styled.SortButton>
          <label>
            <input
              type="checkbox"
              checked={filterReported}
              onChange={() => setFilterReported(!filterReported)}
            />
            신고된 리뷰만 보기
          </label>
        </Styled.Controls>

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

      {selectedReview && (
        <ReviewDetailModal review={selectedReview} onClose={() => setSelectedReview(null)} />
      )}
    </Styled.Container>
  );
};

export default ReviewManagement;
