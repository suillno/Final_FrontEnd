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

// 상대경로로 스타일, 타입 불러오기
import * as Styled from "./chart/Chart.styles";
import {
  LayoutContext,
  DailyData,
  MonthlyData,
  VisitorCount,
} from "./chart/Chart.types";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const months = ["1월", "2월", "3월", "4월", "5월", "6월"];

const generateWeekSales = (): DailyData[] =>
  days.map((day) => ({ day, sales: Math.floor(Math.random() * 1000) + 300 }));

const generateMonthSales = (): MonthlyData[] =>
  months.map((month) => ({
    month,
    sales: Math.floor(Math.random() * 10000) + 10000,
  }));

const generateNewUsers = (): DailyData[] =>
  days.map((day) => ({ day, count: Math.floor(Math.random() * 10) + 5 }));

const generateVisitorsPerDay = (): DailyData[] =>
  days.map((day) => ({ day, visitors: Math.floor(Math.random() * 300) + 100 }));

const generateVisitorCount = (): VisitorCount => ({
  today: Math.floor(Math.random() * 300) + 100,
  total: Math.floor(Math.random() * 10000) + 10000,
});

const Chart: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  const [weekSales, setWeekSales] = useState<DailyData[]>(generateWeekSales());
  const [monthSales, setMonthSales] = useState<MonthlyData[]>(
    generateMonthSales()
  );
  const [newUsers, setNewUsers] = useState<DailyData[]>(generateNewUsers());
  const [visitors, setVisitors] = useState<VisitorCount>(
    generateVisitorCount()
  );
  const [dailyVisitors, setDailyVisitors] = useState<DailyData[]>(
    generateVisitorsPerDay()
  );

  const totalDailyVisitors = dailyVisitors.reduce(
    (sum, v) => sum + (v.visitors || 0),
    0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWeekSales(generateWeekSales());
      setMonthSales(generateMonthSales());
      setNewUsers(generateNewUsers());
      setVisitors(generateVisitorCount());
      setDailyVisitors(generateVisitorsPerDay());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Styled.Container $isSidebarOpen={isSidebarOpen}>
      <Styled.Title style={{ marginTop: "100px" }}>
        📊 통계 대시보드
      </Styled.Title>

      <Styled.VisitorInfo>
        🧑‍💻 오늘 방문자 수: <strong>{visitors.today}</strong>명<br />총 방문자
        수: <strong>{visitors.total.toLocaleString()}</strong>명<br />
        최근 7일 방문자 총합:{" "}
        <strong>{totalDailyVisitors.toLocaleString()}</strong>명
      </Styled.VisitorInfo>

      <Styled.Grid>
        <Styled.Card>
          <Styled.ChartTitle>📈 일일 방문자 수 (7일)</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={dailyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#4dd0e1" />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        <Styled.Card>
          <Styled.ChartTitle>💰 1주일간의 매출</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={weekSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        <Styled.Card>
          <Styled.ChartTitle>📆 최근 6개월 매출</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <LineChart data={monthSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>

        <Styled.Card>
          <Styled.ChartTitle>👤 신규 가입자 수 (7일)</Styled.ChartTitle>
          <Styled.ChartWrapper>
            <ResponsiveContainer>
              <BarChart data={newUsers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Styled.ChartWrapper>
        </Styled.Card>
      </Styled.Grid>
    </Styled.Container>
  );
};

export default Chart;
