// Find.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { osName } from "react-device-detect";
import PGLogo from "../../img/PGLogo.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  Login,
  ErrorMessage,
} from "../../style/Find.styles";
import { Logo, SubLogo } from "../../style/Login.styles";

// 아이콘
import { IoIdCardOutline, IoMailOutline } from "react-icons/io5";
import {
  apiFindUserId,
  apiFindUserPw,
  apiSendEmailVerification,
} from "../../components/api/backApi";
import customSwal from "../../style/customSwal.styles";

export default function Find() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 아이디,비밀번호 찾기 폼 제출시 이메일 리턴동안 막기
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFindId, setIsFindId] = useState(false); // false = 비밀번호 찾기, true = 아이디 찾기

  const [timedErrors, setTimedErrors] = useState<{
    name?: string;
    email?: string;
  }>({});

  const [timedErrorsPw, setTimedErrorsPw] = useState<{
    username?: string;
    email?: string;
  }>({});
  const FindIdSchema = z.object({
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요." })
      .email("올바른 이메일 형식이어야 합니다."),
  });
  type FindIdFormData = z.infer<typeof FindIdSchema>;
  const FindPwSchema = z.object({
    username: z.string().min(1, { message: "아이디를 입력해주세요." }),
    email: z
      .string()
      .min(1, { message: "이메일을 입력해주세요." })
      .email("올바른 이메일 형식이어야 합니다."),
  });
  type FindPwFormData = z.infer<typeof FindPwSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FindIdFormData>({
    resolver: zodResolver(FindIdSchema),
  });

  const {
    register: registerPw,
    handleSubmit: handleSubmitPw,
    formState: { errors: errorsPw },
  } = useForm<FindPwFormData>({
    resolver: zodResolver(FindPwSchema),
  });

  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: uuidv4(),
    deviceType: "",
    NotificationToken: uuidv4(),
  });
  useEffect(() => {
    if (errors.name || errors.email) {
      setTimedErrors({
        name: errors.name?.message,
        email: errors.email?.message,
      });

      const timer = setTimeout(() => {
        setTimedErrors({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errors]);
  useEffect(() => {
    if (errorsPw.username || errorsPw.email) {
      setTimedErrorsPw({
        username: errorsPw.username?.message,
        email: errorsPw.email?.message,
      });

      const timer = setTimeout(() => {
        setTimedErrorsPw({});
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorsPw]);

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

  const toggleMode = () => setIsFindId(!isFindId);

  const onSubmitFindId = async (data: FindIdFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await apiFindUserId(data.email, data.name);
      customSwal.fire({
        html: "이메일로 아이디가 전송되었습니다.",
        confirmButtonText: "확인",
        showCancelButton: false,
        didClose() {
          navigate("/member/login");
        },
      });
    } catch (error) {
      console.error("전송실패", error);
      alert("아이디 전송에 실패했습니다. 이메일 주소를 확인해주세요");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitFindPw = async (data: FindPwFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await apiFindUserPw(data.email, data.username);
      customSwal.fire({
        html: "이메일로 임시 비밀번호가 전송되었습니다.",
        confirmButtonText: "확인",
        showCancelButton: false,
        didClose() {
          navigate("/member/login");
        },
      });
    } catch (error) {
      console.error("전송실패", error);
      alert("비밀번호 전송에 실패했습니다. 이메일 주소를 확인해주세요");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className={isFindId ? "find-id" : "find-pw"}>
      <Link className="md:hidden block m-6 hover:invert" to={"/"}>
        <img src={PGLogo} alt="PG로고" />
      </Link>

      {/* 비밀번호 찾기 패널 */}
      <Panel $active={isFindId}>
        <Link to="/">
          <Logo src={PGLogo} alt="로고" $visible={isFindId} />
        </Link>
        <FormBox className={!isFindId ? "" : "active"}>
          <Form onSubmit={handleSubmitPw(onSubmitFindPw)}>
            <h2>비밀번호 찾기</h2>
            <InputBox>
              <input type="text" {...registerPw("username")} />
              <label htmlFor="username">아이디</label>
              <IoIdCardOutline />
              {timedErrorsPw.username && (
                <ErrorMessage>{timedErrorsPw.username}</ErrorMessage>
              )}
            </InputBox>
            <InputBox>
              <input type="text" {...registerPw("email")} />
              <label htmlFor="email">이메일</label>
              <IoMailOutline />
              {timedErrorsPw.email && (
                <ErrorMessage>{timedErrorsPw.email}</ErrorMessage>
              )}
            </InputBox>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? " 전송 중 ..." : " 비밀번호 찾기"}
            </Button>
            <ToggleText>
              아이디를 모르시나요? <span onClick={toggleMode}>아이디 찾기</span>
            </ToggleText>
            <Login>
              <Link to="/member/login">로그인 페이지로 돌아가기</Link>
            </Login>
          </Form>
        </FormBox>
      </Panel>

      {/* 아이디 찾기 패널 */}
      <Panel $active={!isFindId}>
        <Link to="/">
          <SubLogo src={PGLogo} alt="로고" $visible={!isFindId} />
        </Link>
        <FormBox className={isFindId ? "" : "active"}>
          <Form onSubmit={handleSubmit(onSubmitFindId)}>
            <h2>아이디 찾기</h2>
            <InputBox>
              <input type="text" {...register("name")} />
              <label htmlFor="name">사용자 이름</label>
              <IoIdCardOutline />
              {timedErrors.name && (
                <ErrorMessage>{timedErrors.name}</ErrorMessage>
              )}
            </InputBox>

            <InputBox>
              <input type="text" {...register("email")} />
              <label htmlFor="email">이메일</label>
              <IoMailOutline />
              {timedErrors.email && (
                <ErrorMessage>{timedErrors.email}</ErrorMessage>
              )}
            </InputBox>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? " 전송 중 ..." : " 아이디 찾기"}
            </Button>

            <ToggleText>
              아이디를 알고계신가요?
              <span onClick={toggleMode}>비밀번호 찾기</span>
            </ToggleText>

            <Login>
              <Link to="/member/login">로그인 페이지로 돌아가기</Link>
            </Login>
          </Form>
        </FormBox>
      </Panel>

      <RightText className="hidden md:block" $visible={isFindId}>
        FIND PASSWORD
      </RightText>
      <LeftText className="hidden md:block" $visible={!isFindId}>
        FIND ID
      </LeftText>
    </Section>
  );
}
