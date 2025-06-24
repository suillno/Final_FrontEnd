import { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { IoIdCardOutline, IoLockClosedOutline } from "react-icons/io5";
import bgImage from "../../img/g1.jpg";

const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300vw;
    transform: translate(35%, 0);
    background-image: linear-gradient(-45deg, #420583 0%, #420583 100%);
    transition: 1s ease-in-out;
    z-index: 6;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-right-radius: max(50vw, 50vh);
    border-top-left-radius: max(50vw, 50vh);
    z-index: -2;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(${bgImage}) no-repeat center center / cover;
    z-index: -3;
  }
  &.sign-in::before {
    transform: translate(0, 0);
    right: 50%;
  }

  &.sign-up::before {
    transform: translate(100%, 0);
    right: 50%;
  }
`;

const Panel = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.6s ease;
  transform: translateX(${(props) => (props.active ? "0%" : "100%")});
  opacity: ${(props) => (props.active ? 1 : 0)};
  pointer-events: ${(props) => (props.active ? "auto" : "none")};
`;

const FormBox = styled.div`
  width: 400px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 2em;
    color: #fff;
    margin-bottom: 20px;
  }
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 2px solid #fff;
  margin-bottom: 20px;

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
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
  font-weight: 600;
  margin-top: 10px;

  &:hover {
    background: #fff;
    color: black;
  }
`;

const ToggleText = styled.p`
  color: #fff;
  margin-top: 10px;

  span {
    font-weight: bold;
    cursor: pointer;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LeftText = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  font-size: clamp(1rem, 4vw, 4rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 255);
  user-select: none;
  pointer-events: none;
  transition: opacity 0.6s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const RightText = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  font-size: clamp(1rem, 4vw, 4rem);
  font-weight: 700;
  color: rgba(255, 255, 255, 255);
  user-select: none;
  pointer-events: none;
  transition: opacity 0.6s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

type LoginForm = {
  id: string;
  password: string;
};

type RegisterForm = {
  id: string;
  password: string;
  confirmPassword: string;
};

export default function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    id: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    id: "",
    password: "",
    confirmPassword: "",
  });

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });
  };

  const onChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterForm({ ...registerForm, [id]: value });
  };

  const onSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 시도:", loginForm);
  };

  const onSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 시도:", registerForm);
  };

  return (
    <Section className={isSignIn ? "sign-in" : "sign-up"}>
      {/* 회원가입 폼 (왼쪽) */}
      <Panel active={!isSignIn}>
        <FormBox>
          <Form onSubmit={onSubmitRegister}>
            <h2>회원가입</h2>

            <InputBox>
              <input
                type="text"
                id="id"
                required
                value={registerForm.id}
                onChange={onChangeRegister}
              />
              <label htmlFor="id">아이디</label>
              <IoIdCardOutline />
            </InputBox>

            <InputBox>
              <input
                type="password"
                id="password"
                required
                value={registerForm.password}
                onChange={onChangeRegister}
              />
              <label htmlFor="password">비밀번호</label>
              <IoLockClosedOutline />
            </InputBox>

            <InputBox>
              <input
                type="password"
                id="confirmPassword"
                required
                value={registerForm.confirmPassword}
                onChange={onChangeRegister}
              />
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <IoLockClosedOutline />
            </InputBox>

            <Button type="submit">회원가입</Button>

            <ToggleText>
              계정이 있으신가요? <span onClick={toggleMode}>로그인</span>
            </ToggleText>
          </Form>
        </FormBox>
      </Panel>

      {/* 로그인 폼 (오른쪽) */}
      <Panel active={isSignIn}>
        <FormBox>
          <Form onSubmit={onSubmitLogin}>
            <h2>로그인</h2>

            <InputBox>
              <input
                type="text"
                id="id"
                required
                value={loginForm.id}
                onChange={onChangeLogin}
              />
              <label htmlFor="id">아이디</label>
              <IoIdCardOutline />
            </InputBox>

            <InputBox>
              <input
                type="password"
                id="password"
                required
                value={loginForm.password}
                onChange={onChangeLogin}
              />
              <label htmlFor="password">비밀번호</label>
              <IoLockClosedOutline />
            </InputBox>

            <Button type="submit">로그인</Button>

            <ToggleText>
              계정이 없으신가요? <span onClick={toggleMode}>회원가입</span>
            </ToggleText>
          </Form>
        </FormBox>
      </Panel>
      <LeftText visible={isSignIn}>WELCOME BACK!</LeftText>
      <RightText visible={!isSignIn}>CREATE ACCOUNT</RightText>
    </Section>
  );
}
