import React, { useState } from "react";
//비밀번호 변경, 2단계 인증 등

const Security: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("모든 비밀번호 입력란을 채워주세요.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (newPassword.length < 6) {
      alert("새 비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    // TODO: 실제 비밀번호 변경 API 호출
    alert("비밀번호가 성공적으로 변경되었습니다.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const toggleTwoFactor = () => {
    // TODO: 2단계 인증 활성화/비활성화 API 호출
    setTwoFactorEnabled(!twoFactorEnabled);
    alert(
      `2단계 인증이 ${!twoFactorEnabled ? "활성화" : "비활성화"}되었습니다.`
    );
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>보안 설정</h2>

      <div style={styles.section}>
        <h3>비밀번호 변경</h3>
        <input
          type="password"
          placeholder="현재 비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="새 비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handlePasswordChange} style={styles.button}>
          비밀번호 변경
        </button>
      </div>

      <div style={styles.section}>
        <h3>2단계 인증</h3>
        <label style={styles.toggleLabel}>
          <input
            type="checkbox"
            checked={twoFactorEnabled}
            onChange={toggleTwoFactor}
            style={styles.checkbox}
          />
          2단계 인증 {twoFactorEnabled ? "활성화됨" : "비활성화됨"}
        </label>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    backgroundColor: "#2b2b2b",
    padding: 30,
    borderRadius: 8,
    color: "#fff",
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
  },
  section: {
    marginBottom: 30,
  },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    border: "1px solid #555",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    display: "block",
  },
  button: {
    marginTop: 15,
    width: "100%",
    padding: 10,
    backgroundColor: "#00bfff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  toggleLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 16,
  },
  checkbox: {
    marginRight: 10,
    width: 18,
    height: 18,
  },
};

export default Security;
