import React, { useState } from "react";

interface Game {
  id: number;
  title: string;
  coverImage: string;
  purchasedAt: string;
}

const Library: React.FC = () => {
  const [games, setGames] = useState<Game[]>([
    {
      id: 1,
      title: "엘든 링",
      coverImage: "/games/eldenring.jpg",
      purchasedAt: "2024-11-03",
    },
    {
      id: 2,
      title: "스타듀 밸리",
      coverImage: "/games/stardew.jpg",
      purchasedAt: "2024-09-17",
    },
  ]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>내 게임 라이브러리</h2>

      {games.length === 0 ? (
        <p style={{ color: "#ccc" }}>구매한 게임이 없습니다.</p>
      ) : (
        <div style={styles.grid}>
          {games.map((game) => (
            <div key={game.id} style={styles.card}>
              <img
                src={game.coverImage}
                alt={game.title}
                style={styles.image}
              />
              <h3 style={styles.gameTitle}>{game.title}</h3>
              <p style={styles.date}>구매일: {game.purchasedAt}</p>
              <button style={styles.button}>설치 / 실행</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 1000,
    margin: "40px auto",
    padding: 20,
    backgroundColor: "#1f1f1f",
    borderRadius: 8,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#2b2b2b",
    borderRadius: 6,
    padding: 15,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: 4,
    marginBottom: 10,
  },
  gameTitle: {
    fontSize: 18,
    margin: "10px 0 5px 0",
  },
  date: {
    fontSize: 12,
    color: "#bbb",
    marginBottom: 10,
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#00bfff",
    border: "none",
    color: "#fff",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default Library;
