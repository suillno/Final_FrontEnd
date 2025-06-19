import styled from "styled-components";
import gameImg from "../img/game.jpg";

const GenresContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: #333;

  &.active {
    left: 200px;
  }
  ul {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin; /* Firefox */
    &:hover {
      overflow-x: auto;
      overflow-y: hidden;
    }

    /* Chrome, Safari */
    &::-webkit-scrollbar {
      height: 8px; /* 가로 스크롤 높이 */
    }
    & ::-webkit-scrollbar {
      display: none;
    }
    &::-webkit-scrollbar-track {
      background: linear-gradient(
        90deg,
        #fff,
        #fff,
        #fff,
        rgba(0, 0, 255, 0.5),
        rgba(0, 0, 255, 0.5),
        rgba(0, 0, 255, 0.5),
        #fff,
        #fff,
        #fff
      );
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #4b7bec;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #3867d6;
    }
  }

  li {
    margin: 10px;
    button {
      margin-bottom: 10px;
      min-width: 150px;
      border-radius: 5px;
      background-color: #4b7bec;
      padding: 5px 10px;
      color: white;
      font-size: 14px;
    }
  }
`;
const GameImg = styled.div`
  display: flex;
  flex-wrap: wrap;

  img {
    width: 33.33333333%;
    padding: 10px;
  }
`;

const Genres = () => {
  return (
    <GenresContainer>
      <ul>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
        <li>
          {" "}
          <button type="button">게임장르</button>
        </li>
      </ul>
      <GameImg>
        <img src={gameImg}></img>
        <img src={gameImg}></img>
        <img src={gameImg}></img>
        <img src={gameImg}></img>
        <img src={gameImg}></img>
        <img src={gameImg}></img>
      </GameImg>
    </GenresContainer>
  );
};
export default Genres;
