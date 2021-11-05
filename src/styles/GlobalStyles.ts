import { createGlobalStyle } from "styled-components";
import { SIZES } from "../shared";
import { ThemeType } from "dekked-design-system";

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
    a {
        text-decoration: none;
        &:focus {
            color: ${({ theme }) => theme.colors.primary}!important;
        }
    }

    body {
        font-family: ${({ theme }) => theme.typography.fontFamily};
    }

    * {
        margin: 0;
        box-sizing: border-box;
        &:focus {
            outline: 0;
        }
        &:disabled {
            cursor: not-allowed;
        }
    }
   
    *::-webkit-scrollbar {
        width: 8px;
        cursor: auto;

    }

    /* Track */
    *::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.grey3};
        cursor: auto;
        border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.MEDIUM]};
    }

    /* Handle */
    *::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.grey2};
        cursor: auto;
        border-radius: ${({ theme }) => theme.sizes.borderRadius[SIZES.MEDIUM]};
        
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
