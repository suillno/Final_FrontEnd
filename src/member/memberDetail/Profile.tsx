import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

// 사용자 프로필 타입 정의
interface UserProfile {
  nickname: string;
  email: string;
  profileImage: string;
}

// Layout 컴포넌트에서 전달되는 context 타입 정의
interface LayoutContext {
  isSidebarOpen: boolean;
}

// ==== Styled-components 정의 ====

// 전체 페이지 레이아웃 - 사이드바 열림 여부에 따라 왼쪽 마진 조절
const PageWrapper = styled.div<{ isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  padding: 2em;
  background-color: #1e1f24;
  min-height: 100vh;
  margin-left: ${(props) => (props.isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;
`;

// 콘텐츠 박스 - 프로필/보안 설정을 담는 박스
const SectionBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

// 탭 메뉴 스타일
const TabMenu = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
`;

// 탭 버튼 - 선택된 상태는 색상 강조
const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  font-weight: bold;
  background-color: ${(props) => (props.active ? "#00bfff" : "#444")};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

// 각 섹션 타이틀
const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
`;

// 입력 필드 묶음
const Field = styled.div`
  margin-bottom: 16px;
`;

// 공통 인풋 필드
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #555;
  background-color: #1f1f1f;
  color: #fff;
`;

// 공통 버튼 - 색상 조절 가능
const Button = styled.button<{ color?: string }>`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => props.color || "#00bfff"};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: ${(props) =>
      props.color === "#4caf50" ? "#43a047" : "#008ecc"};
  }
`;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

// 2단계 인증 토글 라벨
const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  gap: 10px;
`;

// 체크박스 스타일
const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

// ==== 컴포넌트 구현 ====

const Profile: React.FC = () => {
  // 사이드바 열림 여부 가져오기
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 현재 탭 상태 (내 정보 / 보안 설정)
  const [tab, setTab] = useState<"profile" | "security">("profile");

  // 사용자 정보 상태
  const [user, setUser] = useState<UserProfile>({
    nickname: "게이머123",
    email: "gamer@example.com",
    profileImage: "/default-avatar.png",
  });

  // 수정 모드 여부
  const [editMode, setEditMode] = useState(false);

  // 2단계 인증 여부
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // 비밀번호 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 사용자 정보 텍스트 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 프로필 이미지 변경 핸들러 (미리보기 포함)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 프로필 저장 핸들러
  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("올바른 이메일을 입력해주세요.");
      return;
    }
    alert("프로필이 저장되었습니다.");
    setEditMode(false);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("모든 입력란을 채워주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (newPassword.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
    alert("비밀번호가 변경되었습니다.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // 2단계 인증 토글
  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    alert(
      `2단계 인증이 ${!twoFactorEnabled ? "활성화" : "비활성화"}되었습니다.`
    );
  };

  return (
    <PageWrapper isSidebarOpen={isSidebarOpen}>
      <SectionBox>
        {/* 탭 버튼 */}
        <TabMenu>
          <TabButton
            active={tab === "profile"}
            onClick={() => setTab("profile")}
          >
            내 정보
          </TabButton>
          <TabButton
            active={tab === "security"}
            onClick={() => setTab("security")}
          >
            보안 설정
          </TabButton>
        </TabMenu>

        {/* === 내 정보 탭 === */}
        {tab === "profile" && (
          <>
            <Title>내 정보</Title>
            <div style={{ textAlign: "center" }}>
              <ProfileImage src={user.profileImage} alt="프로필 이미지" />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              )}
            </div>

            <Field>
              <label>닉네임</label>
              <Input
                name="nickname"
                value={user.nickname}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Field>

            <Field>
              <label>이메일</label>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!editMode}
              />
            </Field>

            {editMode ? (
              <Button color="#4caf50" onClick={handleSave}>
                저장하기
              </Button>
            ) : (
              <Button onClick={() => setEditMode(true)}>수정하기</Button>
            )}
          </>
        )}

        {/* === 보안 설정 탭 === */}
        {tab === "security" && (
          <>
            <Title>보안 설정</Title>

            <Field>
              <label>현재 비밀번호</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Field>

            <Field>
              <label>새 비밀번호</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Field>

            <Field>
              <label>새 비밀번호 확인</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Field>

            <Button onClick={handlePasswordChange}>비밀번호 변경</Button>

            <Field>
              <label>2단계 인증</label>
              <ToggleLabel>
                <Checkbox
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={toggleTwoFactor}
                />
                {twoFactorEnabled ? "활성화됨" : "비활성화됨"}
              </ToggleLabel>
            </Field>
          </>
        )}
      </SectionBox>
    </PageWrapper>
  );
};

export default Profile;
