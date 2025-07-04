// Find.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { osName } from "react-device-detect";
import PGLogo from "../../img/PGLogo.png";

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
} from "../../style/Find.styles";
import { Logo, SubLogo } from "../../style/Login.styles";

// 아이콘
import { IoIdCardOutline, IoMailOutline } from "react-icons/io5";

export default function Find() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFindId, setIsFindId] = useState(false); // false = 비밀번호 찾기, true = 아이디 찾기

  const [findIdForm, setFindIdForm] = useState({
    name: "",
    email: "",
  });

  const [findPwForm, setFindPwForm] = useState({
    id: "",
    email: "",
  });

  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: uuidv4(),
    deviceType: "",
    NotificationToken: uuidv4(),
  });

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

  const onChangeFindId = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFindIdForm({ ...findIdForm, [id]: value });
  };

  const onChangeFindPw = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFindPwForm({ ...findPwForm, [id]: value });
  };

  const onSubmitFindId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("아이디찾기 시도:", findIdForm);
    alert("이메일로 아이디가 전송되었습니다.");
  };

  const onSubmitFindPw = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("비밀번호찾기 시도:", findPwForm);
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
          <Form onSubmit={onSubmitFindPw}>
            <h2>비밀번호 찾기</h2>
            <InputBox>
              <input
                type="text"
                id="id"
                required
                value={findPwForm.id}
                onChange={onChangeFindPw}
              />
              <label htmlFor="id">아이디</label>
              <IoIdCardOutline />
            </InputBox>
            <InputBox>
              <input
                type="text"
                id="email"
                required
                value={findPwForm.email}
                onChange={onChangeFindPw}
              />
              <label htmlFor="email">이메일</label>
              <IoMailOutline />
            </InputBox>
            <Button type="submit">비밀번호 찾기</Button>
            <ToggleText>
              아이디를 모르시나요?
              <span onClick={toggleMode}>아이디 찾기</span>
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
          <Form onSubmit={onSubmitFindId}>
            <h2>아이디 찾기</h2>
            <InputBox>
              <input
                type="text"
                id="name"
                required
                value={findIdForm.name}
                onChange={onChangeFindId}
              />
              <label htmlFor="name">사용자 이름</label>
              <IoIdCardOutline />
            </InputBox>
            <InputBox>
              <input
                type="text"
                id="email"
                required
                value={findIdForm.email}
                onChange={onChangeFindId}
              />
              <label htmlFor="email">이메일</label>
              <IoMailOutline />
            </InputBox>
            <Button type="submit">아이디 찾기</Button>
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
