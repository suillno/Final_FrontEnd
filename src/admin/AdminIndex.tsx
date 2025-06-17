import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

// 헤더 컴포넌트
const Header: React.FC = () => <header className="headerbar">Pick Game</header>;

// 사이드바 컴포넌트
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "메인" },
    { id: "user-management", label: "유저 관리" },
    { id: "review-management", label: "리뷰 관리" },
    { id: "customer-support", label: "고객 문의" },
    { id: "admin-permission", label: "관리자 권한 관리" },
  ];

  return (
    <div className="sidebar">
      <nav>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id}>
              <a
                href="#"
                className={activeTab === tab.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(tab.id);
                }}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// 대시보드 컴포넌트
const Dashboard: React.FC = () => {
  const salesRef = useRef<HTMLCanvasElement>(null);
  const visitorRef = useRef<HTMLCanvasElement>(null);
  const signupRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (salesRef.current) {
      new Chart(salesRef.current, {
        type: "bar",
        data: {
          labels: [
            "5월 첫째주",
            "5월 둘째주",
            "5월 셋째주",
            "5월 넷째주",
            "6월 첫째주",
            "6월 둘째주",
            "6월 셋째주",
          ],
          datasets: [
            {
              label: "₩",
              data: [
                1200000, 1400000, 1600000, 1100000, 1500000, 1800000, 1700000,
              ],
              backgroundColor: "#52796f",
            },
          ],
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } },
      });
    }

    if (visitorRef.current) {
      new Chart(visitorRef.current, {
        type: "line",
        data: {
          labels: ["6/4", "6/5", "6/6", "6/7", "6/8", "6/9", "6/10"],
          datasets: [
            {
              label: "방문자 수",
              data: [220, 250, 200, 280, 300, 270, 260],
              fill: false,
              borderColor: "#84a98c",
              tension: 0.3,
            },
          ],
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } },
      });
    }

    if (signupRef.current) {
      new Chart(signupRef.current, {
        type: "bar",
        data: {
          labels: ["6/4", "6/5", "6/6", "6/7", "6/8", "6/9", "6/10"],
          datasets: [
            {
              label: "가입자 수",
              data: [10, 12, 9, 15, 14, 11, 13],
              backgroundColor: "#1b4332",
            },
          ],
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } },
      });
    }
  }, []);

  return (
    <section>
      <h2>메인</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div
          style={{ background: "white", padding: "1rem", borderRadius: "8px" }}
        >
          <h3>최근 7주 매출</h3>
          <canvas ref={salesRef} height={100}></canvas>
        </div>
        <div
          style={{ background: "white", padding: "1rem", borderRadius: "8px" }}
        >
          <h3>최근 7일 방문자 수</h3>
          <canvas ref={visitorRef} height={100}></canvas>
        </div>
        <div
          style={{ background: "white", padding: "1rem", borderRadius: "8px" }}
        >
          <h3>최근 7일 신규 유저</h3>
          <canvas ref={signupRef} height={100}></canvas>
        </div>
      </div>
    </section>
  );
};

// 유저 관리 컴포넌트
const UserManagement: React.FC = () => {
  const [query, setQuery] = useState("");

  const users = [
    {
      id: "user001",
      name: "홍길동",
      email: "hong@example.com",
      date: "2025-01-10",
      status: "활성",
    },
    {
      id: "user002",
      name: "김영희",
      email: "kim@example.com",
      date: "2025-02-20",
      status: "활성",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.id.includes(query) ||
      user.name.includes(query) ||
      user.email.includes(query)
  );

  return (
    <section>
      <h2>유저 관리</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="회원ID, 이름, 이메일 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>회원ID</th>
            <th>이름</th>
            <th>이메일</th>
            <th>가입일</th>
            <th>상태</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.date}</td>
              <td>{user.status}</td>
              <td>
                <button>정지</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

// 리뷰 관리 컴포넌트
const ReviewManagement: React.FC = () => (
  <section>
    <h2>리뷰 관리</h2>
    <table>
      <thead>
        <tr>
          <th>회원ID</th>
          <th>게임명</th>
          <th>별점</th>
          <th>내용</th>
          <th>날짜</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>user001</td>
          <td>게임 A</td>
          <td>5</td>
          <td>최고의 게임입니다!</td>
          <td>2025-06-09</td>
          <td>
            <button>삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
);

// 고객 문의 컴포넌트
const CustomerSupport: React.FC = () => (
  <section>
    <h2>고객 문의</h2>
    <p>현재 접수된 문의가 없습니다.</p>
  </section>
);

// 관리자 권한 관리 컴포넌트
const AdminPermission: React.FC = () => (
  <section>
    <h2>관리자 권한 관리</h2>
    <p>관리자 목록 및 권한 수정 기능 예정</p>
  </section>
);

// 전체 페이지 컴포넌트
const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div>
      <Header />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main
        style={{ marginLeft: "220px", padding: "2rem", paddingTop: "80px" }}
      >
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "user-management" && <UserManagement />}
        {activeTab === "review-management" && <ReviewManagement />}
        {activeTab === "customer-support" && <CustomerSupport />}
        {activeTab === "admin-permission" && <AdminPermission />}
      </main>
    </div>
  );
};

export default AdminPage;
