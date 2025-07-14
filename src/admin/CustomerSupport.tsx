import React, { useState, useRef, useCallback, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import * as Styled from "./customerSupport/CustomerSupport.styles";
import { Inquiry, LayoutContext } from "./customerSupport/CustomerSupport.types";
import InquiryViewModal from "./customerSupport/InquiryViewModal";
import InquiryStatusModal from "./customerSupport/InquiryStatusModal";
import { FaSearch } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import {
  apiGetAllInquiries,
  apiUpdateInquiryStatus,
} from "../components/api/backApi";

const ITEMS_PER_PAGE = 10;

const CustomerSupport: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [inquiries, setInquiries] = useState<Inquiry[]>([]); // 전체 문의 목록
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // 선택된 상태 필터
  const [search, setSearch] = useState(""); // 검색어
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [viewContent, setViewContent] = useState<string | null>(null); // 상세 보기 모달용
  const [editTarget, setEditTarget] = useState<Inquiry | null>(null); // 상태변경 모달 대상

  const inputRef = useRef<HTMLInputElement>(null);

  // 문의 목록 API 불러오기 (최초 1회 실행)
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await apiGetAllInquiries();
        setInquiries(data);
      } catch (error) {
        console.error("\u274C 문의 목록 불러오기 실패:", error);
      }
    };
    fetchInquiries();
  }, []);

  // particles 초기화
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // 체크박스로 상태 필터 적용
  const handleStatusSelect = (status: string) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
    setCurrentPage(1);
  };

  // 문의 상태 변경 (API 연동 포함)
  const handleStatusChange = async (newStatus: Inquiry["status"]) => {
    if (editTarget) {
      try {
        // 1. 서버에 상태 변경 요청
        await apiUpdateInquiryStatus(editTarget.id, newStatus);

        // 2. 상태 업데이트
        setInquiries((prev) =>
          prev.map((item) =>
            item.id === editTarget.id ? { ...item, status: newStatus } : item
          )
        );
        setEditTarget(null); // 모달 닫기
      } catch (err) {
        alert("\u274C 상태 변경 실패");
      }
    }
  };

  // 검색어로 필터링
  const handleSearch = () => {
    setCurrentPage(1);
  };

  // 필터 및 검색 적용한 데이터
  const filteredData = inquiries.filter(
    (item) =>
      (!selectedStatus || item.status === selectedStatus) &&
      (item.username?.includes(search) || item.content.includes(search))
  );

  // 현재 페이지에 맞는 데이터 슬라이스
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* 배경 효과 */}
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
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            number: {
              value: window.innerWidth < 768 ? 30 : 60,
              density: { enable: true, value_area: 800 },
            },
            color: { value: "#00eaff" },
            links: {
              enable: true,
              color: "#00eaff",
              distance: 120,
              opacity: 0.4,
            },
            move: { enable: true, speed: 1.5 },
            size: { value: 2 },
            opacity: { value: 0.3 },
          },
          detectRetina: true,
        }}
      />

      {/* 본문 */}
      <Styled.InnerWrapper>
        <Styled.Title style={{ marginTop: "100px" }}>고객 문의 관리</Styled.Title>

        {/* 상태별 필터 */}
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

        {/* 검색창 */}
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
        </Styled.SearchBar>

        {/* 문의 목록 테이블 */}
        <Styled.Table>
          <thead>
            <tr>
              <th>접수번호</th>
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
                <td>{item.id}</td>
                <td>{item.status}</td>
                <td>{item.username ?? "-"}</td>
                <td>{item.category}</td>
                <td>{item.createdAt}</td>
                <td>
                  <Styled.ViewButton onClick={() => setViewContent(item.content)}>
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

      {/* 상세보기 모달 */}
      {viewContent && (
        <InquiryViewModal content={viewContent} onClose={() => setViewContent(null)} />
      )}

      {/* 상태변경 모달 */}
      {editTarget && (
        <InquiryStatusModal
          target={editTarget}
          onChangeStatus={handleStatusChange}
          onClose={() => setEditTarget(null)}
        />
      )}
    </Styled.Container>
  );
};

export default CustomerSupport;
