import React, { useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";

// 🔷 사용자 프로필 타입 정의
interface UserProfile {
  nickname: string;
  email: string;
  profileImage: string;
}

// 🔷 Layout에서 전달되는 Context 타입 정의 (사이드바 열림 여부 전달용)
interface LayoutContext {
  isSidebarOpen: boolean;
}

/* ======================== 💅 Styled-components ======================== */

// ✅ 전체 페이지 래퍼 - 사이드바 열림 여부에 따라 왼쪽 여백만 조정
const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center; // 수평 가운데 정렬
  align-items: center; // 수직 가운데 정렬 (모바일 포함)
  min-height: 100vh; // 전체 뷰포트 높이
  padding: 2em;
  background-color: #1e1f24;
  margin-left: ${(props) =>
    props.$isSidebarOpen ? "180px" : "80px"}; // 사이드바에 따른 margin 조절
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0; // 모바일에서는 margin 제거
    padding: 1.5em;
  }
`;

// ✅ 프로필/보안 설정을 감싸는 컨테이너 박스
const SectionBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

// ✅ 상단 탭 메뉴 (내 정보 / 보안 설정)
const TabMenu = styled.div`
  display: flex;
  margin-bottom: 20px;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

// ✅ 탭 버튼 (선택된 탭은 색상 강조)
const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px;
  font-weight: bold;
  background-color: ${(props) => (props.$active ? "#00bfff" : "#444")};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;

  @media (max-width: 480px) {
    font-size: 15px;
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
      props.color === "#4caf50" ? "#43a047" : "#008ecc"};
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  gap: 10px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

/* ======================== 📦 Profile Component ======================== */

const Profile: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>(); // 사이드바 열림 상태 받아오기

  const [tab, setTab] = useState<"profile" | "security">("profile"); // 탭 상태
  const [user, setUser] = useState<UserProfile>({
    nickname: "게이머123",
    email: "gamer@example.com",
    profileImage: "/default-avatar.png",
  });

  const [editMode, setEditMode] = useState(false); // 수정모드 on/off
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false); // 2FA 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 닉네임/이메일 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 이미지 업로드 처리 (미리보기)
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

  // 🔹 저장 버튼 처리
  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("올바른 이메일을 입력해주세요.");
      return;
    }
    alert("프로필이 저장되었습니다.");
    setEditMode(false);
  };

  // 🔹 비밀번호 변경 처리
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

  // 🔹 2단계 인증 토글
  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    alert(
      `2단계 인증이 ${!twoFactorEnabled ? "활성화" : "비활성화"}되었습니다.`
    );
  };

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <SectionBox>
        {/* 📌 탭 메뉴 */}
        <TabMenu>
          <TabButton
            $active={tab === "profile"}
            onClick={() => setTab("profile")}
          >
            내 정보
          </TabButton>
          <TabButton
            $active={tab === "security"}
            onClick={() => setTab("security")}
          >
            보안 설정
          </TabButton>
        </TabMenu>

        {/* 👤 내 정보 탭 */}
        {tab === "profile" && (
          <>
            <Title>내 정보</Title>
            <ImageWrapper>
              <ProfileImage src={user.profileImage} alt="프로필 이미지" />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              )}
            </ImageWrapper>

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

        {/* 🔐 보안 설정 탭 */}
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
