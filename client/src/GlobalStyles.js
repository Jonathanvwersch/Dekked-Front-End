import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    a: {
        textDecoration: "none",
    },
    
    "*": {
        margin: "0",
        boxSizing: "border-box",
        fontFamily: ${({ theme }) => theme.typography.fontFamily},
        "&:focus": {
        outline: "0",
        },
    },

    "*::-webkit-scrollbar": {
        width: "8px",
        cursor: "auto",
    },

    /* Track */
    "*::-webkit-scrollbar-track": {
        background: "#DEDEDE",
        cursor: "auto",
    },

    /* Handle */
    "*::-webkit-scrollbar-thumb": {
        background: "#C6C5C2",
        cursor: "auto",

        "&:hover": {
        background: "#B6B5B2",
        cursor: "pointer!important",
        },
    },
`;
