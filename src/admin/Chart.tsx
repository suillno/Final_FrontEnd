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

import * as Styled from "./chart/Chart.styles";
import {
  LayoutContext,
  DailyData,
  VisitorCount,
  SignupData,
  SignupCount,
} from "./chart/Chart.types";
import {
  apiGetWeeklyVisitors,
  apiGetWeeklySignups,
} from "../components/api/backApi";

const Chart: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  /* ---------- 방문자 데이터 ---------- */
  const [dailyVisitors, setDailyVisitors] = useState<DailyData[]>([]);
  const [visitorSummary, setVisitorSummary] = useState<VisitorCount>({
    today: 0,
    total: 0,
  });

  /* ---------- 신규 가입자 데이터 ---------- */
  const [signupData, setSignupData] = useState<SignupData[]>([]);
  const [signupSummary, setSignupSummary] = useState<SignupCount>({
    today: 0,
    total: 0,
  });

  /* ### 방문자 API 호출 ######################################## */
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const result = await apiGetWeeklyVisitors();

        if (!Array.isArray(result)) {
          console.error("방문자 데이터가 배열이 아닙니다:", result);
          return;
        }

        const days = ["일", "월", "화", "수", "목", "금", "토"];

        const mapped: DailyData[] = result.map((row) => {
          const date = new Date(row.label);
          return {
            day: days[date.getDay()],
            visitors: row.value,
            isToday: date.toDateString() === new Date().toDateString(), // 오늘 여부
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

  /* ### 신규 가입자 API 호출 ################################### */
  useEffect(() => {
    const fetchSignups = async () => {
      try {
        const result = await apiGetWeeklySignups();

        if (!Array.isArray(result)) {
          console.error("가입자 데이터가 배열이 아닙니다:", result);
          return;
        }

        const days = ["일", "월", "화", "수", "목", "금", "토"];

        const mapped: SignupData[] = result.map((row) => {
          const date = new Date(row.label);
          return {
            day: days[date.getDay()],
            signups: row.value,
          };
        });

        const total = mapped.reduce((sum, d) => sum + (d.signups ?? 0), 0);

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

  /* ---------- 파티클 초기화 ---------- */
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* 파티클 배경 */}
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

      {/* 제목 */}
      <Styled.Title style={{ marginTop: "100px" }}>
        PickGame 관리자 대시보드
      </Styled.Title>

      {/* 방문자 요약 */}
      <Styled.VisitorInfo>
        오늘 방문자 수: <strong>{visitorSummary.today}</strong>명<br />
        최근 7일 총 방문:{" "}
        <strong>{visitorSummary.total.toLocaleString()}</strong>명
      </Styled.VisitorInfo>

      {/* 신규 가입자 요약 */}
      <Styled.SignupInfo>
        오늘 가입자 수: <strong>{signupSummary.today}</strong>명<br />
        최근 7일 총 가입:{" "}
        <strong>{signupSummary.total.toLocaleString()}</strong>명
      </Styled.SignupInfo>

      {/* 차트 영역 */}
      <Styled.Grid>
        {/* 방문자 차트 */}
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

        {/* 가입자 차트 */}
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
      </Styled.Grid>
    </Styled.Container>
  );
};

export default Chart;
