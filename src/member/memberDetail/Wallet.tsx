import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  apiChargeWallet,
  apiSendWalletAuthCode,
  apiVerifyAuthCode,
  apiWalletLog,
} from "../../components/api/backApi";
import { selectUserInfo } from "../../components/auth/store/userInfo";
import customSwal from "../../style/customSwal.styles";

// 💳 거래 타입 정의
interface Transaction {
  id: number;
  type: "충전" | "사용";
  amount: number;
  date: string;
  logText: string;
}

// 🔧 Layout에서 전달되는 context 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 📦 페이지 전체 wrapper - 사이드바 열림 여부에 따라 margin-left 조절
const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2em;
  background-color: #1e1f24;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// 📦 내부 지갑 박스 UI
const WalletBox = styled.div`
  width: 100%;
  max-width: 520px;
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 12px;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

// 💰 타이틀 + 아이콘
const Title = styled.h2`
  font-size: 26px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: "💰";
    font-size: 1.2em;
  }
`;

// 💵 잔액 표시 박스
const BalanceBox = styled.div`
  background: linear-gradient(135deg, #00bfff, #007acc);
  padding: 20px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 191, 255, 0.3);
`;

// 💳 충전 입력 영역
const ChargeSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

// 🔢 금액 입력 필드 (화살표 제거)
const Input = styled.input`
  flex: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #555;
  background-color: #1f1f1f;
  color: #fff;

  // 🔽 숫자 input의 기본 스핀 버튼 제거 (Chrome/Safari)
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // 🔽 Firefox에서 화살표 제거
  -moz-appearance: textfield;
`;

// 🚀 충전 버튼
const Button = styled.button<{ disabled?: boolean }>`
  padding: 10px 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#00bfff")};
  color: ${({ disabled }) => (disabled ? "#666" : "white")};
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#ccc" : "#fff")};
    color: ${({ disabled }) => (disabled ? "#666" : "blue")};
  }
`;

// 🎯 프리셋 금액 버튼 영역
const PresetButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

// 💸 개별 프리셋 버튼
const PresetButton = styled.button`
  background-color: #333;
  border: 1px solid #555;
  color: #ccc;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #444;
    color: #00bfff;
  }
`;

// 🧾 거래 내역 리스트
const History = styled.div``;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

// 📄 거래 아이템 스타일
const ListItem = styled.li<{ type: any }>`
  padding: 12px;
  margin-bottom: 10px;
  border-left: 5px solid
    ${({ type }) => (type === "충전" ? "#00bfff" : "#ff5f5f")};
  background-color: #1f1f1f;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2a2a2a;
  }
`;

const Wallet: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();
  const userInfo = useSelector(selectUserInfo); // userId 호출
  const userId = userInfo?.id;
  const userName = userInfo?.username;
  const [authCode, setAuthCode] = useState(""); // 입증 코드 입력값 상태
  const [isAuthStep, setIsAuthStep] = useState(false);

  const [balance, setBalance] = useState(0); // 잔액 상태
  const [chargeAmount, setChargeAmount] = useState(""); // 입력 필드 값
  const [history, setHistory] = useState<Transaction[]>([]); // 거래 내역 배열
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ✅ 충전 버튼 클릭 시 처리
  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;

      try {
        const logData = await apiWalletLog(userId);
        const converted = logData.map((log: any) => ({
          id: log.logId,
          type: log.logType === "" ? " 충전" : "사용",
          amount: log.amount,
          date: new Date(log.createdAt).toLocaleString(),
          logText: log.logText,
          balance: log.balance,
        }));
        setHistory(converted);
        if (converted.length > 0) {
          setBalance(converted[0].balance);
        }
      } catch (error) {
        console.error("거래내역 불러오기 실패:", error);
      }
    };
    fetchHistory();
  }, [userId]);

  const handleCharge = async () => {
    const amount = parseInt(chargeAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("유효한 금액을 입력하세요.");
      return;
    }
    if (!userId) {
      alert("사용자 정보가 없습니다.");
      return;
    }
    setIsSubmitting(true);
    try {
      const isVerified = await (window as any).promptSendAuthCode(userId);

      if (!isVerified) {
        alert("인증이 실패하거나 취소되었습니다.");
        setIsSubmitting(false);
        return;
      }
      await apiChargeWallet(userId, amount, userName);

      const newTransaction: Transaction = {
        id: Date.now(),
        type: "충전",
        amount,
        date: new Date().toLocaleString(),
        logText: "충전",
      };

      setBalance((prev) => prev + amount);
      setHistory((prev) => [newTransaction, ...prev]);
      setChargeAmount("");
      setIsSubmitting(false);

      await customSwal.fire({
        icon: "success",
        title: "충전 완료",
        text: `${amount.toLocaleString()}₩ 충전되었습니다.`,
        confirmButtonText: "확인",
      });
    } catch (err) {
      console.error("충전 오류:", err);
      await customSwal.fire({
        icon: "error",
        title: "충전 실패",
        text: "충전 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsAuthStep(false);
    }
  };

  // ✅ 프리셋 버튼 클릭 시 입력 값에 누적
  const handlePreset = (amount: number) => {
    setChargeAmount((prev) => {
      const current = parseInt(prev || "0", 10);
      return (current + amount).toString();
    });
  };

  return (
    <PageWrapper $isSidebarOpen={isSidebarOpen}>
      <WalletBox>
        <Title>내 지갑</Title>
        <BalanceBox>{balance.toLocaleString()}₩</BalanceBox>

        <ChargeSection>
          <Input
            type="number"
            placeholder="충전 금액"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
          />
          <Button onClick={handleCharge} disabled={isSubmitting}>
            {" "}
            {isSubmitting ? " 전송 중 ..." : " 충전하기"}
          </Button>
        </ChargeSection>

        <PresetButtons>
          {[10000, 50000, 100000].map((amt) => (
            <PresetButton key={amt} onClick={() => handlePreset(amt)}>
              +{amt.toLocaleString()}₩
            </PresetButton>
          ))}
        </PresetButtons>

        <History>
          <h3>거래 내역 (최근 10건만 조회)</h3>
          {history.length === 0 ? (
            <p style={{ color: "#ccc" }}>거래 내역이 없습니다.</p>
          ) : (
            <List>
              {history.map((item) => (
                <ListItem key={item.id} type={item.logText}>
                  [{item.logText}] {item.amount.toLocaleString()}₩ - {item.date}
                </ListItem>
              ))}
            </List>
          )}
        </History>
      </WalletBox>
    </PageWrapper>
  );
};

export default Wallet;
