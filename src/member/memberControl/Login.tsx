// LoginPage.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { osName } from "react-device-detect";
import PGLogo from "../../img/PGLogo.png";

// 상태 저장 및 로컬 저장소 유틸
import { setUserInfo } from "../../components/auth/store/userInfo";
import { setCurrentUser } from "../../components/auth/helper/storage";

// API 함수 호출
import {
  apiRegisterUser,
  apiCheckUsername,
  apiCheckEmail,
} from "../../components/api/backApi";

// 스타일 컴포넌트 불러오기
import {
  Section,
  Panel,
  FormBox,
  Form,
  InputBox,
  Button,
  ToggleText,
  LeftText,
  RightText,
  Find,
  Logo,
  SubLogo,
  SignPanel,
  CheckButton,
  H2,
  Div,
} from "../../style/Login.styles";

// 아이콘
import {
  IoCheckmarkCircleOutline,
  IoIdCardOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoCalendar,
} from "react-icons/io5";
import axios from "axios";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인/회원가입 모드 상태
  const [isSignIn, setIsSignIn] = useState(true);

  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState({
    loginId: "",
    loginPassword: "",
  });

  // 회원가입 폼 상태
  const [registerForm, setRegisterForm] = useState({
    registerId: "",
    registerPassword: "",
    registerConfirmPassword: "",
    registerName: "",
    registerBirth: "",
    registerEmail: "",
    registerEmailCode: "",
  });

  // 디바이스 정보 상태
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: uuidv4(),
    deviceType: "",
    notificationToken: uuidv4(),
  });

  // OS 기반 deviceType 설정
  useEffect(() => {
    let device = "";
    switch (osName) {
      case "Windows":
        device = "DEVICE_TYPE_WINDOWS";
        break;
      case "Mac OS":
        device = "DEVICE_TYPE_MACOS";
        break;
      case "Android":
        device = "DEVICE_TYPE_ANDROID";
        break;
      case "iOS":
        device = "DEVICE_TYPE_IOS";
        break;
      default:
        device = "OTHERS";
    }
    setDeviceInfo((prev) => ({ ...prev, deviceType: device }));
  }, []);

  // 로그인/회원가입 전환
  const toggleMode = () => setIsSignIn(!isSignIn);

  // 입력값 변경 핸들러
  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });
  };
  const onChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterForm({ ...registerForm, [id]: value });
  };

  // 아이디 중복 확인
  const checkUsername = async () => {
    if (!registerForm.registerId) return alert("아이디를 입력하세요.");
    try {
      const res = await apiCheckUsername(registerForm.registerId);
      alert(res.data);
    } catch (err) {
      alert("아이디 중복 확인 실패");
    }
  };

  // 이메일 중복 확인
  const checkEmail = async () => {
    if (!registerForm.registerEmail) return alert("이메일을 입력하세요.");
    try {
      const res = await apiCheckEmail(registerForm.registerEmail);
      alert(res.data);
    } catch (err) {
      alert("이메일 중복 확인 실패");
    }
  };

  // 로그인 처리
  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginData = {
        username: loginForm.loginId,
        password: loginForm.loginPassword,
        deviceInfo,
      };
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );
      const { accessToken, tokenType } = res.data;
      const userRes = await axios.get("http://localhost:8080/api/user/me", {
        headers: { Authorization: `${tokenType}${accessToken}` },
      });
      setCurrentUser(res.data);
      dispatch(setUserInfo(userRes.data));
      navigate("/");
    } catch (err) {
      alert("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  // 회원가입 처리
  const onSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      registerForm.registerPassword !== registerForm.registerConfirmPassword
    ) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const registerData = {
        username: registerForm.registerId,
        password: registerForm.registerPassword,
        name: registerForm.registerName,
        birth: registerForm.registerBirth,
        email: registerForm.registerEmail,
        roleNum: 1, // 기본 회원 등급
      };
      const res = await apiRegisterUser(registerData);
      alert(res);
      setIsSignIn(true);
    } catch (err) {
      alert("회원가입 중 오류 발생");
    }
  };

  return (
    <Section className={isSignIn ? "sign-in" : "sign-up"}>
      <Link className="md:hidden block m-6 hover:invert" to={"/"}>
        <img src={PGLogo} alt="PG로고" />
      </Link>
      {/* 회원가입 패널 */}
      <SignPanel $active={!isSignIn}>
        <Link to={"/"}>
          <Logo src={PGLogo} alt="PG로고" $visible={!isSignIn} />
        </Link>
        <Div
          className={
            isSignIn ? "h-[600px] sign-in" : "h-[600px] sign-up active"
          }
        >
          <H2>회원가입</H2>
          <FormBox className={!isSignIn ? "active" : ""}>
            <Form onSubmit={onSubmitRegister}>
              {/* 아이디 입력 + 중복확인 */}
              <InputBox>
                <input
                  type="text"
                  id="registerId"
                  required
                  value={registerForm.registerId}
                  onChange={onChangeRegister}
                />
                <label htmlFor="registerId">아이디</label>
                <IoIdCardOutline />
                <CheckButton type="button" onClick={checkUsername}>
                  중복확인
                </CheckButton>
              </InputBox>
              <InputBox>
                <input
                  type="password"
                  id="registerPassword"
                  required
                  value={registerForm.registerPassword}
                  onChange={onChangeRegister}
                />
                <label htmlFor="registerPassword">비밀번호</label>
                <IoLockClosedOutline />
              </InputBox>
              <InputBox>
                <input
                  type="password"
                  id="registerConfirmPassword"
                  required
                  value={registerForm.registerConfirmPassword}
                  onChange={onChangeRegister}
                />
                <label htmlFor="registerConfirmPassword">비밀번호 확인</label>
                <IoLockClosedOutline />
              </InputBox>
              {/* 이름 */}
              <InputBox>
                <input
                  type="text"
                  id="registerName"
                  required
                  value={registerForm.registerName}
                  onChange={onChangeRegister}
                />
                <label htmlFor="registerName">이름</label>
                <IoIdCardOutline />
              </InputBox>

              {/* 생년월일 */}
              <InputBox>
                <input
                  type="date"
                  id="registerBirth"
                  required
                  value={registerForm.registerBirth}
                  onChange={onChangeRegister}
                />
                <label htmlFor="registerBirth">생년월일</label>
              </InputBox>

              {/* 이메일 인증 */}
              <InputBox>
                <input
                  type="email"
                  id="registerEmail"
                  required
                  value={registerForm.registerEmail}
                  onChange={onChangeRegister}
                />
                <label htmlFor="registerEmail">본인확인 이메일</label>
                <CheckButton type="button" onClick={checkEmail}>
                  중복확인
                </CheckButton>
                <IoMailOutline />
              </InputBox>

              {/* 인증번호 입력칸 */}
              <InputBox>
                <input
                  type="text"
                  id="registerEmailCode"
                  required
                  value={registerForm.registerEmailCode}
                  onChange={onChangeRegister}
                />
                <label htmlFor="registerEmailCode">인증번호 입력</label>
                <IoCheckmarkCircleOutline />
              </InputBox>
            </Form>
            <Button type="submit">회원가입</Button>
            <ToggleText>
              계정이 있으신가요? <span onClick={toggleMode}>로그인</span>
            </ToggleText>
          </FormBox>
        </Div>
      </SignPanel>

      {/* 로그인 패널 */}
      <Panel $active={isSignIn}>
        <Link to={"/"}>
          <SubLogo src={PGLogo} alt="PG로고" $visible={isSignIn} />
        </Link>
        <FormBox className={isSignIn ? "active" : ""} $isLogin={isSignIn}>
          <Form onSubmit={onSubmitLogin}>
            <H2>로그인</H2>
            <InputBox>
              <input
                type="text"
                id="loginId"
                required
                value={loginForm.loginId}
                onChange={onChangeLogin}
              />
              <label htmlFor="loginId">아이디</label>
              <IoIdCardOutline />
            </InputBox>
            <InputBox>
              <input
                type="password"
                id="loginPassword"
                required
                value={loginForm.loginPassword}
                onChange={onChangeLogin}
              />
              <label htmlFor="loginPassword">비밀번호</label>
              <IoLockClosedOutline />
            </InputBox>
            <Button type="submit">로그인</Button>
            <ToggleText>
              계정이 없으신가요? <span onClick={toggleMode}>회원가입</span>
            </ToggleText>
            <Find>
              <Link to="/member/find">아이디 | 비밀번호 찾기</Link>
            </Find>
          </Form>
        </FormBox>
      </Panel>

      {/* 모드별 텍스트 */}
      <LeftText className="hidden md:block" $visible={isSignIn}>
        WELCOME BACK!
      </LeftText>
      <RightText className="hidden md:block" $visible={!isSignIn}>
        CREATE ACCOUNT
      </RightText>
    </Section>
  );
}
