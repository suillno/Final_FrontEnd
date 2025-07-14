import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { instanceBack } from "../../components/api/instance";

// 🔷 사용자 정보 타입
interface UserProfile {
  email: string;
  profileImage: string; // 이미지 경로 또는 ""
}

// 🔷 레이아웃 컨텍스트 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

/* ======================= 💅 styled-components ======================= */

const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2em;
  background: radial-gradient(circle, #1e1f24, #121317);
  margin-left: ${(props) => (props.$isSidebarOpen ? "180px" : "80px")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1.5em;
  }
`;

const SectionBox = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #2c2f3a;
  padding: 40px 30px;
  border-radius: 16px;
  color: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 25px;
  color: #00eaff;
  text-align: center;
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #555;
  background-color: #1c1d23;
  color: #fff;
  font-size: 1rem;
  transition: 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00eaff;
    background-color: #0e0f11;
    box-shadow: 0 0 8px #00eaff88;
  }

  &::placeholder {
    color: #888;
  }
`;

const Button = styled.button<{ color?: string }>`
  width: 100%;
  padding: 12px;
  background-color: ${(props) => props.color || "#00bfff"};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 15px;

  &:hover {
    background-color: ${(props) =>
      props.color === "#4caf50" ? "#3ea942" : "#009acd"};
    transform: translateY(-2px);
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 3px solid #00eaff;
  background-color: #111;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageSelectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 1rem;
  justify-content: center;
`;

const SelectableImage = styled.img<{ $selected: boolean }>`
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 50%;
  border: ${({ $selected }) =>
    $selected ? "3px solid #00eaff" : "2px solid #444"};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ $selected }) => ($selected ? "0 0 10px #00eaff88" : "none")};

  &:hover {
    transform: scale(1.08);
    border-color: #00eaff;
  }
`;

/* ======================= 📘 React Component ======================= */

const Profile: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const [user, setUser] = useState<UserProfile>({
    email: "",
    profileImage: "",
  });
  const [editMode, setEditMode] = useState(false);

  const profileImages = Array.from(
    { length: 15 },
    (_, i) => `/profiles/profile_${i + 1}.png`
  );

  // 사용자 정보 불러오기
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

  // 이메일 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, email: e.target.value }));
  };

  // 저장
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
      alert("프로필이 저장되었습니다.");
      setEditMode(false);
    } catch (err: any) {
      console.error("저장 실패", err);
      alert(err.response?.data || "저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <SectionBox>
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
      </SectionBox>
    </PageWrapper>
  );
};

export default Profile;
