import { createGlobalStyle } from "styled-components/macro";
import { ThemeType } from "./theme";

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
    a {
        text-decoration: none;
    }

    * {
        margin: 0;
        box-sizing: border-box;
        font-family: ${({ theme }) => theme.typography.fontFamily};
        &:focus {
            outline: 0;
        }
    }
   
    *::-webkit-scrollbar {
        width: 8px;
        cursor: auto;
    }

    /* Track */
    *::-webkit-scrollbar-track {
        background: #DEDEDE;
        cursor: auto;
    }

    /* Handle */
    *::-webkit-scrollbar-thumb {
        background: #C6C5C2;
        cursor: auto;

        &:hover: {
            background: #B6B5B2;
            cursor: pointer!important;
        }
    }

    .public-DraftStyleDefault-ltr {
        width: 100%;
        word-break: break-word; 
    }

`;

export default GlobalStyle;
