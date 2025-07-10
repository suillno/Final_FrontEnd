import React, { useState } from "react";
import * as Styled from "./MemberService.styles";
import { useOutletContext } from "react-router-dom";
import { apiSubmitInquiry } from "../../components/api/backApi";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";

// 레이아웃 context 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 폼 타입 정의 (INQUIRY 테이블에 맞춤)
interface InquiryForm {
  category: string;   // 문의 유형
  content: string;    // 문의 내용
}

// 문의 유형 옵션
const inquiryTypes = [
  "결제 관련",
  "계정 문제",
  "게임 실행 오류",
  "버그 제보",
  "기타",
  "직접 입력",
];

const MemberServicePage = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const userInfo = useSelector(selectUserInfo);

  // 셀렉트 모드 or 직접입력 모드
  const [selectMode, setSelectMode] = useState<"select" | "custom">("select");

  // 입력 상태
  const [form, setForm] = useState<InquiryForm>({
    category: "",
    content: "",
  });

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.category.trim() || !form.content.trim()) {
      alert("문의 유형과 내용을 모두 입력해주세요.");
      return;
    }

    if (!userInfo || typeof userInfo.id !== "number") {
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
    } catch (error) {
      console.error("문의 등록 실패:", error);
      alert("문의 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <Styled.PageWrapper $isSidebarOpen={isSidebarOpen}>
      <Styled.FormWrapper>
        <Styled.Title>고객 문의</Styled.Title>

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
      </Styled.FormWrapper>
    </Styled.PageWrapper>
  );
};

export default MemberServicePage;
