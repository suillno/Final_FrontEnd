// ReviewManagement.tsx - 관리자 리뷰 관리 페이지
// 전체 리뷰 목록 조회, 검색, 체크박스 일괄 선택/삭제, 모달 상세보기, 페이징 처리 포함

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

// 페이지당 리뷰 수
const ITEMS_PER_PAGE = 10;

const ReviewManagement: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 전체 리뷰 목록
  const [reviews, setReviews] = useState<Review[]>([]);

  // 검색어
  const [search, setSearch] = useState("");

  // 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  // 리뷰 상세 모달에서 표시할 리뷰
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // 체크된 리뷰 ID 목록
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 삭제 확인 모달 표시 여부
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔸 리뷰 목록 조회 (최초 1회 실행)
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

  // 🔸 선택된 리뷰 일괄 삭제 처리
  const handleDeleteSelected = async () => {
    try {
      // 선택된 ID마다 DELETE 요청 전송
      for (const id of selectedIds) {
        await instanceBack.delete(`/admin/reviews/${id}`);
      }

      // 삭제된 항목은 state에서도 제거
      setReviews((prev) =>
        prev.filter((r) => !selectedIds.includes(r.reviewId))
      );

      // 상태 초기화
      setSelectedIds([]);
      setShowConfirm(false);
      alert("삭제가 완료되었습니다.");
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 🔸 현재 페이지 리뷰 ID 전체 선택 / 해제
  const handleSelectAll = (checked: boolean) => {
    const pageIds = paginated.map((r) => r.reviewId);
    setSelectedIds((prev) => {
      if (checked) {
        // 중복 없이 결합
        const combined = [...prev, ...pageIds];
        const unique: number[] = [];
        for (const id of combined) {
          if (!unique.includes(id)) unique.push(id);
        }
        return unique;
      } else {
        // 현재 페이지 ID만 제거
        return prev.filter((id) => !pageIds.includes(id));
      }
    });
  };

  // 🔸 개별 리뷰 체크/해제
  const handleCheckboxChange = (id: number, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  // 🔸 검색 필터링
  const filtered = reviews.filter((r) =>
    (r.userName + r.gameTitle + r.content)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // 🔸 페이지네이션 계산
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 🔸 파티클 배경 초기화
  const particlesInit = async (engine: any) => await loadSlim(engine);

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* 배경 애니메이션 */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#0e0f11" },
          particles: {
            color: { value: "#00eaff" },
            links: { enable: true, distance: 120, color: "#00eaff" },
            move: { enable: true, speed: 1.5 },
            number: { value: 40 },
            opacity: { value: 0.3 },
            size: { value: { min: 1, max: 3 } },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
          detectRetina: true,
        }}
      />

      {/* 본문 콘텐츠 */}
      <Styled.InnerWrapper>
        <Styled.Title>리뷰 관리</Styled.Title>

        {/* 검색창 + 일괄삭제 버튼 */}
        <Styled.Controls>
          <Styled.SearchInput
            type="text"
            placeholder="유저 이름 / 게임 제목 / 내용 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // 검색 시 첫 페이지로 이동
            }}
          />
          {selectedIds.length > 0 && (
            <Styled.DeleteButton onClick={() => setShowConfirm(true)}>
              선택 삭제 ({selectedIds.length})
            </Styled.DeleteButton>
          )}
        </Styled.Controls>

        {/* 리뷰 테이블 */}
        <Styled.ReviewTable>
          <thead>
            <tr>
              <th>
                {/* 전체 선택 체크박스 */}
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={paginated.every((r) =>
                    selectedIds.includes(r.reviewId)
                  )}
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
                  {/* 30자 이상이면 줄이고 더보기 버튼 */}
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
                  {/* 개별 삭제 */}
                  <Styled.DeleteButton
                    onClick={() => {
                      setSelectedIds([review.reviewId]); // 단일 삭제도 재활용
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

        {/* 페이지네이션 */}
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
              <button className="cancel" onClick={() => setShowConfirm(false)}>
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
  );
};

export default ReviewManagement;
