import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    color: white;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    margin: 0;
    overflow: hidden;
    padding: 0;
    text-decoration: none;
  }

  * {
    -webkit-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    text-decoration: none;
}
`;

export default GlobalStyle;
