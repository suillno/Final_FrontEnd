// Login.tsx
import {
  Section,
  FormBox,
  Form,
  InputBox,
  Forget,
  Button,
  Register,
  Find,
} from "../../components/auth/Login.styles"; // 스타일 컴포넌트
import { IoIdCardOutline, IoLockClosedOutline } from "react-icons/io5"; // 아이콘
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { v4 } from "uuid";
import { osName } from "react-device-detect";
import axios from "axios";

import { setUserInfo } from "../../components/auth/store/userInfo";
import {
  setCurrentUser,
  getCurrentUser,
} from "../../components/auth/helper/storage";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    deviceInfo: {
      deviceId: v4(),
      deviceType: "",
      notificationToken: v4(),
    },
  });

  // 입력값 변경 처리
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 로그인 요청 처리
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );
      const { accessToken, tokenType } = res.data;

      const result = await axios.get("http://localhost:8080/api/user/me", {
        headers: {
          Authorization: `${tokenType}${accessToken}`,
        },
      });

      // 저장
      setCurrentUser(res.data);
      dispatch(setUserInfo(result.data));
      navigate("/");
    } catch (err) {
      console.error("로그인 실패", err);
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 운영체제 감지 및 설정
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

    setLoginData((prev) => ({
      ...prev,
      deviceInfo: {
        ...prev.deviceInfo,
        deviceType: device,
      },
    }));

    // 디버그 확인용
    console.log("현재 로그인 사용자:", getCurrentUser());
  }, []);

  // UI 렌더링
  return (
    <Section>
      <FormBox>
        <Form onSubmit={onSubmit}>
          <h2>로그인</h2>

          {/* 아이디 입력 */}
          <InputBox style={{ marginBottom: "10px" }}>
            <input
              type="text"
              id="username"
              value={loginData.username}
              onChange={onChange}
              required
            />
            <label htmlFor="username">아이디</label>
            <IoIdCardOutline />
          </InputBox>

          {/* 비밀번호 입력 */}
          <InputBox style={{ marginBottom: "10px" }}>
            <input
              type="password"
              id="password"
              value={loginData.password}
              onChange={onChange}
              required
            />
            <label htmlFor="password">비밀번호</label>
            <IoLockClosedOutline />
          </InputBox>

          {/* 로그인 상태 유지 */}
          <Forget>
            <label>
              <input type="checkbox" /> 로그인 상태 유지
            </label>
          </Forget>

          {/* 로그인 버튼 */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>

          {/* 회원가입/아이디/비밀번호 찾기 링크 */}
          <Register>
            <p>
              계정이 없으신가요? <Link to="/member/signup">가입하기</Link>
            </p>
          </Register>

          <Find>
            <Link to="/member/findid">아이디 찾기</Link>
            <Link to="/member/findpw">비밀번호 찾기</Link>
          </Find>
        </Form>
      </FormBox>
    </Section>
  );
}
