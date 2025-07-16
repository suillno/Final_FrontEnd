import React, { useState, useEffect } from "react";
import * as Styled from "./MemberService.styles";
import { useOutletContext } from "react-router-dom";
import {
  apiSubmitInquiry,
  apiGetAllInquiries,
  apiDeleteInquiryById,
} from "../../components/api/backApi";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";
import InquiryAnswerModal from "./InquiryAnswerModal";
import InquiryDeleteModal from "./InquiryDeleteModal";
import { InquiryForm, LayoutContext } from "./MemberService.types";
import { Inquiry } from "../../types/types";
const inquiryTypes = [
  "결제 관련",
  "계정 문제",
  "게임 실행 오류",
  "버그 제보",
  "기타",
  "직접 입력",
];

const MemberServicePage: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const userInfo = useSelector(selectUserInfo);

  const [form, setForm] = useState<InquiryForm>({ category: "", content: "" });
  const [selectMode, setSelectMode] = useState<"select" | "custom">("select");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [viewModal, setViewModal] = useState<Inquiry | null>(null);
  const [deleteModal, setDeleteModal] = useState<Inquiry | null>(null);

  // 문의 데이터 불러오기 (로그인된 사용자 기준 필터링)
  const loadInquiries = async () => {
    try {
      const all = await apiGetAllInquiries();
      const mine = all.filter((inq) => inq.userId === userInfo?.id);
      setInquiries(mine);
    } catch (error) {
      console.error("문의 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (userInfo?.id) {
      loadInquiries();
    }
  }, [userInfo]);

  // 입력값 변경 처리
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 문의 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("제출 정보:", form);
    console.log("유저 ID:", userInfo?.id);
    if (!form.category.trim() || !form.content.trim()) {
      alert("문의 유형과 내용을 모두 입력해주세요.");
      return;
    }

    if (!userInfo?.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await apiSubmitInquiry({
        userId: userInfo.id,
        category: form.category.trim(),
        content: form.content.trim(),
      });

      alert("문의가 정상적으로 제출되었습니다.");
      setForm({ category: "", content: "" });
      setSelectMode("select");
      loadInquiries();
    } catch (error) {
      console.error("문의 등록 실패:", error);
      alert("문의 등록 중 오류가 발생했습니다.");
    }
  };

  // 문의 삭제 처리
  const handleDelete = async (id: number) => {
    try {
      await apiDeleteInquiryById(id);
      setDeleteModal(null);
      loadInquiries();
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("문의 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <Styled.PageWrapper $isSidebarOpen={isSidebarOpen}>
      <Styled.FormWrapper>
        <Styled.Title>고객 문의</Styled.Title>

        {/* 문의 작성 폼 */}
        <Styled.Form onSubmit={handleSubmit}>
          <Styled.Label htmlFor="inquiryType">문의 유형</Styled.Label>

          {selectMode === "select" ? (
            <Styled.Select
              id="inquiryType"
              value={form.category}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "직접 입력") {
                  setSelectMode("custom");
                  setForm({ ...form, category: "" });
                } else {
                  setForm({ ...form, category: val });
                }
              }}
            >
              <option value="">문의 유형을 선택하세요</option>
              {inquiryTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </Styled.Select>
          ) : (
            <>
              <Styled.Input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="문의 유형을 입력하세요"
              />
              <Styled.SwitchButton
                type="button"
                onClick={() => {
                  setSelectMode("select");
                  setForm({ ...form, category: "" });
                }}
              >
                목록에서 선택하기
              </Styled.SwitchButton>
            </>
          )}

          <Styled.Label htmlFor="content">내용</Styled.Label>
          <Styled.TextArea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="문의 내용을 입력하세요"
          />

          <Styled.SubmitButton type="submit">제출하기</Styled.SubmitButton>
        </Styled.Form>

        {/* 사용자 문의 내역 리스트 */}
        {inquiries.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h3 style={{ color: "#fff", marginBottom: "1.5rem" }}>
              나의 문의 내역
            </h3>
            {inquiries.map((item) => (
              <div
                key={item.inquiryId}
                style={{
                  background: "#1c1d23",
                  padding: "1rem 1.2rem",
                  borderRadius: "8px",
                  border: "1px solid #333",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ fontWeight: 600, color: "#f3f3f3" }}>
                    {item.category}
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color:
                        item.status === "완료"
                          ? "#11a57d"
                          : item.status === "처리중"
                          ? "#ffae00"
                          : "#888",
                    }}
                  >
                    {item.status}
                  </span>
                </div>

                <p
                  style={{
                    color: "#ddd",
                    marginTop: "0.5rem",
                    whiteSpace: "pre-line",
                  }}
                >
                  {item.content}
                </p>

                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#888",
                    marginTop: "0.5rem",
                  }}
                >
                  {item.createdAt}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "1rem",
                    marginTop: "0.8rem",
                  }}
                >
                  {item.status === "완료" && (
                    <button
                      onClick={() => setViewModal(item)}
                      style={{
                        color: "#fff",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      답변 보기
                    </button>
                  )}
                  {item.status === "대기중" && (
                    <button
                      onClick={() => setDeleteModal(item)}
                      style={{
                        color: "#ff5555",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Styled.FormWrapper>

      {/* 답변 모달 */}
      {viewModal && (
        <InquiryAnswerModal
          inquiry={viewModal}
          onClose={() => setViewModal(null)}
        />
      )}

      {/* 삭제 확인 모달 */}
      {deleteModal && (
        <InquiryDeleteModal
          isOpen={!!deleteModal}
          onConfirm={() => handleDelete(deleteModal.inquiryId)}
          onCancel={() => setDeleteModal(null)}
        />
      )}
    </Styled.PageWrapper>
  );
};

export default MemberServicePage;
