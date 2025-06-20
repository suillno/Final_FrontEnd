import React from "react";

const UserManagement: React.FC = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">회원 관리</h2>
      <p>회원 목록, 정지/탈퇴 처리 등을 수행할 수 있는 페이지입니다.</p>
      {/* 이후 테이블, 검색창, 상세 모달 등 구현 가능 */}
    </div>
  );
};

export default UserManagement;
