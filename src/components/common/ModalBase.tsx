import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import DiscountEvent from "../../img/DiscountEvent.png";
function Base() {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  // 하루동안 숨김 여부 체크
  useEffect(() => {
    const hideUntil = localStorage.getItem("hideAdUntil");
    if (!hideUntil || new Date(hideUntil) < new Date()) {
      setOpenModal(true);
    }
  }, []);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  // 하루동안 숨기기
  const onClickHideToday = useCallback(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    localStorage.setItem("hideAdUntil", tomorrow.toISOString());
    setOpenModal(false);
  }, []);

  return (
    <Main>
      {isOpenModal && (
        <Modal onClickToggleModal={onClickToggleModal}>
          <div>
            <div>
              <img src={DiscountEvent} />
            </div>
          </div>
          <ButtonBox>
            <TodayButton onClick={onClickHideToday}>
              오늘 하루 보지 않기
            </TodayButton>
            <CloseButton onClick={onClickToggleModal}>닫기</CloseButton>
          </ButtonBox>
        </Modal>
      )}
    </Main>
  );
}

const Main = styled.main`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px white solid;
`;

const CloseButton = styled.button`
  color: white;
  padding: 5px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const TodayButton = styled.button`
  color: white;
  padding: 5px 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export default Base;
