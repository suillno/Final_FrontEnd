import React, { useState } from "react";
//기본 정보 수정

interface UserProfile {
  nickname: string;
  email: string;
  profileImage: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    nickname: "게이머123",
    email: "gamer@example.com",
    profileImage: "/default-avatar.png",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 파일 선택 시 미리보기 업데이트
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

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("올바른 이메일을 입력해주세요.");
      return;
    }

    // TODO: API 요청으로 실제 저장 처리
    console.log("저장된 정보:", user);
    alert("프로필이 저장되었습니다.");
    setEditMode(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>프로필 수정</h2>
      <div style={styles.profileSection}>
        <img
          src={user.profileImage}
          alt="Profile"
          style={styles.profileImage}
        />
        {editMode ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: 10 }}
          />
        ) : (
          <input
            type="text"
            name="profileImage"
            value={user.profileImage}
            onChange={handleChange}
            disabled
            style={styles.input}
          />
        )}
      </div>

      <div style={styles.field}>
        <label htmlFor="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          name="nickname"
          value={user.nickname}
          onChange={handleChange}
          disabled={!editMode}
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          disabled={!editMode}
          style={styles.input}
        />
      </div>

      {editMode ? (
        <button style={styles.saveButton} onClick={handleSave}>
          저장하기
        </button>
      ) : (
        <button style={styles.editButton} onClick={() => setEditMode(true)}>
          수정하기
        </button>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    backgroundColor: "#2b2b2b",
    padding: "30px",
    borderRadius: "8px",
    color: "#fff",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
    objectFit: "cover",
  },
  field: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "4px",
    border: "1px solid #555",
    backgroundColor: "#1f1f1f",
    color: "#fff",
  },
  editButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#00bfff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  saveButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Profile;
