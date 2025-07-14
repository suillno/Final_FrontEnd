// src/pages/admin/Chart.tsx
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
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

// 스타일 컴포넌트
import * as Styled from "./chart/Chart.styles";

// 타입 정의
import {
  LayoutContext,
  DailyData,
  VisitorCount,
  SignupData,
  SignupCount,
  RevenueData,
} from "./chart/Chart.types";

// API 함수들
import {
  apiGetWeeklyVisitors,
  apiGetWeeklySignups,
  apiGetTodayRevenue,
  apiGetWeeklyRevenue,
} from "../components/api/backApi";

const Chart: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 방문자 수 상태
  const [dailyVisitors, setDailyVisitors] = useState<DailyData[]>([]);
  const [visitorSummary, setVisitorSummary] = useState<VisitorCount>({
    today: 0,
    total: 0,
  });

  // 가입자 수 상태
  const [signupData, setSignupData] = useState<SignupData[]>([]);
  const [signupSummary, setSignupSummary] = useState<SignupCount>({
    today: 0,
    total: 0,
  });

  // 매출 상태
  const [dailyRevenue, setDailyRevenue] = useState<RevenueData[]>([]);
  const [todayRevenue, setTodayRevenue] = useState<number>(0);

  // 주간 총 매출 계산
  const totalWeeklyRevenue = dailyRevenue.reduce(
    (sum, d) => sum + (d.amount ?? 0),
    0
  );

  // 방문자 수 API 호출
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const result = await apiGetWeeklyVisitors();
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const mapped: DailyData[] = result.map((row) => {
          const date = new Date(row.label);
          return {
            day: days[date.getDay()],
            visitors: row.value,
            isToday: date.toDateString() === new Date().toDateString(),
          };
        });
        const total = mapped.reduce((sum, d) => sum + (d.visitors ?? 0), 0);
        setDailyVisitors(mapped);
        setVisitorSummary({
          today: mapped[mapped.length - 1]?.visitors ?? 0,
          total,
        });
      } catch (err) {
        console.error("방문자 수 데이터 로드 실패", err);
      }
    };
    fetchVisitors();
  }, []);

  // 신규 가입자 수 API 호출
  useEffect(() => {
    const fetchSignups = async () => {
      try {
        const result = await apiGetWeeklySignups();
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const mapped: SignupData[] = result.map((row) => {
          const date = new Date(row.label);
          return {
            day: days[date.getDay()],
            signups: row.value,
          };
        });
        const total = mapped.reduce((sum, d) => sum + d.signups, 0);
        setSignupData(mapped);
        setSignupSummary({
          today: mapped[mapped.length - 1]?.signups ?? 0,
          total,
        });
      } catch (err) {
        console.error("신규 가입자 데이터 로드 실패", err);
      }
    };
    fetchSignups();
  }, []);

  // 매출 관련 API 호출
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const [today, weekly] = await Promise.all([
          apiGetTodayRevenue(),
          apiGetWeeklyRevenue(),
        ]);

        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const mapped: RevenueData[] = weekly.map((row) => {
          const date = new Date(row.label);
          return {
            day: days[date.getDay()],
            amount: row.value,
          };
        });

        setTodayRevenue(today);
        setDailyRevenue(mapped);
      } catch (err) {
        console.error("매출 데이터 로드 실패", err);
      }
    };
    fetchRevenue();
  }, []);

  // 파티클 엔진 초기화
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* 배경 파티클 */}
      <Styled.ParticleWrapper>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: "#0e0f11" },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                resize: true,
              },
            },
            particles: {
              color: { value: "#00eaff" },
              links: { enable: true, color: "#00eaff", distance: 120 },
              move: { enable: true, speed: 1.5 },
              number: { value: 45 },
              opacity: { value: 0.3 },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      </Styled.ParticleWrapper>

      {/* 제목 및 요약 정보 */}
      <Styled.Title style={{ marginTop: "100px" }}>
        PickGame 관리자 대시보드
      </Styled.Title>
      <Styled.VisitorInfo>
        오늘 방문자 수: <strong>{visitorSummary.today}</strong>명<br />
        최근 7일 총 방문:{" "}
        <strong>{visitorSummary.total.toLocaleString()}</strong>명
      </Styled.VisitorInfo>
      <Styled.SignupInfo>
        오늘 가입자 수: <strong>{signupSummary.today}</strong>명<br />
        최근 7일 총 가입:{" "}
        <strong>{signupSummary.total.toLocaleString()}</strong>명
      </Styled.SignupInfo>
      <Styled.RevenueInfo>
        오늘 매출액: <strong>{todayRevenue.toLocaleString()}원</strong>
      </Styled.RevenueInfo>

      {/* 차트 영역 */}
      <Styled.Grid>
        {/* 일일 방문자 수 차트 */}
        <Styled.Card>
          <Styled.ChartTitle>일일 방문자 수 (최근 7일)</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={dailyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#00eaff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        {/* 신규 가입자 수 차트 */}
        <Styled.Card>
          <Styled.ChartTitle>신규 가입자 수 (최근 7일)</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={signupData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="signups" fill="#e87dff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        {/* 일일 매출 차트 */}
        <Styled.Card>
          <Styled.ChartTitle>일일 매출액 (최근 7일)</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={dailyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => `${value.toLocaleString()}원`}
                />
                <Bar dataKey="amount" fill="#ffe600" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        {/* 최근 7일 총 매출 차트 */}
        <Styled.Card>
          <Styled.ChartTitle>최근 7일 총 매출액</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart
                data={[{ name: "최근 7일", amount: totalWeeklyRevenue }]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => `${value.toLocaleString()}원`}
                />
                <Bar dataKey="amount" fill="#ff7f50" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>
      </Styled.Grid>
    </Styled.Container>
  );
};

export default Chart;
