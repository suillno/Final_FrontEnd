import styled from "styled-components";
import { GiCheckMark } from "react-icons/gi";
import { MdOutlineTrendingDown } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";

// 카드 전체 컨테이너
export const Card = styled.div`
  background-color: #2a2b32;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.4s ease;
  position: relative;
  border: 1px solid pink;

  img {
    cursor: pointer;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
`;

// 카드 내부 정보 영역
export const Info = styled.div`
  padding: 0.8rem;
  color: white;
  background-color: #1e1f24;
`;

// 체크 아이콘
export const CheckIcon = styled(GiCheckMark)`
  color: gray;
  transition: color 0.2s;
  cursor: pointer;
  width: 20px;
  height: 20px;

  button:hover & {
    color: green;
  }
`;

// 장바구니 아이콘
export const CartIcon = styled(BsFillCartCheckFill)`
  width: 20px;
  height: 20px;
`;

// 할인 아이콘
export const DownIcon = styled(MdOutlineTrendingDown)`
  width: 20px;
  height: 20px;
`;
