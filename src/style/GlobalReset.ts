// src/styles/GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    
    box-sizing: border-box;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul,
  ol,
  li {
    list-style: none;
    padding-left: 0%;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
  }

  input,
  textarea,
  select,
  button {
    font: inherit;
  }

  strong,
  em {
    font-weight: bold;
  }

  body {
    line-height: 1.5;
    font-family: "Malgun Gothic", "Apple SD Gothic Neo", sans-serif;
    color: #222;
    background-color: #fff;
  }
`;

export default GlobalStyle;
