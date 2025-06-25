// Find.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { osName } from "react-device-detect";

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
} from "../../style/Find.styles";

// 아이콘
import { IoIdCardOutline, IoMailOutline } from "react-icons/io5";

export default function Find() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 아이디찾기/비밀번호찾기 모드 전환 상태
  const [isFindId, setIsFindId] = useState(true);

  // 아이디찾기 폼 상태
  const [findIdForm, setFindIdForm] = useState({
    email: "",
  });

  // 비밀번호 찾기 폼 상태
  const [findPwForm, setFindPwForm] = useState({
    id: "",
    email: "",
  });

  // 디바이스 정보 상태
  const [deviceInfo, setDeviceInfo] = useState({
    deviceId: uuidv4(),
    deviceType: "",
    NotificationToken: uuidv4(),
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
    setIsFindId(!isFindId);
  };

  // 아이디찾기 폼 입력값 변경
  const onChangeFindId = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFindIdForm({ ...findIdForm, [id]: value });
  };

  // 비밀번호찾기 폼 입력값 변경
  const onChangeFindPw = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFindPwForm({ ...findPwForm, [id]: value });
  };

  // 아이디찾기 요청 처리 (현재는 콘솔 출력만)
  const onSubmitFindPw = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("아이디찾기 시도:", findIdForm);
  };

  // 아이디찾기 요청 처리 (현재는 콘솔 출력만)
  const onSubmitFindId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("아이디찾기 시도:", findIdForm);
  };

  return (
    <Section className={isFindId ? "find-id" : "find-pw"}>
      {/* 아이디 찾기 폼 */}
      <Panel $active={!isFindId}>
        <FormBox>
          <Form onSubmit={onSubmitFindId}>
            <h2>아이디 찾기</h2>
            <InputBox>
              <input
                type="text"
                id="findId-email"
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
          </Form>
        </FormBox>
      </Panel>

      {/* 비밀번호 찾기 */}
      <Panel $active={isFindId}>
        <FormBox>
          <Form onSubmit={onSubmitFindPw}>
            <h2>비밀번호 찾기</h2>
            <InputBox>
              <input
                type="text"
                id="findPw-id"
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
                id="findPw-email"
                required
                value={findPwForm.email}
                onChange={onChangeFindPw}
              />
              <label htmlFor="email">이메일</label>
              <IoMailOutline />
            </InputBox>
            <Button type="submit">비밀번호 찾기</Button>
            <ToggleText>
              아이디를 모르시나요?<span onClick={toggleMode}>아이디 찾기</span>
            </ToggleText>
          </Form>
        </FormBox>
      </Panel>
      <LeftText $visible={isFindId}>FIND PASSWORD</LeftText>
      <RightText $visible={!isFindId}>FIND ID</RightText>
    </Section>
  );
}
