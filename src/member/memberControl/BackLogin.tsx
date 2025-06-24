import { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { IoIdCardOutline, IoLockClosedOutline } from "react-icons/io5";
import bgImage from "../../img/g1.jpg";
import { Link } from "react-router-dom";

//  styled-components 변환
const Section = styled.section<{ isSignIn: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: all 1s ease;

  &.sign-in {
    background: url(${bgImage}) no-repeat center center / cover;
  }

  &.sign-up {
    background: url(${bgImage}) no-repeat center center / cover;
    transform: translateX(-50%);
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
  transition: transform 0.6s ease-in-out;
`;

const Form = styled.form<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
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
  margin: -15px 20px 10;
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
  margin-top: 10px;
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
  margin: 10px 0 10px;

  a {
    text-decoration: none;
    color: #fff;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
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

const Find = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 5px 0 20px;

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

type SignupForm = {
  id: string;
  password: string;
  confirmPassword: string;
  email: string;
  name: string;
  birthDate: string;
};

// 컴포넌트
export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    id: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState<SignupForm>({
    id: "",
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
    birthDate: "",
  });

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });
  };

  const onChangeSignup = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupForm({ ...signupForm, [id]: value });
  };

  const onSubmitLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 폼 제출:", loginForm);
  };

  const onSubmitSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 폼 제출:", signupForm);
  };

  return (
    <Section className={isSignIn ? "sign-in" : "sign-up"} isSignIn={isSignIn}>
      <FormBox>
        {/* 로그인 폼 */}
        <Form onSubmit={onSubmitLogin} isVisible={isSignIn}>
          <h2>로그인</h2>

          <InputBox style={{ marginBottom: "10px" }}>
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

          <InputBox style={{ marginBottom: "10px" }}>
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

          <Forget>
            <label>
              <input type="checkbox" /> 로그인 상태 유지
            </label>
          </Forget>

          <Button type="submit">로그인</Button>

          <div>
            <ToggleText>
              <p>
                계정이 없으신가요?{" "}
                <span
                  onClick={toggleMode}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  가입하기
                </span>
              </p>
            </ToggleText>

            <Find>
              <Link to={"../../member/findid"}>
                <a>아이디 찾기</a>
              </Link>
              <Link to={"../../member/findpw"}>
                <a href="#">비밀번호 찾기</a>
              </Link>
            </Find>
          </div>
        </Form>

        {/* 회원가입 폼 */}
        <Form onSubmit={onSubmitSignup} isVisible={!isSignIn}>
          <h2>회원가입</h2>

          <InputBox>
            <input
              type="text"
              id="id"
              required
              value={signupForm.id}
              onChange={onChangeSignup}
            />
            <label htmlFor="id">아이디</label>
            <IoIdCardOutline />
          </InputBox>

          <InputBox>
            <input
              type="password"
              id="password"
              required
              value={signupForm.password}
              onChange={onChangeSignup}
            />
            <label htmlFor="password">비밀번호</label>
            <IoLockClosedOutline />
          </InputBox>

          <InputBox>
            <input
              type="password"
              id="confirmPassword"
              required
              value={signupForm.confirmPassword}
              onChange={onChangeSignup}
            />
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <IoLockClosedOutline />
          </InputBox>

          <Button type="submit">회원가입</Button>

          <ToggleText style={{ marginBottom: "10px" }}>
            계정이 있으신가요? <span onClick={toggleMode}>로그인</span>
          </ToggleText>
        </Form>
      </FormBox>
    </Section>
  );
}
