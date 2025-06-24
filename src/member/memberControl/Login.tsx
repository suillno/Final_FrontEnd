// Login.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { osName } from "react-device-detect";
import axios from "axios";
// Redux 액션 및 토큰 저장 유틸
import { setUserInfo } from "../../components/auth/store/userInfo";
import { setCurrentUser } from "../../components/auth/helper/storage";
// 스타일 컴포넌트
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
} from "../../components/auth/Login.styles";

// 아이콘
import { IoIdCardOutline, IoLockClosedOutline } from "react-icons/io5";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인/회원가입 모드 전환 상태
  const [isSignIn, setIsSignIn] = useState(true);

  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });

  // 회원가입 폼 상태
  const [registerForm, setRegisterForm] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });

  // 디바이스 정보 상태
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: uuidv4(),
    deviceType: "",
    notificationToken: uuidv4(),
  });

  // 운영체제 감지하여 deviceType 설정
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
    setDeviceInfo((prev) => ({
      ...prev,
      deviceType: device,
    }));
  }, []);

  // 모드 전환
  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  // 로그인 폼 입력값 변경
  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });
  };

  // 회원가입 폼 입력값 변경
  const onChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterForm({ ...registerForm, [id]: value });
  };

  // 로그인 요청 처리
  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 서버로 전송할 데이터 구성
      const loginData = {
        username: loginForm.id,
        password: loginForm.password,
        deviceInfo: deviceInfo,
      };

      // 로그인 요청
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );
      const { accessToken, tokenType } = res.data;

      // 로그인 후 사용자 정보 조회
      const userRes = await axios.get("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: `${tokenType}${accessToken}`,
        },
      });

      // 토큰 및 사용자 정보 저장
      setCurrentUser(res.data);
      dispatch(setUserInfo(userRes.data));

      // 홈으로 이동
      navigate("/");
    } catch (err) {
      console.error("로그인 실패", err);
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  // 회원가입 요청 처리 (현재는 콘솔 출력만)
  const onSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 시도:", registerForm);
  };

  return (
    <Section className={isSignIn ? "sign-in" : "sign-up"}>
      {/* 회원가입 폼 */}
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

      {/* 로그인 폼 */}
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
            <Find>
              <Link to="/member/findid">아이디 찾기</Link>
              <Link to="/member/findpw">비밀번호 찾기</Link>
            </Find>
          </Form>
        </FormBox>
      </Panel>
      <LeftText visible={isSignIn}>WELCOME BACK!</LeftText>
      <RightText visible={!isSignIn}>CREATE ACCOUNT</RightText>
    </Section>
  );
}
