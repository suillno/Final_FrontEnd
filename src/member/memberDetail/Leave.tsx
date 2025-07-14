import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../components/auth/store/userInfo";
import { apiLeave } from "../../components/api/backApi";
import { removeUserInfo } from "../../components/auth/store/userInfo"; // ← 이거 정확한 위치 맞는지 확인
import customSwal from "../../style/customSwal.styles";

// 🔷 사이드바 상태 context 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

/* ======================== 💅 Styled-components ======================== */

const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2em;
  background-color: #1e1f24;
  margin-left: ${(props) => (props.$isSidebarOpen ? "180px" : "80px")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1.5em;
  }
`;

const SectionBox = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #555;
  background-color: #1f1f1f;
  color: #fff;
  font-size: 15px;

  &:disabled {
    background-color: #333;
    color: #aaa;
  }
`;

const Button = styled.button<{ color?: string }>`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => props.color || "#00bfff"};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 10px;

  &:hover {
    background-color: ${(props) =>
      props.color === "#e74c3c" ? "#c0392b" : "#008ecc"};
  }
`;

/* ======================== 📦 Leave (회원탈퇴) Component ======================== */

const Leave: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 가정: 사용자 정보는 로그인 시 받아온 값
  const userInfo = useSelector(selectUserInfo); // userId 호출

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const logout = () => {
    localStorage.removeItem("currentUser"); // ✅ localStorage에서 사용자 정보 제거
    dispatch(removeUserInfo()); // ✅ Redux 스토어 초기화
    navigate("/member/login"); // ✅ 로그인 페이지로 이동 (경로는 실제 경로에 맞게 수정)
  };
  const handleDeleteAccount = async () => {
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const confirmed = await window.confirm(
      "정말로 탈퇴하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      const result = await apiLeave(
        password,
        userInfo.username,
        userInfo.email
      );
      //   window.alert(result.message); // 서버 메시지 출력 (예: "회원탈퇴가 완료되었습니다.")

      customSwal
        .fire({
          text: String(result.message),
          icon: undefined,
          confirmButtonText: "확인",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // 로그아웃처리
            logout();
          }
        });
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "알 수 없는 오류가 발생했습니다.";
      alert(msg); // ← 백엔드에서 보낸 message 표시
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <SectionBox>
        <Title>회원탈퇴</Title>

        <Field>
          <label>아이디</label>
          <Input value={userInfo.username} disabled />
        </Field>

        <Field>
          <label>이메일</label>
          <Input value={userInfo.email} disabled />
        </Field>

        <Field>
          <label>비밀번호 확인</label>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        <Button type="submit" color="#e74c3c" onClick={handleDeleteAccount}>
          회원탈퇴
        </Button>
      </SectionBox>
    </PageWrapper>
  );
};

export default Leave;
