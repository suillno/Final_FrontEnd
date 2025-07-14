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

// 💅 styled-components 정의
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
  max-width: 600px;
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 10px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h2`
  font-size: 22px;
  margin-bottom: 20px;
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

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ImageSelectGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 1rem;
  justify-content: center;
`;

const SelectableImage = styled.img<{ $selected: boolean }>`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: ${({ $selected }) =>
    $selected ? "3px solid #00eaff" : "2px solid #444"};
  cursor: pointer;
  transition: all 0.2s ease;
`;

const Profile: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [user, setUser] = useState<UserProfile>({
    email: "",
    profileImage: "", // ❗ 이미지 기본값 없음
  });

  const [editMode, setEditMode] = useState(false);

  // 🔹 정적 이미지 리스트 (1~15)
  const profileImages = Array.from(
    { length: 15 },
    (_, i) => `/profiles/profile_${i + 1}.png`
  );

  // 🔹 사용자 정보 로딩
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instanceBack.get("/member/profile");
        const { email, profileImg } = res.data;

        setUser({
          email: email ?? "",
          profileImage: profileImg || "", // ❗ 이미지가 없으면 공백
        });
      } catch (err) {
        console.error("사용자 정보 로딩 실패", err);
      }
    };

    fetchUser();
  }, []);

  // 🔹 이메일 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, email: e.target.value }));
  };

  // 🔹 저장 요청
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
