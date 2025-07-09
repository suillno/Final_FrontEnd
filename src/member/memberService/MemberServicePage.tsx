import React, { useState } from "react";
import * as Styled from "./MemberService.styles";
import { InquiryForm } from "./MemberService.types";
import { useOutletContext } from "react-router-dom";
import {
  apiGetGameSearch,
  apiSubmitInquiry,
} from "../../components/api/api";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";

// 자동완성용 게임 검색 결과 타입
interface GameSearchResult {
  id: number;
  name: string;
}

// 레이아웃에서 전달받는 context 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

const MemberServicePage = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const userInfo = useSelector(selectUserInfo); // 로그인 사용자 정보

  // 폼 상태
  const [form, setForm] = useState<InquiryForm>({
    game: "",
    title: "",
    content: "",
    gameId: null,
  });

  // 검색 관련 상태
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState<GameSearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // 게임 검색 시 자동완성 동작
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchText(keyword);
    setForm({ ...form, game: "", gameId: null });

    if (keyword.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const data = await apiGetGameSearch(keyword);
      setSuggestions(data?.results || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("게임 검색 실패:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // 자동완성 클릭 시 게임 선택
  const handleSelectGame = (game: GameSearchResult) => {
    setSearchText(game.name);
    setForm({ ...form, game: game.name, gameId: game.id });
    setShowSuggestions(false);
  };

  // 제목 및 내용 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수값 유효성 검사
    if (!form.gameId || !form.title.trim() || !form.content.trim()) {
      alert("게임, 제목, 내용을 모두 입력해주세요.");
      return;
    }

    // 로그인 여부 확인
    if (!userInfo || typeof userInfo.id !== "number") {
      console.log("userInfo 확인:", userInfo);
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await apiSubmitInquiry({
        userId: userInfo.id,
        gameId: form.gameId,
        gameTitle: form.game,
        title: form.title.trim(),
        content: form.content.trim(),
      });

      alert("문의가 정상적으로 제출되었습니다.");

      // 입력값 초기화
      setForm({ game: "", title: "", content: "", gameId: null });
      setSearchText("");
      setSuggestions([]);
      setShowSuggestions(false);
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
          {/* 게임 검색 입력 */}
          <Styled.Label htmlFor="game">게임 검색</Styled.Label>
          <div style={{ position: "relative" }}>
            <Styled.Input
              id="game"
              name="gameSearch"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="게임명을 입력하세요"
              autoComplete="off"
            />

            {/* 자동완성 결과 */}
            {showSuggestions && suggestions.length > 0 && (
              <Styled.SuggestionList>
                {suggestions.map((game) => (
                  <Styled.SuggestionItem
                    key={game.id}
                    onClick={() => handleSelectGame(game)}
                  >
                    {game.name}
                  </Styled.SuggestionItem>
                ))}
              </Styled.SuggestionList>
            )}
          </div>

          {/* 제목 입력 */}
          <Styled.Label htmlFor="title">제목</Styled.Label>
          <Styled.Input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />

          {/* 내용 입력 */}
          <Styled.Label htmlFor="content">내용</Styled.Label>
          <Styled.TextArea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="문의 내용을 입력하세요"
          />

          {/* 제출 버튼 */}
          <Styled.SubmitButton type="submit">제출하기</Styled.SubmitButton>
        </Styled.Form>
      </Styled.FormWrapper>
    </Styled.PageWrapper>
  );
};

export default MemberServicePage;
