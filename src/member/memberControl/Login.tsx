import React, { useEffect, useState } from "react";
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
const LoginForm = styled.form`
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
const Links = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  a {
    color: #1ea7fd;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  return (
    <Body>
      <Container>
        <H2>로그인</H2>
        <LoginForm>
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

          <button type="submit">로그인</button>

          <Links>
            <a href="findid.html">아이디 찾기</a>
            <a href="findpw.html">비밀번호 찾기</a>
          </Links>
        </LoginForm>
      </Container>
    </Body>
  );
};

export default Login;
