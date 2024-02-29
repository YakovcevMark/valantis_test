import styled from "styled-components";

export const SSettingsBlock = styled.form`
    padding-left: 5px;
    display: grid;
    grid-template-columns: 60% 20% 20%;
`

export const SSearchBlock = styled.article`
    display: grid;
    justify-self: start;
    width: 90%;
    grid-auto-rows: 30px 35px;

    h2 {
        margin: 0;
        padding: 0;
    }

    input:invalid {
        border: 3px solid #f87d7d;
        border-radius: 3px;
    }
`