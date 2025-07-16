// src/pages/CustomerSupport.tsx
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import * as Styled from "./customerSupport/CustomerSupport.styles";
import { LayoutContext } from "./customerSupport/CustomerSupport.types";
import { Inquiry } from "../types/types";
import InquiryViewModal from "./customerSupport/InquiryViewModal";
import InquiryStatusModal from "./customerSupport/InquiryStatusModal";
import InquiryAnswerEditModal from "./customerSupport/InquiryAnswerEditModal";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import {
  apiGetAllInquiries,
  apiUpdateInquiryStatus,
  apiDeleteInquiryById,
  apiSaveInquiryAnswer, // 관리자 답변 저장 API
} from "../components/api/backApi";

const ITEMS_PER_PAGE = 10; // 한 페이지 당 목록 수

const CustomerSupport: React.FC = () => {
  /* ────────────────────────────── 컨텍스트 및 전역 ────────────────────────────── */
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  /* ──────────────────────────────── 상태 정의 ──────────────────────────────── */
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [viewContent, setViewContent] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<Inquiry | null>(null); // 상태 변경용
  const [answerTarget, setAnswerTarget] = useState<Inquiry | null>(null); // 답변 등록용

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // 기존 showSuccessModal의 이름을 변경하여 삭제 성공 모달로 명확히 함
  const [showAnswerSaveSuccessModal, setShowAnswerSaveSuccessModal] =
    useState(false); // <--- 새로 추가된 상태: 답변 저장 성공 모달 표시 여부

  const inputRef = useRef<HTMLInputElement>(null);

  /* ─────────────────────────────── 데이터 로드 ─────────────────────────────── */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGetAllInquiries();
        setInquiries(data);
      } catch (e) {
        console.error("문의 목록 불러오기 실패:", e);
      }
    };
    fetchData();
  }, []);

  /* ───────────────────────────── 파티클 초기화 ───────────────────────────── */
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  /* ───────────────────────────── 필터 / 검색 ───────────────────────────── */
  const handleStatusSelect = (status: string) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
    setCurrentPage(1);
  };

  const handleSearch = () => setCurrentPage(1);

  const filteredData = inquiries.filter(
    (item) =>
      (!selectedStatus || item.status === selectedStatus) &&
      (item.username?.includes(search) || item.content.includes(search))
  );

  /* ───────────────────────────── 페이지네이션 ───────────────────────────── */
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ───────────────────────────── 체크박스 ───────────────────────────── */
  const handleSelectOne = (checked: boolean, id: number) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const pageIds = currentData.map((item) => item.inquiryId);
    if (checked) {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    } else {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    }
  };

  const isAllSelected = currentData.every((item) =>
    selectedIds.includes(item.inquiryId)
  );

  /* ───────────────────────────── 삭제 기능 ───────────────────────────── */
  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedIds) {
        await apiDeleteInquiryById(id);
      }
      setInquiries((prev) =>
        prev.filter((item) => !selectedIds.includes(item.inquiryId))
      );
      setSelectedIds([]);
      setShowConfirmModal(false);
      setShowDeleteSuccessModal(true); // 삭제 성공 모달 표시
    } catch {
      alert("선택 삭제 중 오류가 발생했습니다.");
    }
  };

  /* ───────────────────────────── 상태 변경 ───────────────────────────── */
  const handleStatusChange = async (newStatus: Inquiry["status"]) => {
    if (!editTarget) return;
    try {
      await apiUpdateInquiryStatus(editTarget.inquiryId, newStatus);
      setInquiries((prev) =>
        prev.map((item) =>
          item.inquiryId === editTarget.inquiryId
            ? { ...item, status: newStatus }
            : item
        )
      );
      setEditTarget(null);
    } catch {
      alert("상태 변경 실패");
    }
  };

  /* ───────────────────────────── 답변 저장 ───────────────────────────── */
  const handleAnswerSave = async (answer: string) => {
    if (!answerTarget) return;
    try {
      await apiSaveInquiryAnswer(answerTarget.inquiryId, answer);
      setInquiries((prev) =>
        prev.map((item) =>
          item.inquiryId === answerTarget.inquiryId
            ? { ...item, answer } // 로컬 상태도 갱신
            : item
        )
      );
      setAnswerTarget(null); // 답변 모달 닫기
      setShowAnswerSaveSuccessModal(true); // <--- 답변 저장 성공 모달을 띄웁니다.
    } catch {
      alert("답변 저장 실패");
    }
  };

  /* ───────────────────────────── 렌더링 ───────────────────────────── */
  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* 배경 파티클 */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: 0 },
          background: { color: { value: "#1e1f24" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#00eaff" },
            links: {
              enable: true,
              distance: 120,
              opacity: 0.4,
              color: "#00eaff",
            },
            move: { enable: true, speed: 1.5 },
            size: { value: 2 },
            opacity: { value: 0.3 },
          },
          detectRetina: true,
        }}
      />

      <Styled.InnerWrapper>
        <Styled.Title style={{ marginTop: "100px" }}>
          고객 문의 관리
        </Styled.Title>

        {/* 상태 필터 */}
        <Styled.FilterBox>
          {["대기중", "처리중", "완료"].map((status) => (
            <label key={status}>
              <input
                type="checkbox"
                checked={selectedStatus === status}
                onChange={() => handleStatusSelect(status)}
              />
              {status}만 보기
            </label>
          ))}
        </Styled.FilterBox>

        {/* 검색창 및 선택 삭제 */}
        <Styled.SearchBar>
          <Styled.SearchInput
            ref={inputRef}
            placeholder="검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            spellCheck={false}
          />
          {selectedIds.length > 0 && (
            <Styled.DeleteSelectedButton
              onClick={() => setShowConfirmModal(true)}
            >
              선택된 {selectedIds.length}개 문의 삭제
            </Styled.DeleteSelectedButton>
          )}
        </Styled.SearchBar>

        {/* 문의 테이블 */}
        <Styled.Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>처리상태</th>
              <th>유저명</th>
              <th>문의유형</th>
              <th>등록일</th>
              <th>상세</th>
              <th>상태변경</th>
              <th>답변</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.inquiryId}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.inquiryId)}
                    onChange={(e) =>
                      handleSelectOne(e.target.checked, item.inquiryId)
                    }
                  />
                </td>
                <td>{item.status}</td>
                <td>{item.username ?? "-"}</td>
                <td>{item.category}</td>
                <td>{item.createdAt}</td>
                <td>
                  <Styled.ViewButton
                    onClick={() => setViewContent(item.content)}
                  >
                    보기
                  </Styled.ViewButton>
                </td>
                <td>
                  <Styled.ChangeButton onClick={() => setEditTarget(item)}>
                    변경
                  </Styled.ChangeButton>
                </td>
                <td>
                  {item.answer ? (
                    <Styled.AnswerEditButton
                      onClick={() => setAnswerTarget(item)}
                    >
                      수정
                    </Styled.AnswerEditButton>
                  ) : (
                    <Styled.AnswerRegisterButton
                      onClick={() => setAnswerTarget(item)}
                    >
                      등록
                    </Styled.AnswerRegisterButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Styled.Table>

        {/* 페이지네이션 */}
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
      {viewContent && (
        <InquiryViewModal
          content={viewContent}
          onClose={() => setViewContent(null)}
        />
      )}

      {/* 상태 변경 모달 */}
      {editTarget && (
        <InquiryStatusModal
          target={editTarget}
          onChangeStatus={handleStatusChange}
          onClose={() => setEditTarget(null)}
        />
      )}

      {/* 답변 등록/수정 모달 */}
      {answerTarget && (
        <InquiryAnswerEditModal
          target={answerTarget}
          onSubmit={handleAnswerSave}
          onClose={() => setAnswerTarget(null)}
        />
      )}

      {/* 삭제 확인 모달 */}
      {showConfirmModal && (
        <Styled.ModalOverlay onClick={() => setShowConfirmModal(false)}>
          <Styled.ConfirmBox onClick={(e) => e.stopPropagation()}>
            <h3>선택 삭제 확인</h3>
            <p>총 {selectedIds.length}개의 문의를 삭제하시겠습니까?</p>
            <div className="actions">
              <button className="delete" onClick={handleDeleteSelected}>
                삭제
              </button>
              <button
                className="cancel"
                onClick={() => setShowConfirmModal(false)}
              >
                취소
              </button>
            </div>
          </Styled.ConfirmBox>
        </Styled.ModalOverlay>
      )}

      {/* 삭제 완료 모달 */}
      {showDeleteSuccessModal && ( // 이름 변경된 상태 사용
        <Styled.ModalOverlay onClick={() => setShowDeleteSuccessModal(false)}>
          <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>삭제 완료</h3>
            <p>선택하신 문의가 성공적으로 삭제되었습니다.</p>
            <Styled.CloseButton
              onClick={() => setShowDeleteSuccessModal(false)}
            >
              확인
            </Styled.CloseButton>
          </Styled.ModalBox>
        </Styled.ModalOverlay>
      )}

      {/* 답변 저장 완료 모달 (새로 추가) */}
      {showAnswerSaveSuccessModal && ( // <--- 이 부분이 새로 추가되어 답변 저장 완료 모달을 표시합니다.
        <Styled.ModalOverlay
          onClick={() => setShowAnswerSaveSuccessModal(false)}
        >
          <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>저장 완료</h3>
            <p>답변이 성공적으로 저장되었습니다.</p>
            <Styled.CloseButton
              onClick={() => setShowAnswerSaveSuccessModal(false)}
            >
              확인
            </Styled.CloseButton>
          </Styled.ModalBox>
        </Styled.ModalOverlay>
      )}
    </Styled.Container>
  );
};

export default CustomerSupport;
