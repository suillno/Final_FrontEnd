import styled from "styled-components";

export const PageWrapper = styled.div<{ $isSidebarOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding: 2em;
  background-color: #121317;
  margin-left: ${(props) => (props.$isSidebarOpen ? "300px" : "0")};
  transition: margin-left 0.3s ease;
`;

export const SectionBox = styled.div`
  width: 100%;
  max-width: 800px;
  background-color: #1e1f1f;
  border-radius: 12px;
  padding: 40px;
  color: #fff;
  margin-top: 100px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
`;

export const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ItemCard = styled.div`
  background-color: #292c31;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #00eaff;
`;

export const Image = styled.img`
  width: 130px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
`;

export const Info = styled.div`
  flex: 1;
`;

export const GameTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
`;

export const SubInfo = styled.div`
  font-size: 14px;
  color: #aaa;
  margin-top: 4px;
  line-height: 1.6;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    gap: 6px;
  }
`;

export const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 160px;
`;

export const Price = styled.div`
  font-size: 16px;
  color: #ccc;
`;

export const OriginalPrice = styled.div`
  font-size: 14px;
  color: #888;
  text-decoration: line-through;
`;

export const SalePrice = styled.div`
  font-size: 16px;
  color: #00eaff;
  font-weight: bold;
`;

export const DiscountRate = styled.span`
  font-size: 13px;
  color: #ff6b6b;
  margin-left: 6px;
`;

export const TotalBar = styled.div`
  margin-top: 2em;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  border-top: 1px solid #555;
  padding-top: 20px;
  line-height: 1.8;
`;

export const CheckoutButton = styled.button`
  margin-top: 1.5em;
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #00c853, #009b46);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #00b04c;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const ModalBox = styled.div`
  background-color: #222;
  padding: 2rem;
  border-radius: 12px;
  width: 360px;
  color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  text-align: center;
`;

export const ModalText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ModalButton = styled.button<{ $variant: "cancel" | "confirm" }>`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  background-color: ${(props) =>
    props.$variant === "cancel" ? "#888" : "#00e676"};
  color: #000;

  &:hover {
    opacity: 0.9;
  }
`;
