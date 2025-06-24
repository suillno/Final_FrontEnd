import { useState } from "react";
import styled from "styled-components";
import { IoIdCardOutline, IoLockClosedOutline } from "react-icons/io5";
import bgImage from "../../img/g1.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

//  styled-components
const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background: url(${bgImage}) no-repeat center center / cover;
`;

const FormBox = styled.div`
  position: relative;
  width: 400px;
  height: 500px;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
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

// TypeScript 타입
type LoginForm = {
  id: string;
  password: string;
};

type SignupForm = {
  id: string;
  password: string;
  confirmPassword: string;
};

export default function LoginSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignIn = location.pathname === "/login";

  const [loginForm, setLoginForm] = useState<LoginForm>({
    id: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState<SignupForm>({
    id: "",
    password: "",
    confirmPassword: "",
  });

  const toggleMode = () => {
    navigate(isSignIn ? "/signup" : "/login");
  };

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });
  };

  const onChangeSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupForm({ ...signupForm, [id]: value });
  };

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("로그인 폼 제출:", loginForm);
  };

  const onSubmitSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 폼 제출:", signupForm);
  };

  return (
    <Section>
      <FormBox>
        <AnimatePresence mode="wait">
          {isSignIn ? (
            <FormWrapper
              key="login"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
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

                <Forget>
                  <label>
                    <input type="checkbox" /> 로그인 상태 유지
                  </label>
                </Forget>

                <Button type="submit">로그인</Button>

                <ToggleText>
                  계정이 없으신가요? <span onClick={toggleMode}>회원가입</span>
                </ToggleText>

                <Find>
                  <Link to="/findid">아이디 찾기</Link>
                  <Link to="/findpw">비밀번호 찾기</Link>
                </Find>
              </Form>
            </FormWrapper>
          ) : (
            <FormWrapper
              key="signup"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Form onSubmit={onSubmitSignup}>
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

                <ToggleText>
                  이미 계정이 있으신가요?{" "}
                  <span onClick={toggleMode}>로그인</span>
                </ToggleText>
              </Form>
            </FormWrapper>
          )}
        </AnimatePresence>
      </FormBox>
    </Section>
  );
}
