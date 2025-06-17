import React from "react";
import styled from "styled-components";

// 기존 스타일 유지
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

const SignupForm = styled.form`
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

const Signup = () => {
  // 후에 onSubmit 연결 가능(이건 잘 모르겠네..)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 폼 제출됨!");
    // 여기에 유효성 검사, API 연동 추가 가능(이것도 수일님한테 물어보기기)
  };

  return (
    <Body>
      <Container>
        <H2>회원가입</H2>
        <SignupForm onSubmit={handleSubmit}>
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            id="userid"
            name="userid"
            required
            placeholder="아이디를 입력하세요"
          />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="비밀번호를 입력하세요"
          />

          <label htmlFor="confirm-password">비밀번호 확인</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
            placeholder="비밀번호를 다시 입력하세요"
          />

          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="이메일을 입력하세요"
          />

          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="이름을 입력하세요"
          />

          <label htmlFor="phone">전화번호</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder="전화번호를 입력하세요"
          />

          <button type="submit">가입하기</button>
        </SignupForm>
      </Container>
    </Body>
  );
};

export default Signup;
