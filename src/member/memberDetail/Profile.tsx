import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { instanceBack } from "../../components/api/instance";
import {
  PageWrapper,
  SectionBox,
  Title,
  Input,
  Button,
  ProfileImage,
  TabMenu,
  TabButton,
  SelectableImage,
  ToggleLabel,
  Field,
  ImageWrapper,
  ImageSelectGrid,
  Checkbox,
} from "../member.style/Profile.style";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserInfo,
  setUserInfo,
} from "../../components/auth/store/userInfo";
import { apiChangePassword } from "../../components/api/backApi";

// 🔷 사용자 정보 타입
interface UserProfile {
  email: string;
  profileImage: string;
}

// 🔷 레이아웃 컨텍스트 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch(); // ✅ Redux 디스패치 훅
  const userInfo = useSelector(selectUserInfo); // ✅ Redux 상태에서 유저 정보 조회
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [user, setUser] = useState<UserProfile>({
    email: "",
    profileImage: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [tab, setTab] = useState<"profile" | "security">("profile");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔹 프로필 이미지 목록
  const profileImages = Array.from(
    { length: 15 },
    (_, i) => `/profiles/profile_${i + 1}.png`
  );

  // 🔹 사용자 정보 로드
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instanceBack.get("/member/profile");
        const { email, profileImg } = res.data;
        setUser({
          email: email ?? "",
          profileImage: profileImg || "",
        });
      } catch (err) {
        console.error("사용자 정보 로딩 실패", err);
      }
    };
    fetchUser();
  }, []);

  // 🔹 이메일 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, email: e.target.value }));
  };

  // 🔹 프로필 저장
  const handleSave = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("올바른 이메일을 입력해주세요.");
      return;
    }

    if (!user.profileImage) {
      alert("프로필 이미지를 선택해주세요.");
      return;
    }

    try {
      await instanceBack.put("/member/profile", {
        email: user.email,
        profileImg: user.profileImage,
      });

      // ✅ Redux 상태 즉시 업데이트
      dispatch(
        setUserInfo({
          ...userInfo,
          email: user.email,
          profileImage: user.profileImage,
        })
      );

      alert("프로필이 저장되었습니다.");
      setEditMode(false);
    } catch (err: any) {
      console.error("저장 실패", err);
      alert(err.response?.data || "저장 중 오류가 발생했습니다.");
    }
  };

  // 🔐 2단계 인증 토글
  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    alert(
      `2단계 인증이 ${!twoFactorEnabled ? "활성화" : "비활성화"}되었습니다.`
    );
  };

  // 🔑 비밀번호 변경
  const handlePasswordChange = async () => {
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

    try {
      const result = await apiChangePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      alert(result.message || "비밀번호가 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTab("profile");
    } catch (error: any) {
      alert(error.response?.data || "비밀번호 변경에 실패했습니다.");
    }
  };

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <SectionBox>
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

        {tab === "profile" && (
          <>
            <Title>내 정보</Title>
            <ImageWrapper>
              {user.profileImage ? (
                <ProfileImage src={user.profileImage} alt="프로필 이미지" />
              ) : (
                <div style={{ color: "#aaa", marginBottom: "10px" }}>
                  선택된 프로필 이미지가 없습니다
                </div>
              )}
            </ImageWrapper>

            {editMode && (
              <ImageSelectGrid>
                {profileImages.map((img, idx) => (
                  <SelectableImage
                    key={idx}
                    src={img}
                    alt={`img-${idx}`}
                    $selected={user.profileImage === img}
                    onClick={() =>
                      setUser((prev) => ({
                        ...prev,
                        profileImage: img,
                      }))
                    }
                  />
                ))}
              </ImageSelectGrid>
            )}

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
