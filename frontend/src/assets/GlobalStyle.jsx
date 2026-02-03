import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset CSS básico */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif; /* Exemplo de fonte */
    background-color: #f8f9fa; /* Cor de fundo padrão */
    color: #333;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: 700;
    color: #0d1b2a; /* Exemplo de cor para títulos */
  }

  p {
    margin-top: 0;
    margin-bottom: 1em;
  }

  a {
    color: #007bff; /* Exemplo de cor para links */
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyles;