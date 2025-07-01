import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

import * as Styled from "./chart/Chart.styles";
import {
  LayoutContext,
  DailyData,
  MonthlyData,
  VisitorCount,
} from "./chart/Chart.types";

// ==============================
// 차트용 더미 데이터 생성 함수
// ==============================

// 요일 및 월 텍스트 리스트
const days = ["월", "화", "수", "목", "금", "토", "일"];
const months = ["1월", "2월", "3월", "4월", "5월", "6월"];

// 7일간 매출 데이터 생성 (0~999 + 300 보정)
const generateWeekSales = (): DailyData[] =>
  days.map((day) => ({ day, sales: Math.floor(Math.random() * 1000) + 300 }));

// 6개월 매출 데이터 생성
const generateMonthSales = (): MonthlyData[] =>
  months.map((month) => ({
    month,
    sales: Math.floor(Math.random() * 10000) + 10000,
  }));

// 7일간 신규 가입자 수
const generateNewUsers = (): DailyData[] =>
  days.map((day) => ({ day, count: Math.floor(Math.random() * 10) + 5 }));

// 7일간 방문자 수
const generateVisitorsPerDay = (): DailyData[] =>
  days.map((day) => ({ day, visitors: Math.floor(Math.random() * 300) + 100 }));

// 오늘 및 전체 방문자 수
const generateVisitorCount = (): VisitorCount => ({
  today: Math.floor(Math.random() * 300) + 100,
  total: Math.floor(Math.random() * 10000) + 10000,
});

const Chart: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>(); // 사이드바 열림 여부 context

  // ==============================
  // 상태 정의 (각 데이터 저장용)
  // ==============================
  const [weekSales, setWeekSales] = useState(generateWeekSales());
  const [monthSales, setMonthSales] = useState(generateMonthSales());
  const [newUsers, setNewUsers] = useState(generateNewUsers());
  const [visitors, setVisitors] = useState(generateVisitorCount());
  const [dailyVisitors, setDailyVisitors] = useState(generateVisitorsPerDay());

  // 최근 7일간 총 방문자 수 계산
  const totalDailyVisitors = dailyVisitors.reduce(
    (sum, v) => sum + (v.visitors || 0),
    0
  );

  // 5초마다 데이터 자동 새로고침
  useEffect(() => {
    const interval = setInterval(() => {
      setWeekSales(generateWeekSales());
      setMonthSales(generateMonthSales());
      setNewUsers(generateNewUsers());
      setVisitors(generateVisitorCount());
      setDailyVisitors(generateVisitorsPerDay());
    }, 5000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 해제
  }, []);

  // 파티클 초기화 함수
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* ===== 배경 파티클 ===== */}
      <Styled.ParticleWrapper>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: "#0e0f11" }, // 배경 색상
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" }, // 마우스 호버 반응
                resize: true,
              },
            },
            particles: {
              color: { value: "#00eaff" },
              links: {
                enable: true,
                color: "#00eaff",
                distance: 120,
              },
              move: { enable: true, speed: 1.5 },
              number: { value: 45 },
              opacity: { value: 0.3 },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      </Styled.ParticleWrapper>

      {/* ===== 상단 타이틀 ===== */}
      <Styled.Title style={{ marginTop: "100px" }}>
        PickGame 관리자 대시보드
      </Styled.Title>

      {/* ===== 방문자 정보 요약 카드 ===== */}
      <Styled.VisitorInfo>
        🧑‍💻 오늘 방문자 수: <strong>{visitors.today}</strong>명<br />총 방문자
        수: <strong>{visitors.total.toLocaleString()}</strong>명<br />
        최근 7일 총 방문: <strong>{totalDailyVisitors.toLocaleString()}</strong>
        명
      </Styled.VisitorInfo>

      {/* ===== 차트 영역 (2x2 Grid) ===== */}
      <Styled.Grid>
        {/* 일일 방문자 수 막대 그래프 */}
        <Styled.Card>
          <Styled.ChartTitle>📈 일일 방문자 수 (7일)</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={dailyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#00eaff" />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        {/* 주간 매출 막대 그래프 */}
        <Styled.Card>
          <Styled.ChartTitle>💰 1주일간의 매출</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={weekSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        {/* 6개월 매출 추이 선형 그래프 */}
        <Styled.Card>
          <Styled.ChartTitle>📆 최근 6개월 매출</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <LineChart data={monthSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        {/* 신규 가입자 수 막대 그래프 */}
        <Styled.Card>
          <Styled.ChartTitle>👤 신규 가입자 수 (7일)</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={newUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>
      </Styled.Grid>
    </Styled.Container>
  );
};

export default Chart;
