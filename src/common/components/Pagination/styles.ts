import styled from "styled-components";

export const SPagination = styled.section`
    justify-self: start;
    align-self: end;
    display: flex;
    justify-content: center;

    margin-bottom: 20px;
    span {
        align-self: center;
    }

    button {
        border: none;
        border-radius: 3px;
        padding: 10px 15px;
        margin: 0 10px;
        cursor: pointer;

        &:disabled {
            cursor: auto;
        }
    }

    svg {
        width: 20px;
    }

    .selectedPage {
        background-color: dodgerblue;
        font-weight: bold;
    }
`