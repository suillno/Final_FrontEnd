import React from "react";
import styled from "styled-components";

const Body = styled.body`
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  background-color: #2c2f38;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Container = styled.div`
  background-color: #3a3c42;
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const H2 = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

const FindIdForm = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-top: 12px;
    margin-bottom: 4px;
    font-weight: bold;
  }

  input {
    padding: 10px;
    border-radius: 4px;
    border: none;
    background-color: #565962;
    color: white;
  }

  input::placeholder {
    color: #cccccc;
  }

  button {
    margin-top: 24px;
    padding: 12px;
    background-color: #1ea7fd;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0e82d6;
  }
`;

const FindId = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("아이디 찾기 요청됨!");
    // API 호출 추가하기
  };

  return (
    <Body>
      <Container>
        <H2>아이디 찾기</H2>
        <FindIdForm onSubmit={handleSubmit}>
          <label htmlFor="email">가입된 이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            required
          />
          <button type="submit">인증 메일 보내기</button>
        </FindIdForm>
      </Container>
    </Body>
  );
};

export default FindId;
