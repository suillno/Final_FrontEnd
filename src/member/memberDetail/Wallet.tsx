import React, { useState } from "react";
//포인트/지갑/쿠폰

interface Transaction {
  id: number;
  type: "충전" | "사용";
  amount: number;
  date: string;
}

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [chargeAmount, setChargeAmount] = useState("");
  const [history, setHistory] = useState<Transaction[]>([]);

  const handleCharge = () => {
    const amount = parseInt(chargeAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("유효한 금액을 입력하세요.");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now(),
      type: "충전",
      amount,
      date: new Date().toLocaleString(),
    };

    setBalance((prev) => prev + amount);
    setHistory((prev) => [newTransaction, ...prev]);
    setChargeAmount("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>내 지갑</h2>

      <div style={styles.balanceBox}>
        현재 잔액:{" "}
        <span style={styles.balance}>{balance.toLocaleString()}₩</span>
      </div>

      <div style={styles.chargeSection}>
        <input
          type="number"
          placeholder="충전 금액"
          value={chargeAmount}
          onChange={(e) => setChargeAmount(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleCharge} style={styles.button}>
          충전하기
        </button>
      </div>

      <div style={styles.history}>
        <h3>거래 내역</h3>
        {history.length === 0 ? (
          <p style={{ color: "#ccc" }}>거래 내역이 없습니다.</p>
        ) : (
          <ul style={styles.list}>
            {history.map((item) => (
              <li key={item.id} style={styles.listItem}>
                [{item.type}] {item.amount.toLocaleString()}₩ - {item.date}
              </li>
            ))}
          </ul>
        )}
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
    fontSize: 24,
    marginBottom: 20,
  },
  balanceBox: {
    fontSize: 18,
    marginBottom: 20,
  },
  balance: {
    color: "#00bfff",
    fontWeight: "bold",
  },
  chargeSection: {
    display: "flex",
    gap: 10,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
    border: "1px solid #555",
    backgroundColor: "#1f1f1f",
    color: "#fff",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#00bfff",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  history: {
    marginTop: 10,
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "8px 0",
    borderBottom: "1px solid #444",
  },
};

export default Wallet;
