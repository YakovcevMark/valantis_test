import React, {memo, useEffect, useState} from "react";
import {ChevronLeft, ChevronRight} from "@styled-icons/material";
import {SPagination} from "common/components/Pagination/styles";
import {useAppDispatch, useAppSelector} from "common/hooks/hooks";
import {selectIds, selectPage, setPage} from "app/appSlice";
import {useFetchProductsQuery} from "app/productsApi";
const pageSize = 50;
const portionSize = 5;
export const Pagination =
    memo(
        () => {

            const [portionNumber, setPortionNumber] = useState(1);

            const productsIds = useAppSelector(selectIds)
            const currentPage = useAppSelector(selectPage)
            const dispatch = useAppDispatch()

            const {
                isFetching: isPaginationDisabled
            } = useFetchProductsQuery(undefined, {skip: true})

            const totalItemsCount = productsIds ? productsIds.length : 1

            const countOfPages = Math.ceil(totalItemsCount / pageSize);

            const pages = new Array(countOfPages);

            for (let i = 0; i <= countOfPages; i++) {
                pages[i] = i;
            }

            const portionCount = Math.ceil(countOfPages / portionSize);
            const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
            const rightPortionPageNumber = portionNumber * portionSize;

            useEffect(() => {
                setPortionNumber(Math.ceil(currentPage / portionSize))
            }, [currentPage]);

            return (
                <SPagination>
                    <button
                        disabled={portionNumber <= 1 || isPaginationDisabled}
                        onClick={() => setPortionNumber(portionNumber - 1)}>
                        <ChevronLeft/>
                    </button>

                    {
                        pages
                            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                            .map(p => {
                                return <button key={p}
                                               className={currentPage === p ? "selectedPage" : "paginationItem"}
                                               onClick={() => {
                                                   dispatch(setPage(p));
                                               }}
                                               disabled={isPaginationDisabled}>
                                    {p}
                                </button>
                            })
                    }

                    <button
                        disabled={portionCount <= portionNumber || isPaginationDisabled}
                        onClick={() => setPortionNumber(portionNumber + 1)}>
                        <ChevronRight/>
                    </button>

                </SPagination>
            )
        }
);
