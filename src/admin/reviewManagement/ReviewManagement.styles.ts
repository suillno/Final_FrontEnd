import styled, { keyframes } from "styled-components";

// ✅ Fade-in 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div<{ isSidebarOpen: boolean }>`
  animation: ${fadeIn} 0.5s ease;
  padding: 2rem;
  margin-left: ${(props) => (props.isSidebarOpen ? "200px" : "5%")};
  transition: margin-left 0.3s ease;
  color: white;
  background-color: #1e1f24;
  min-height: 100vh;
`;

export const InnerWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

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

export const SearchInput = styled.input`
  padding: 0.5rem 2.5rem 0.5rem 0.75rem;
  border-radius: 6px;
  width: 250px;
  transition: all 0.3s ease;
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

export const SortButton = styled.button`
  background: #4b7bec;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5d8bf4;
  }
`;

export const ReviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #2c2f36;

  th, td {
    padding: 1rem;
    border-bottom: 1px solid #444;
    text-align: center;
  }

  th {
    background-color: #3b3e45;
    color: white;
  }

  td {
    color: #ddd;
  }

  tbody tr:hover {
    background-color: #383b45;
    transition: background-color 0.3s ease;
  }
`;

export const MoreButton = styled.button`
  margin-left: 8px;
  padding: 2px 8px;
  background-color: #4b7bec;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #5d8bf4;
  }
`;

export const DeleteButton = styled.button`
  background: #eb3b5a;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #ff6b81;
  }
`;

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
    transition: background 0.3s ease;

    &.active {
      background-color: #4b7bec;
    }

    &:hover {
      background-color: #5d8bf4;
    }
  }
`;
