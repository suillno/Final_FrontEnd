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
import { LayoutContext, DailyData, VisitorCount } from "./chart/Chart.types";
import { apiGetWeeklyVisitors } from "../components/api/backApi";

const Chart: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [dailyVisitors, setDailyVisitors] = useState<DailyData[]>([]);
  const [visitors, setVisitors] = useState<VisitorCount>({ today: 0, total: 0 });

// 실데이터 호출
useEffect(() => {
  const fetchVisitors = async () => {
    try {
      const data = await apiGetWeeklyVisitors();

      if (!Array.isArray(data)) {
        console.error("방문자 데이터가 배열이 아님:", data);
        return;
      }

      // 요일 변환
      const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];
      const mapped: DailyData[] = data.map((item) => {
        const date = new Date(item.label);
        const day = dayLabels[date.getDay()];
        return {
          day,
          visitors: item.value,
        };
      });

      const total = mapped.reduce((sum, v) => sum + (v.visitors ?? 0), 0);
      const today = mapped[mapped.length - 1]?.visitors ?? 0;

      setDailyVisitors(mapped);
      setVisitors({ today, total });
    } catch (e) {
      console.error("방문자 수 데이터 로딩 실패", e);
    }
  };

  fetchVisitors();
}, []);



  // 파티클 배경 초기화
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      {/* 🎆 배경 파티클 */}
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

      {/* 🔷 제목 */}
      <Styled.Title style={{ marginTop: "100px" }}>
        PickGame 관리자 대시보드
      </Styled.Title>

      {/* 🔷 방문자 수 요약 */}
      <Styled.VisitorInfo>
        🧑‍💻 오늘 방문자 수: <strong>{visitors.today}</strong>명<br />
        최근 7일 총 방문:{" "}
        <strong>{visitors.total.toLocaleString()}</strong>명
      </Styled.VisitorInfo>

      {/* 🔷 방문자수 차트 */}
      <Styled.Grid>
        <Styled.Card>
          <Styled.ChartTitle>📈 일일 방문자 수 (최근 7일)</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={dailyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="visitors"
                  fill="#00eaff"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>
      </Styled.Grid>
    </Styled.Container>
  );
};

export default Chart;
