import React, { useEffect, useState } from "react";
import PortOne from "@portone/browser-sdk/v2";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiChargeWallet, apiWalletLog } from "../../components/api/backApi";
import { selectUserInfo } from "../../components/auth/store/userInfo";
import customSwal from "../../style/customSwal.styles";
import ExcelButton, {
  ExcelDownload,
} from "../../components/utils/ExcelDownload";

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
  padding: 2em;
  background-color: #1e1f24;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 0.75em;
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
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 191, 255, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
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
const History = styled.div`
  max-height: 450px;
  overflow: auto;
`;

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

// 내역다운로드 버튼
const DownloadButton = styled.button`
  color: darkgray;
  &:hover {
    color: #ccc;
  }
`;

declare global {
  interface Window {
    IMP?: any;
  }
}

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

  useEffect(() => {
    if (!window.IMP) {
      const script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/js/iamport.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
  // 충전 버튼 클릭 시 처리
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

  // 결제 시스템
  const handleCharge = async () => {
    const amount = parseInt(chargeAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("유효한 금액을 입력하세요.");
      return;
    }

    if (!userId || !userName) {
      alert("사용자 정보가 없습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await PortOne.requestPayment({
        storeId: "store-e4038486-8d83-41a5-acf1-844a009e0d94",
        channelKey: "channel-key-ebe7daa6-4fe4-41bd-b17d-3495264399b5",
        paymentId: `wallet_${Date.now()}`,
        orderName: userName,
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
        isTestChannel: true,
        customer: {
          fullName: "포트원",
          phoneNumber: "010-0000-1234",
          email: "test@portone.io",
        },
        bypass: {
          kakaopay: {},
          inicis_v2: {
            logo_url: "https://portone.io/assets/portone.87061e94.avif",
            logo_2nd: "https://admin.portone.io/assets/img/auth/lock.png",
            parentemail: "parentemail",
            Ini_SSGPAY_MDN: "01012341234",
            acceptmethod: ["SKIN(#C1272C)", "below1000", "ocb", "paypopup"],
            P_CARD_OPTION: "selcode=14",
            P_MNAME: "포트원",
            P_RESERVED: ["below1000=Y", "noeasypay=Y"],
          },
        },
      });
      console.log("결제 응답:", response);
      if (response?.paymentId && !response?.code) {
        await apiChargeWallet(userId, amount, userName, 0);

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

        await customSwal.fire({
          icon: "success",
          title: "결제 완료",
          text: `${amount.toLocaleString()}₩ 충전되었습니다.`,
          confirmButtonText: "확인",
        });
      } else {
        await customSwal.fire({
          icon: "error",
          title: "결제 실패",
          text: response?.message || "결제 중 오류가 발생했습니다.",
        });
      }
    } catch (error: any) {
      console.error("결제 오류:", error);
      await customSwal.fire({
        icon: "error",
        title: "결제 실패",
        text: error.message || "예상치 못한 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
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
            {isSubmitting ? " 전송 중 ..." : " 확인"}
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
          <div className="flex justify-between">
            <h3>거래 내역 (최근 10건만 조회)</h3>
            <DownloadButton>{ExcelButton(userId)}</DownloadButton>
          </div>

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
