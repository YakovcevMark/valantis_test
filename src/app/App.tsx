import React from 'react';
import {Pagination} from "common/components/Pagination/Pagination";
import styled from "styled-components";
import {useInitializeApp} from "app/useInitializeApp";
import {ProductsTable} from "common/components/ProductsTable/ProductsTable";
import {FilterBlock} from "common/components/SearchBlock/SearchBlock";
import {Preloader} from "common/components/Preloader/Preloader";

export const App = () => {

    const {
        isAppInitialized,
    } = useInitializeApp()

    return isAppInitialized ? (
        <SApp>
            <h1>
                Valantis TestApp
            </h1>
            <FilterBlock/>
            <Pagination/>
            <ProductsTable/>
        </SApp>
    ) : <Preloader/>;
}


const SApp = styled.main`
    border-radius: 58px;
    padding: 10px;
    margin: 10px auto;
    min-height: 95vh;
    width: 90vw;
    display: grid;
    background-color: #8793d9b0;
    grid-template-rows:repeat(3, 80px) 7fr;
`

