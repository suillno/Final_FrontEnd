import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "../../img/SearchIcon.svg";

// 🔹 검색창 전체를 감싸는 래퍼 (아이콘 + 입력창 포함)
const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// 🔹 검색 입력창 스타일 정의
const SearchInput = styled.input<{ visible: boolean }>`
  position: absolute;
  width: ${(props) =>
    props.visible ? "100%" : "0px"}; // 표시 여부에 따라 너비
  max-width: 100%; // 부모 영역 초과 방지
  min-width: 0;
  font-size: 14px;
  height: 24px;
  opacity: ${(props) => (props.visible ? 1 : 0)}; // 투명도 조절
  padding: ${(props) => (props.visible ? "8px 12px" : "0")}; // 여백 조절
  margin-right: 8px;
  background-color: #3a3c42;
  color: white;
  border: none;
  border-radius: 12px;
  transition: width 0.3s ease, opacity 0.3s ease, padding 0.3s ease; // 부드러운 애니메이션
  pointer-events: ${(props) =>
    props.visible ? "auto" : "none"}; // 클릭 가능 여부
  z-index: 1;

  @media (max-width: 768px) {
    width: ${(props) => (props.visible ? "180px" : "0px")};
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
  const inputRef = useRef<HTMLInputElement>(null); // input 요소 접근용 ref
  const [query, setQuery] = useState(""); // 입력된 검색어 상태

  // 🔸 검색창이 열릴 때 자동 포커스
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  // 🔸 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("🔍 검색어:", query); // 실제 검색 로직 대체 가능
    }
    if (e.key === "Escape") {
      setShowInput(false); // ESC 키 누르면 검색창 닫기
    }
  };

  return (
    <SearchWrapper>
      {/* 🔍 검색 입력창: showInput이 true일 때 표시됨 */}
      <SearchInput
        visible={showInput}
        ref={inputRef} // 포커스 제어용 ref
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)} // 입력 시 query 상태 업데이트
        onKeyDown={handleKeyDown} // Enter 및 ESC 키 처리
        onBlur={() => setShowInput(false)} // 포커스를 잃으면 자동 닫힘
        placeholder="게임 제목을 입력하세요"
      />

      {/* 🔍 아이콘 + 텍스트: 입력창이 닫혀 있을 때만 표시 */}
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
