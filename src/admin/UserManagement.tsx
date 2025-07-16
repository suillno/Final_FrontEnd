import React, { useCallback } from "react";
import styled from "styled-components";
import { useOutletContext } from "react-router-dom";
import UserList from "./userManagement/UserList";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

// Layout에서 받아올 사이드바 상태 타입
interface LayoutContext {
  isSidebarOpen: boolean;
}

// 파티클 옵션 설정
const particlesOptions = {
  fullScreen: { enable: true, zIndex: 0 }, // 화면 전체에 표시되며, 가장 아래로
  background: { color: { value: "#1e1f24" } }, // 배경색 유지
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse", // 마우스 반응 효과
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    number: {
      value: window.innerWidth < 768 ? 30 : 60,
      density: { enable: true, value_area: 800 },
    },
    size: { value: { min: 1, max: 3 } },
    color: { value: "#00eaff" },
    move: {
      enable: true,
      speed: 0.6,
      outModes: { default: "bounce" as const },
    },
    links: {
      enable: true,
      color: "#00eaff",
      distance: 120,
      opacity: 0.4,
    },
    opacity: { value: 0.3 },
  },
  detectRetina: true,
};

// 전체 컨테이너
const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "$isSidebarOpen", // DOM 전달 차단
})<{ $isSidebarOpen: boolean }>`
  position: relative;
  background-color: transparent; // 배경은 파티클이 담당하므로 투명
  margin-left: ${(props) => (props.$isSidebarOpen ? "220px" : "0")};
  transition: margin-left 0.3s ease;
  overflow-x: hidden;
  padding-bottom: 5rem;
`;

// 콘텐츠 wrapper: 파티클 위에 표시되도록 z-index 적용
const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 2rem;
  padding-top: 6rem;
`;

// 타이틀 텍스트 스타일
const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #00eaff;
  text-align: center;
  text-shadow: 0 0 10px #00eaff88;
  margin-bottom: 2rem;
`;

const UserManagement: React.FC = () => {
  const { isSidebarOpen } = useOutletContext<LayoutContext>();

  // 파티클 엔진 초기화
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Container $isSidebarOpen={isSidebarOpen}>
      {/* 전역 전체 고정 파티클 (별도 Wrapper 없이!) */}
      <Particles
        id="userParticles"
        init={particlesInit}
        options={particlesOptions}
      />

      {/* 메인 콘텐츠 */}
      <ContentWrapper>
        <UserList />
      </ContentWrapper>
    </Container>
  );
};

export default UserManagement;
