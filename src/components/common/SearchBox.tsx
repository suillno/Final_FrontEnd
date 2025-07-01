import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "../../img/SearchIcon.svg";
import { useNavigate } from "react-router-dom";

// 🔹 검색창 전체를 감싸는 래퍼 (아이콘 + 입력창 포함)
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// 🔹 검색 입력창 스타일 정의 (transient prop: $visible 사용)
const SearchInput = styled.input<{ $visible: boolean }>`
  position: absolute;
  width: ${(props) => (props.$visible ? "100%" : "0px")};
  max-width: 100%;
  min-width: 0;
  font-size: 14px;
  height: 24px;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  padding: ${(props) => (props.$visible ? "8px 12px" : "0")};
  margin-right: 8px;
  background-color: #3a3c42;
  color: white;
  border: none;
  border-radius: 12px;
  transition: width 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
  z-index: 1;

  @media (max-width: 768px) {
    width: ${(props) => (props.$visible ? "180px" : "0px")};
  }
`;

// 🔹 텍스트 + 아이콘을 감싸는 버튼 스타일
const IconButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  gap: 8px;
  z-index: 0;

  a {
    text-decoration: none;
    font-weight: 500;
  }
`;

// 🔹 메인 컴포넌트
const SearchBox = () => {
  const [showInput, setShowInput] = useState(false); // 검색창 표시 여부
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // 🔸 검색창 열릴 때 자동 포커스
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  // 🔸 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/searchgame?search=${encodeURIComponent(query)}`);
    }
    if (e.key === "Escape") {
      setShowInput(false);
    }
  };

  return (
    <SearchWrapper>
      {/* 🔍 검색 입력창 */}
      <SearchInput
        spellCheck="false"
        $visible={showInput} // ✅ 변경된 transient prop
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => setShowInput(false)}
        placeholder="게임 제목을 입력하세요"
      />

      {/* 🔍 아이콘 + 텍스트: 닫혀있을 때만 표시 */}
      {!showInput && (
        <IconButton onClick={() => setShowInput(true)}>
          <img className="w-4 h-4 md:w-6 md:h-6" src={SearchIcon} alt="" />
          <p className="text-sm sm:text-base md:text-lg text-[rgba(128,128,128,0.6)]">
            Search Games
          </p>
        </IconButton>
      )}
    </SearchWrapper>
  );
};

export default SearchBox;
