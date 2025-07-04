import { createGlobalStyle } from "styled-components";

// 사이드바 css
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
  `;

export default GlobalStyle;
