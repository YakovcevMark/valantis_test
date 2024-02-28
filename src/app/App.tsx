import React from 'react';
import 'app/App.css';
import {Pagination} from "components/Pagination/Pagination";
import styled from "styled-components";
import {useInitializeApp} from "app/useInitializeApp";

export const App = () => {

    const {
        page, setPage, totalProductsCount,
        productsFields, products,
        isAppInitialized, isProductsFetching
    } = useInitializeApp()


    return isAppInitialized ? (
        <SApp>
            <Pagination
                pageSize={50}
                totalItemsCount={totalProductsCount}
                currentPage={page}
                pageChanged={setPage}/>
        </SApp>
    ) : <div>Loading.....</div>;
}
const SApp = styled.main`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: ;
`

