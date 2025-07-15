import React, { useState, useRef, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import * as Styled from "./customerSupport/CustomerSupport.styles";
import {
  Inquiry,
  LayoutContext,
} from "./customerSupport/CustomerSupport.types";
import InquiryViewModal from "./customerSupport/InquiryViewModal";
import InquiryStatusModal from "./customerSupport/InquiryStatusModal";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import {
  apiGetAllInquiries,
  apiUpdateInquiryStatus,
  apiDeleteInquiryById,
} from "../components/api/backApi";

const ITEMS_PER_PAGE = 10; // 한 페이지당 보여줄 문의 수

const CustomerSupport: React.FC = () => {
  /* ───────── 레이아웃 컨텍스트 (사이드바 상태) ───────── */
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  /* ───────── 상태 정의 ───────── */
  // 전체 문의 목록
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  // 상태 필터(대기중, 처리중, 완료), null이면 전체
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  // 검색어
  const [search, setSearch] = useState("");
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 상세 보기 모달용 본문
  const [viewContent, setViewContent] = useState<string | null>(null);
  // 상태 변경 모달 대상
  const [editTarget, setEditTarget] = useState<Inquiry | null>(null);
  // 체크박스로 선택된 문의 ID 리스트
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // 삭제 확인 모달
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // 삭제 완료 모달
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  /* ───────── 최초 데이터 로드 ───────── */
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await apiGetAllInquiries();
        setInquiries(data);
      } catch (error) {
        console.error("문의 목록 불러오기 실패:", error);
      }
    };
    fetchInquiries();
  }, []);

  /* ───────── 배경 파티클 초기화 ───────── */
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  /* ───────── 필터 및 검색 로직 ───────── */
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

  /* ───────── 페이지네이션 계산 ───────── */
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* ───────── 체크박스 처리 ───────── */
  const handleSelectOne = (checked: boolean, id: number) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    const pageIds = currentData.map((item) => item.id);
    if (checked) {
      const merged = Array.from(new Set([...selectedIds, ...pageIds]));
      setSelectedIds(merged);
    } else {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    }
  };

  const isAllSelected = currentData.every((item) =>
    selectedIds.includes(item.id)
  );

  /* ───────── 삭제 실행 ───────── */
  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedIds) {
        await apiDeleteInquiryById(id);
      }
      setInquiries((prev) =>
        prev.filter((item) => !selectedIds.includes(item.id))
      );
      setSelectedIds([]);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch {
      alert("선택 삭제 중 오류가 발생했습니다.");
    }
  };

  /* ───────── 상태 변경 실행 ───────── */
  const handleStatusChange = async (newStatus: Inquiry["status"]) => {
    if (!editTarget) return;
    try {
      await apiUpdateInquiryStatus(editTarget.id, newStatus);
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === editTarget.id ? { ...item, status: newStatus } : item
        )
      );
      setEditTarget(null);
    } catch {
      alert("상태 변경 실패");
    }
  };

  /* ───────── 렌더링 ───────── */
  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
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

        {/* 검색창과 선택 삭제 버튼 */}
        <Styled.SearchBar>
          <Styled.SearchInput
            ref={inputRef}
            type="text"
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
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={(e) => handleSelectOne(e.target.checked, item.id)}
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
      {showSuccessModal && (
        <Styled.ModalOverlay onClick={() => setShowSuccessModal(false)}>
          <Styled.ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>삭제 완료</h3>
            <p>선택하신 문의가 성공적으로 삭제되었습니다.</p>
            <Styled.CloseButton onClick={() => setShowSuccessModal(false)}>
              확인
            </Styled.CloseButton>
          </Styled.ModalBox>
        </Styled.ModalOverlay>
      )}
    </Styled.Container>
  );
};

export default CustomerSupport;
