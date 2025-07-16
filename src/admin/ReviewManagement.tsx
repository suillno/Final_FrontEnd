import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import * as Styled from "./reviewManagement/ReviewManagement.styles";
import {
  LayoutContext,
  Review,
} from "./reviewManagement/ReviewManagement.types";
import ReviewDetailModal from "./reviewManagement/ReviewDetailModal";
import { instanceBack } from "../components/api/instance";

const ITEMS_PER_PAGE = 10;

const ReviewManagement: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await instanceBack.get("/admin/reviews");
        setReviews(res.data);
      } catch (error) {
        console.error("리뷰 목록 불러오기 실패:", error);
      }
    };
    fetchReviews();
  }, []);

  const filtered = reviews.filter((r) =>
    (r.userName + r.gameTitle + r.content)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSelectAll = (checked: boolean) => {
    const pageIds = paginated.map((r) => r.reviewId);
    setSelectedIds((prev) =>
      checked
        ? Array.from(new Set([...prev, ...pageIds]))
        : prev.filter((id) => !pageIds.includes(id))
    );
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedIds) {
        await instanceBack.delete(`/admin/reviews/${id}`);
      }
      setReviews((prev) =>
        prev.filter((r) => !selectedIds.includes(r.reviewId))
      );
      setSelectedIds([]);
      setShowConfirm(false);
      alert("삭제가 완료되었습니다.");
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <>
      {/* 전체화면 파티클 */}
      <Styled.ParticleWrapper>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            background: { color: "transparent" },
            fpsLimit: 60,
            particles: {
              number: { value: 50, density: { enable: true, area: 800 } },
              color: { value: "#00eaff" },
              shape: { type: "circle" },
              opacity: { value: 0.5 },
              size: { value: { min: 1, max: 3 } },
              links: {
                enable: true,
                distance: 120,
                color: "#00eaff",
                opacity: 0.4,
              },
              move: {
                enable: true,
                speed: 1.2,
                direction: "none",
                outModes: { default: "bounce" },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
              },
            },
            detectRetina: true,
          }}
        />
      </Styled.ParticleWrapper>

      {/* 콘텐츠 */}
      <Styled.Container $isSidebarOpen={isSidebarOpen}>
        <Styled.InnerWrapper>
          <Styled.Title style={{ marginTop: "100px" }}>리뷰 관리</Styled.Title>

          <Styled.Controls>
            <Styled.SearchInput
              type="text"
              placeholder="유저 이름 / 게임 제목 / 내용 검색"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {selectedIds.length > 0 && (
              <Styled.DeleteButton onClick={() => setShowConfirm(true)}>
                선택 삭제 ({selectedIds.length})
              </Styled.DeleteButton>
            )}
          </Styled.Controls>

          <Styled.ReviewTable>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={paginated.every((r) =>
                      selectedIds.includes(r.reviewId)
                    )}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th>유저 이름</th>
                <th>게임 제목</th>
                <th>내용</th>
                <th>기능</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((review) => (
                <tr key={review.reviewId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(review.reviewId)}
                      onChange={(e) =>
                        handleCheckboxChange(review.reviewId, e.target.checked)
                      }
                    />
                  </td>
                  <td>{review.userName}</td>
                  <td>{review.gameTitle}</td>
                  <Styled.ContentCell>
                    {review.content.length > 30 ? (
                      <>
                        {review.content.slice(0, 30)}...
                        <Styled.MoreButton
                          onClick={() => setSelectedReview(review)}
                        >
                          +
                        </Styled.MoreButton>
                      </>
                    ) : (
                      review.content
                    )}
                  </Styled.ContentCell>
                  <td>
                    <Styled.DeleteButton
                      onClick={() => {
                        setSelectedIds([review.reviewId]);
                        setShowConfirm(true);
                      }}
                    >
                      삭제
                    </Styled.DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Styled.ReviewTable>

          <Styled.Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </Styled.Pagination>
        </Styled.InnerWrapper>

        {/* 상세 모달 */}
        {selectedReview && (
          <ReviewDetailModal
            review={selectedReview}
            onClose={() => setSelectedReview(null)}
          />
        )}

        {/* 삭제 확인 모달 */}
        {showConfirm && (
          <Styled.Overlay onClick={() => setShowConfirm(false)}>
            <Styled.ConfirmBox onClick={(e) => e.stopPropagation()}>
              <p>총 {selectedIds.length}개 리뷰를 삭제하시겠습니까?</p>
              <div className="actions">
                <button
                  className="cancel"
                  onClick={() => setShowConfirm(false)}
                >
                  취소
                </button>
                <button className="delete" onClick={handleDeleteSelected}>
                  삭제
                </button>
              </div>
            </Styled.ConfirmBox>
          </Styled.Overlay>
        )}
      </Styled.Container>
    </>
  );
};

export default ReviewManagement;
