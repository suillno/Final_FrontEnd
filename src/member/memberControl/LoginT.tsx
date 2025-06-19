import { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { IoIdCardOutline, IoLockClosedOutline } from "react-icons/io5";
import bgImage from "../../img/g1.png";

//  styled-components 변환
const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${bgImage}) no-repeat center center / cover;
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

const Forget = styled.div`
  margin: -15px 20px 0;
  font-size: 0.9em;
  display: flex;
  color: #fff;
  justify-content: center;

  label input {
    margin-right: 3px;
  }

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Button = styled.button`
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

const Register = styled.div`
  font-size: 0.9em;
  color: #fff;
  text-align: center;
  margin: 25px 0 10px;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Find = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// TypeScript 폼 타입
type LoginForm = {
  id: string;
  password: string;
};

// 컴포넌트
export default function Login() {
  const [form, setForm] = useState<LoginForm>({
    id: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Section>
      <FormBox>
        <Form onSubmit={onSubmit}>
          <h2>로그인</h2>

          <InputBox style={{ marginBottom: "10px" }}>
            <input
              type="text"
              id="id"
              required
              value={form.id}
              onChange={onChange}
            />
            <label htmlFor="id">아이디</label>
            <IoIdCardOutline />
          </InputBox>

          <InputBox style={{ marginBottom: "10px" }}>
            <input
              type="password"
              id="password"
              required
              value={form.password}
              onChange={onChange}
            />
            <label htmlFor="password">비밀번호</label>
            <IoLockClosedOutline />
          </InputBox>

          <Forget>
            <label>
              <input type="checkbox" /> 로그인 상태 유지
            </label>
          </Forget>

          <Button type="submit">로그인</Button>

          <Register>
            <p>
              계정이 없으신가요? <a href="#">가입하기</a>
            </p>
          </Register>

          <Find>
            <a href="#">아이디 찾기</a>
            <a href="#">비밀번호 찾기</a>
          </Find>
        </Form>
      </FormBox>
    </Section>
  );
}
