import { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { IoMailOutline } from "react-icons/io5";
import bgImage from "../../img/g4.png";

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${bgImage}) no-repeat center center / cover;
    z-index: -2;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: -1;
  }
`;

const FormBox = styled.div`
  position: relative;
  width: 400px;
  height: 450px;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  h2 {
    font-size: 2em;
    color: #fff;
    text-align: center;
    margin-top: 20px;
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 310px;
  border-bottom: 2px solid #fff;

  label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: #fff;
    font-size: 1em;
    pointer-events: none;
    transition: 0.5s;
  }

  input:focus ~ label,
  input:valid ~ label {
    top: -5px;
  }

  input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 0 15px 0 5px;
    color: #fff;
  }

  svg {
    position: absolute;
    right: 8px;
    color: #fff;
    font-size: 1.2em;
    top: 20px;
  }
`;

const Button = styled.button`
  margin-bottom: 30px;
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;

  &:hover {
    background: #fff;
    color: black;
  }
`;

const ResultBox = styled.div`
  margin-top: 20px;
  color: #fff;
  text-align: center;
  font-size: 1.1em;
`;

export default function FindId() {
  const [email, setEmail] = useState("");
  const [foundId, setFoundId] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 👉 여기에 실제 API 호출 로직 연결 (지금은 임시)
    // 가짜 아이디 찾기 (예시)
    if (email === "test@email.com") {
      setFoundId("testuser123");
    } else {
      setFoundId("해당 이메일로 등록된 아이디가 없습니다.");
    }
  };

  return (
    <Section>
      <FormBox>
        <Form onSubmit={onSubmit}>
          <h2>아이디 찾기</h2>

          <InputBox>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={onChange}
            />
            <label htmlFor="email">이메일</label>
            <IoMailOutline />
          </InputBox>

          <Button type="submit">아이디 찾기</Button>

          {foundId && (
            <ResultBox>
              <p>
                {typeof foundId === "string"
                  ? `찾은 아이디: ${foundId}`
                  : foundId}
              </p>
            </ResultBox>
          )}
        </Form>
      </FormBox>
    </Section>
  );
}
