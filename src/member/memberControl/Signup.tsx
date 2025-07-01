import { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import {
  IoCalendar,
  IoIdCardOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoManOutline,
} from "react-icons/io5";
import bgImage from "../../img/g2.jpg";

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
  height: 800px;
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

type SignupForm = {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  name: string;
  birthDate: string;
};

export default function Signup() {
  const [form, setForm] = useState<SignupForm>({
    id: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    birthDate: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 비밀번호 확인
    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    console.log("회원가입 정보:", form);
  };

  return (
    <Section>
      <FormBox>
        <Form onSubmit={onSubmit}>
          <h2>회원가입</h2>

          <InputBox>
            <input
              type="text"
              id="name"
              required
              value={form.name}
              onChange={onChange}
            />
            <label htmlFor="name">이름</label>
            <IoManOutline />
          </InputBox>

          <InputBox>
            <input
              type="text"
              id="birthDate"
              required
              value={form.birthDate}
              onChange={onChange}
            />
            <label htmlFor="birthDate">생년월일</label>
            <IoCalendar />
          </InputBox>

          <InputBox>
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

          <InputBox>
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

          <InputBox>
            <input
              type="password"
              id="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={onChange}
            />
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <IoLockClosedOutline />
          </InputBox>

          <InputBox>
            <input
              type="email"
              id="email"
              required
              value={form.name}
              onChange={onChange}
            />
            <label htmlFor="email">이메일</label>
            <IoMailOutline />
          </InputBox>

          <Button type="submit">가입하기</Button>
        </Form>
      </FormBox>
    </Section>
  );
}
