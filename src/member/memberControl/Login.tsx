import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { osName } from "react-device-detect";
import axios from "axios";
import PGLogo from "../../img/PGLogo.png";

// Redux 상태 저장 액션 및 로컬 저장소 유틸
import { setUserInfo } from "../../components/auth/store/userInfo";
import { setCurrentUser } from "../../components/auth/helper/storage";

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
} from "../../style/Login.styles";

// 아이콘
import {
  IoIdCardOutline,
  IoLockClosedOutline,
  IoMailOutline,
} from "react-icons/io5";

// 로그인 페이지 컴포넌트 정의
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인/회원가입 모드 상태 (true면 로그인 화면)
  const [isSignIn, setIsSignIn] = useState(true);

  // 로그인 폼 상태
  const [loginForm, setLoginForm] = useState({
    loginId: "",
    loginPassword: "",
  });

  // 회원가입 폼 상태
  const [registerForm, setRegisterForm] = useState({
    registerId: "", // 아이디
    registerPassword: "", // 비밀번호
    registerConfirmPassword: "", // 비밀번호 확인
    registerName: "", // 이름
    registerBirth: "", // 생년월일 (예: "1995-08-15")
    registerEmail: "", // 본인확인 이메일
    registerEmailCode: "", // 이메일 인증번호
    registerPhone: "", // 휴대전화 번호
  });

  // 디바이스 정보 상태
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: uuidv4(), // 랜덤 UUID 생성
    deviceType: "",
    notificationToken: uuidv4(), // 알림 토큰 대체용 UUID
  });

  // 브라우저의 OS명을 기반으로 deviceType 설정
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

    // deviceType 업데이트
    setDeviceInfo((prev) => ({
      ...prev,
      deviceType: device,
    }));
  }, []);

  // 로그인/회원가입 모드 전환 함수
  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  // 로그인 입력 필드 변경 핸들러
  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({ ...loginForm, [id]: value });
  };

  // 회원가입 입력 필드 변경 핸들러
  const onChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterForm({ ...registerForm, [id]: value });
  };

  // 로그인 폼 제출 처리
  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 서버로 보낼 로그인 데이터 구성
      const loginData = {
        username: loginForm.loginId,
        password: loginForm.loginPassword,
        deviceInfo: deviceInfo,
      };

      // 로그인 요청
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );
      const { accessToken, tokenType } = res.data;

      // 사용자 정보 요청
      const userRes = await axios.get("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: `${tokenType}${accessToken}`,
        },
      });

      // 사용자 정보 및 토큰 저장
      setCurrentUser(res.data);
      dispatch(setUserInfo(userRes.data));

      // 로그인 성공 시 홈으로 이동
      navigate("/");
    } catch (err) {
      console.error("로그인 실패", err);
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  // 회원가입 폼 제출 처리 (현재는 서버 연동 없음)
  const onSubmitRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 시도:", registerForm);
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
        <div className="h-[600px] overflow-auto">
          <FormBox className={!isSignIn ? "active" : ""}>
            <Form onSubmit={onSubmitRegister}>
              <h2>회원가입</h2>
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
              </InputBox>

              {/* 휴대전화 */}
              <InputBox>
                <input
                  type="tel"
                  id="registerPhone"
                  required
                  value={registerForm.registerPhone}
                  onChange={onChangeRegister}
                />
                <label htmlFor="registerPhone">휴대전화</label>
              </InputBox>
              <Button type="submit">회원가입</Button>
              <ToggleText>
                계정이 있으신가요? <span onClick={toggleMode}>로그인</span>
              </ToggleText>
            </Form>
          </FormBox>
        </div>
      </SignPanel>

      {/* 로그인 패널 */}
      <Panel $active={isSignIn}>
        <Link to={"/"}>
          <SubLogo src={PGLogo} alt="PG로고" $visible={isSignIn} />
        </Link>
        <FormBox className={isSignIn ? "active" : ""}>
          <Form onSubmit={onSubmitLogin}>
            <h2>로그인</h2>
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
