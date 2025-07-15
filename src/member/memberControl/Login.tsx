// LoginPage.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { osName } from "react-device-detect";
import PGLogo from "../../img/PGLogo.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiLogVisitor } from "../../components/api/backApi";
// 상태 저장 및 로컬 저장소 유틸
import { setUserInfo } from "../../components/auth/store/userInfo";
import { setCurrentUser } from "../../components/auth/helper/storage";

// API 함수 호출
import {
  apiRegisterUser,
  apiCheckUsername,
  apiCheckEmail,
  apiSendEmailVerification,
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
  ErrorMessage,
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

  // 이메일 인증코드
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // 디바이스 정보 상태
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: uuidv4(),
    deviceType: "",
    notificationToken: uuidv4(),
  });
  // zod 조건식
  const loginSchema = z.object({
    loginId: z.string().nonempty("아이디를 입력하세요."),
    loginPassword: z.string().nonempty("비밀번호를 입력하세요."),
  });
  type LoginFormType = z.infer<typeof loginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  });

  // 회원가입 zod 조건식
  const registrationSchema = z
    .object({
      username: z.string().min(3, "아이디는 최소 3자 이상이어야 합니다."),
      email: z.string().email("이메일 형식에 맞지 않습니다."),
      password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
      confirmPassword: z.string().min(4, "비밀번호 확인을 입력해주세요."),
      name: z.string().min(1, "이름을 입력해주세요."),
      birth: z
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          "생년월일은 YYYY-MM-DD 형식으로 입력해주세요."
        ),
      confirmCode: z
        .string()
        .regex(/^\d{6}$/, "6자리 숫자 인증번호를 입력해주세요."),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["confirmPassword"],
    });
  type RegisterFormType = z.infer<typeof registrationSchema>;
  const {
    register: registerUser,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors },
    watch: watchRegister,
  } = useForm<RegisterFormType>({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
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
    const watchedUsername = watchRegister("username");

    if (!watchedUsername) {
      alert("아이디를 입력하세요.");
      return;
    }
    try {
      const res = await apiCheckUsername(watchedUsername);
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

  // 이메일 인증번호 요청 버튼
  const sendEmailAuthCode = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/mail", {
        params: {
          mailTo: registerForm.registerEmail,
          subject: "인증메일",
          mailType: "emailAuth",
          username: registerForm.registerName,
        },
      });
      alert("인증 메일이 발송되었습니다!");
    } catch (err) {
      alert("이메일 발송 실패");
    }
  };

  // 인증번호 검증
  const verifyEmailCode = async () => {
    const watchedEmail = watchRegister("email");
    const watchedCode = watchRegister("confirmCode");

    if (!watchedEmail || !watchedCode) {
      alert("이메일과 인증번호를 모두 입력해주세요!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/mail/verify",
        {
          mailTo: watchedEmail,
          authCode: watchedCode,
        }
      );
      alert(res.data); // 인증 성공
      setIsEmailVerified(true);
    } catch (err) {
      alert("인증 실패");
    }
  };

  const sendEmailVerification = async () => {
    const watchedEmail = watchRegister("email");
    const watchedName = watchRegister("name");
    if (!watchedEmail) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const emailData = {
        mailTo: watchedEmail,
        username: watchedName,
        mailType: "emailAuth",
      };
      const res = await apiSendEmailVerification(emailData);
      alert(res.message || "인증코드가 전송되었습니다!");
    } catch (err) {
      alert("인증코드 발송 실패");
    }
  };

  // 로그인 처리
  const onSubmitLogin = async (data: LoginFormType) => {
    console.log("로그인 제출 데이터:", data);
    try {
      const loginData = {
        username: data.loginId,
        password: data.loginPassword,
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
      // 방문자 기록 호출
      await apiLogVisitor();
      navigate("/");
      console.log("로그인 요청 바디:", loginData);
    } catch (err) {
      alert("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  // 회원가입 처리
  const onSubmitRegisterZod = async (data: RegisterFormType) => {
    if (!isEmailVerified) {
      alert("이메일 인증을 먼저 완료해주세요.");
      return;
    }

    try {
      const registerData = {
        username: data.username,
        password: data.password,
        name: data.name,
        birth: data.birth,
        email: data.email,
        roleNum: 3,
      };
      const res = await apiRegisterUser(registerData);
      alert("회원가입 성공!");
      setIsSignIn(true);
    } catch (err) {
      alert("회원가입 중 오류 발생");
      if (axios.isAxiosError(err)) {
        console.error("회원가입 실패", err.response?.data);
      }
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
            <Form
              id="register-form"
              onSubmit={handleSubmitRegister(onSubmitRegisterZod)}
            >
              {/* 아이디 입력 + 중복확인 */}
              <InputBox style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  {...registerUser("username")}
                  placeholder="아이디"
                />
                <label htmlFor="registerId">아이디</label>
                <IoIdCardOutline />
                {registerErrors.username && (
                  <ErrorMessage>{registerErrors.username.message}</ErrorMessage>
                )}
                <CheckButton type="button" onClick={checkUsername}>
                  중복확인
                </CheckButton>
              </InputBox>
              <InputBox>
                <input
                  type="password"
                  {...registerUser("password")}
                  placeholder="비밀번호"
                />
                <label htmlFor="registerPassword">비밀번호</label>
                <IoLockClosedOutline />
                {registerErrors.password && (
                  <ErrorMessage>{registerErrors.password.message}</ErrorMessage>
                )}
              </InputBox>
              <InputBox>
                <input
                  type="password"
                  {...registerUser("confirmPassword")}
                  placeholder="비밀번호 확인"
                />
                <label htmlFor="registerConfirmPassword">비밀번호 확인</label>
                <IoLockClosedOutline />
                {registerErrors.confirmPassword && (
                  <ErrorMessage>
                    {registerErrors.confirmPassword.message}
                  </ErrorMessage>
                )}
              </InputBox>
              {/* 이름 */}
              <InputBox>
                <input
                  type="text"
                  {...registerUser("name")}
                  placeholder="이름"
                />
                <label htmlFor="registerName">이름</label>
                <IoIdCardOutline />
                {registerErrors.name && (
                  <ErrorMessage>{registerErrors.name.message}</ErrorMessage>
                )}
              </InputBox>

              {/* 생년월일 */}
              <InputBox>
                <input
                  type="date"
                  {...registerUser("birth")}
                  placeholder="YYYY-MM-DD"
                />
                <label htmlFor="registerBirth">생년월일</label>
                {registerErrors.birth && (
                  <ErrorMessage>{registerErrors.birth.message}</ErrorMessage>
                )}
              </InputBox>

              {/* 이메일 인증 */}
              <InputBox>
                <input
                  type="text"
                  {...registerUser("email")}
                  placeholder="이메일"
                />
                <label htmlFor="registerEmail">본인확인 이메일</label>
                {/* <CheckButton type="button" onClick={checkEmail}>
                  중복확인
                </CheckButton> */}
                <CheckButton type="button" onClick={sendEmailVerification}>
                  인증코드 전송
                </CheckButton>
                <IoMailOutline />
                {registerErrors.email && (
                  <ErrorMessage>{registerErrors.email.message}</ErrorMessage>
                )}
              </InputBox>

              {/* 인증번호 입력칸 */}
              <InputBox>
                <input
                  type="text"
                  {...registerUser("confirmCode")}
                  placeholder="인증코드"
                />
                <label htmlFor="registerEmailCode">인증번호 입력</label>
                <CheckButton type="button" onClick={verifyEmailCode}>
                  인증번호 확인
                </CheckButton>
                <IoCheckmarkCircleOutline />
                {registerErrors.confirmCode && (
                  <ErrorMessage>
                    {registerErrors.confirmCode.message}
                  </ErrorMessage>
                )}
              </InputBox>
            </Form>
            <Button type="submit" form="register-form">
              회원가입
            </Button>
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
          <Form onSubmit={handleSubmit(onSubmitLogin)} noValidate>
            <H2>로그인</H2>
            <InputBox>
              <input
                type="text"
                id="loginId"
                {...register("loginId")}
                autoComplete="username"
              />
              <label htmlFor="loginId">아이디</label>
              <IoIdCardOutline />
              {errors.loginId && (
                <ErrorMessage>{errors.loginId.message}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <input
                type="password"
                id="loginPassword"
                {...register("loginPassword")}
                autoComplete="current-password"
              />
              <label htmlFor="loginPassword">비밀번호</label>
              <IoLockClosedOutline />
              {errors.loginPassword && (
                <ErrorMessage>{errors.loginPassword.message}</ErrorMessage>
              )}
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
