import styled from "styled-components";



// 전체 페이지 컨테이너
export const Container = styled.div<{ isSidebarOpen: boolean }>`
  padding: 2rem;
  margin-left: ${(props) => (props.isSidebarOpen ? "200px" : "5%")};
  transition: margin-left 0.3s ease;
  color: white;
  background-color: #1e1f24;
  min-height: 100vh;
`;

// 타이틀과 테이블 시작 위치를 통일하기 위한 래퍼
export const InnerWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

// 가운데 정렬용 상단 헤더 wrapper
export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

// 타이틀
export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: left; 
  width: 100%;      
`;


// 검색/필터/정렬 컨트롤
export const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 1rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

// 검색창
export const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border-radius: 6px;
  width: 250px;
  transition: width 0.3s ease;
  border: 1px solid #555;
  font-size: 1rem;
  background-color: #2a2b30;
  color: #fff;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    width: 300px;
    border-color: #4b7bec;
    background-color: #1e1f24;
  }
`;


// 신고순 정렬 버튼
export const SortButton = styled.button`
  background: #4b7bec;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
`;

// 테이블 전체 가운데 정렬
export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// 리뷰 테이블
export const ReviewTable = styled.table`
  width: 100%;
  max-width: 1000px;
  border-collapse: collapse;
  background-color: #2c2f36;

  th, td {
    padding: 1rem;
    border-bottom: 1px solid #444;
    vertical-align: middle;
    text-align: center;
  }

  th {
    background-color: #3b3e45;
    color: white;
  }

  td {
    color: #ddd;
  }
`;

// 내용이 길 경우 표시되는 + 버튼
export const MoreButton = styled.button`
  margin-left: 8px;
  padding: 2px 8px;
  background-color: #4b7bec;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

// 삭제 버튼
export const DeleteButton = styled.button`
  background: #eb3b5a;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
`;

// 페이지네이션
export const Pagination = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

  button {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 4px;
    background-color: #444;
    color: white;
    cursor: pointer;

    &.active {
      background-color: #4b7bec;
    }
  }
`;
