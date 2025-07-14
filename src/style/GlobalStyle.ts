import { createGlobalStyle } from "styled-components";

// 전역 스타일
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }

  /* 커스텀 스크롤바 전체 적용 */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(128, 128, 128, 0.5);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
  }

  /* SweetAlert2 스타일 */
  .swal-popup {
    border-radius: 16px;
    padding: 20px;
  }

  .swal-confirm {
    font-weight: bold;
    font-size: 16px;
  }

  .swal-cancel {
    font-size: 16px;
  }

  /* 숫자 인풋 화살표 제거 */
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield; /* Firefox */
    appearance: textfield;      /* 기타 브라우저 */
  }
`;

export default GlobalStyle;
