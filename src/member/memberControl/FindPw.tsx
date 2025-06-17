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

const FindPwForm = styled.form`
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

const LinkWrap = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    color: #1ea7fd;
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const FindPw = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("비밀번호 찾기 요청됨!");
    // 여기서 실제 API 호출하기?(수일PT에게 물어보자)
  };

  return (
    <Body>
      <Container>
        <H2>비밀번호 찾기</H2>
        <FindPwForm onSubmit={handleSubmit}>
          <label htmlFor="userid">아이디</label>
          <input
            type="text"
            id="userid"
            name="userid"
            placeholder="아이디를 입력하세요"
            required
          />

          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="이메일을 입력하세요"
            required
          />

          <button type="submit">인증 메일 보내기</button>
        </FindPwForm>

        {/* {여기엔 로그인, 회원가입 링크 추가해도 좋다는디요?} */}
        <LinkWrap>
          <a href="/login">로그인으로 돌아가기</a>
        </LinkWrap>
      </Container>
    </Body>
  );
};

export default FindPw;
