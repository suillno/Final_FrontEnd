// ✅ /admin/CustomerSupport.tsx

import React, { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import * as Styled from "./customerSupport/CustomerSupport.styles";
import { Inquiry, LayoutContext } from "./customerSupport/CustomerSupport.types";
import InquiryViewModal from "./customerSupport/InquiryViewModal";
import InquiryStatusModal from "./customerSupport/InquiryStatusModal";
import { FaSearch } from "react-icons/fa"; // 돋보기 아이콘

// 🌟 초기 더미 데이터
const initialData: Inquiry[] = [
  { id: 1001, status: "처리중", username: "박건우", date: "2025-06-19", content: "서비스 이용 중 오류가 발생했습니다." },
  { id: 1002, status: "완료", username: "이규철", date: "2025-06-18", content: "환불 요청 드립니다." },
  { id: 1003, status: "대기", username: "김지원", date: "2025-06-17", content: "계정 정보 변경이 안돼요." },
  { id: 1004, status: "완료", username: "이수진", date: "2025-06-16", content: "비밀번호 재설정이 필요합니다." },
  { id: 1005, status: "처리중", username: "최우영", date: "2025-06-15", content: "이메일 인증이 안 돼요." },
  { id: 1006, status: "대기", username: "정하늘", date: "2025-06-14", content: "서비스 이용 문의드립니다." },
  { id: 1007, status: "완료", username: "홍길동", date: "2025-06-13", content: "탈퇴 요청합니다." },
  { id: 1008, status: "처리중", username: "고재훈", date: "2025-06-12", content: "문의한 내용 언제 처리되나요?" },
  { id: 1009, status: "대기", username: "장미란", date: "2025-06-11", content: "배송 지연 관련 문의입니다." },
  { id: 1010, status: "처리중", username: "김철수", date: "2025-06-10", content: "상품 불량 문의합니다." },
];

// 페이지 당 표시 개수
const ITEMS_PER_PAGE = 10;

const CustomerSupport: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [inquiries, setInquiries] = useState<Inquiry[]>(initialData); // 전체 문의 목록
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // 필터
  const [search, setSearch] = useState(""); // 검색어
  const [currentPage, setCurrentPage] = useState(1); // 페이지

  const [viewContent, setViewContent] = useState<string | null>(null); // 상세 모달
  const [editTarget, setEditTarget] = useState<Inquiry | null>(null); // 상태 변경 모달

  const inputRef = useRef<HTMLInputElement>(null); // 검색 input ref

  // 상태 체크박스 필터 toggle
  const handleStatusSelect = (status: string) => {
    setSelectedStatus((prev) => (prev === status ? null : status));
    setCurrentPage(1);
  };

  // 상태 변경 모달에서 새로운 상태 반영
  const handleStatusChange = (newStatus: Inquiry["status"]) => {
    if (editTarget) {
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === editTarget.id ? { ...item, status: newStatus } : item
        )
      );
      setEditTarget({ ...editTarget, status: newStatus });
    }
  };

  // 검색 트리거 (돋보기 버튼 또는 Enter)
  const handleSearch = () => {
    setCurrentPage(1);
  };

  // 필터 + 검색 적용된 데이터
  const filteredData = inquiries.filter(
    (item) =>
      (!selectedStatus || item.status === selectedStatus) &&
      (item.username.includes(search) || item.content.includes(search))
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Styled.Container isSidebarOpen={isSidebarOpen}>
      {/* 타이틀 */}
      <Styled.Title style={{ marginTop: "100px" }}>고객 문의 관리</Styled.Title>

      {/* 🔘 처리 상태 필터 */}
      <Styled.FilterBox>
        {["대기", "처리중", "완료"].map((status) => (
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

      {/* 🔍 검색창 */}
      <Styled.SearchBar>
        <Styled.SearchInput
          ref={inputRef}
          type="text"
          placeholder="유저명, 내용 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Styled.SearchIcon onClick={handleSearch}>
          <FaSearch />
        </Styled.SearchIcon>
      </Styled.SearchBar>

      {/* 📋 테이블 */}
      <Styled.Table>
        <thead>
          <tr>
            <th>접수번호</th>
            <th>처리상태</th>
            <th>유저명</th>
            <th>문의날짜</th>
            <th>상세</th>
            <th>상태변경</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.status}</td>
              <td>{item.username}</td>
              <td>{item.date}</td>
              <td>
                <Styled.ViewButton onClick={() => setViewContent(item.content)}>보기</Styled.ViewButton>
              </td>
              <td>
                <Styled.ChangeButton onClick={() => setEditTarget(item)}>변경</Styled.ChangeButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Styled.Table>

      {/* 📌 페이지네이션 */}
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

      {/* 📄 상세 모달 */}
      {viewContent && (
        <InquiryViewModal content={viewContent} onClose={() => setViewContent(null)} />
      )}

      {/* ✏️ 상태 변경 모달 */}
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
