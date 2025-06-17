import React from "react";

const Dashboard: React.FC = () => {
  // 더미 데이터 (실제 서비스에서는 API로 대체)
  const recentGames = ["엘든 링", "스타듀 밸리", "디아블로 4"];
  const wallet = 15300;
  const libraryCount = 12;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>대시보드</h2>

      <div style={styles.section}>
        <h3>보유 중인 게임</h3>
        <p>{libraryCount}개</p>
      </div>

      <div style={styles.section}>
        <h3>지갑 잔액</h3>
        <p>₩ {wallet.toLocaleString()}</p>
      </div>

      <div style={styles.section}>
        <h3>최근 플레이한 게임</h3>
        <ul>
          {recentGames.map((game, index) => (
            <li key={index}>{game}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#2b2b2b",
    borderRadius: "8px",
    color: "#fff",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "25px",
    backgroundColor: "#1f1f1f",
    padding: "15px",
    borderRadius: "5px",
  },
};

export default Dashboard;
