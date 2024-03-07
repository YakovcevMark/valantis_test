import React, {memo, useEffect, useState} from "react";
import {useFetchProductsIdsQuery, useLazyFilterProductsQuery} from "app/productsApi";
import {useDebounce} from "@uidotdev/usehooks";
import {useAppDispatch} from "common/hooks/hooks";
import {setProductsIds} from "app/appSlice";
import {isFilterNotEmpty} from "utils/isFilterNotEmpty/isFilterNotEmpty";
import {convertFilterValues} from "utils/convertFilterValues/convertFilterValues";
import {SSearchBlock, SSettingsBlock} from "common/components/SearchBlock/styles";

type Filter = {
    [key: string]: string | number
}

const inputs = [
    {title: "Поиск по имени товара", value: "product"},
    {title: "Поиск по цене", value: "price"},
    {title: "Поиск по бренду", value: "brand"}
]
export const FilterBlock =
    memo(() => {

            const [filter, setFilter] =
                useState<Filter>({
                    product: "",
                    price: 0,
                    brand: ""
                })

            const debouncedFilter = useDebounce(filter, 1500)

            const dispatch = useAppDispatch()

            const [filterProducts] = useLazyFilterProductsQuery(undefined)

            const {
                data: initialProductsIds
            } = useFetchProductsIdsQuery(undefined)

            useEffect(() => {
                if (debouncedFilter) {
                    if (isFilterNotEmpty(debouncedFilter)) {
                        filterProducts(convertFilterValues(debouncedFilter))
                    } else {
                        initialProductsIds && dispatch(setProductsIds(initialProductsIds))
                    }
                }
            }, [debouncedFilter, filterProducts, initialProductsIds, dispatch]);

            const handleSetFilter = (field: string, value: string | number) => {
                if (field === "price" && value < 0)
                    return
                setFilter(filter => ({
                    ...filter,
                    [field]: value
                }))
            }

            return (
                <SSettingsBlock>
                    {inputs.map((item, i) =>
                        <SSearchBlock key={i}>
                            <h2>{item.title}</h2>
                            <input
                                value={filter[item.value]}
                                onChange={(e) => handleSetFilter(item.value, e.currentTarget.value)}
                                type={i === 1 ? "number" : "search"}/>
                        </SSearchBlock>
                    )}
                </SSettingsBlock>
            )

        }
    )

