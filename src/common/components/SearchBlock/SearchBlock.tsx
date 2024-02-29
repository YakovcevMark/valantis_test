import React, {memo, useEffect, useState} from "react";
import {Product, useFetchProductsIdsQuery, useLazyFilterProductsQuery} from "app/productsApi";
import {useDebounce} from "@uidotdev/usehooks";
import {useAppDispatch} from "common/hooks/hooks";
import {setProductsIds} from "app/appSlice";
import {isFilterNotEmpty} from "utils/isFilterNotEmpty/isFilterNotEmpty";
import {convertFilterValues} from "utils/convertFilterValues/convertFilterValues";
import {SSearchBlock, SSettingsBlock} from "common/components/SearchBlock/styles";

type Filter = Partial<Product>

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
                        initialProductsIds && dispatch(setProductsIds(initialProductsIds.result))
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
                    <SSearchBlock>
                        <h2>Поиск по имени товара</h2>
                        <input
                            value={filter["product"]}
                            onChange={(e) => handleSetFilter("product", e.currentTarget.value)}
                            type="search"/>
                    </SSearchBlock>
                    <SSearchBlock>
                        <h2>Поиск по цене</h2>
                        <input
                            min="0"
                            value={filter["price"]}
                            onChange={(e) => handleSetFilter("price", e.currentTarget.value)}
                            type="number"/>
                    </SSearchBlock>
                    <SSearchBlock>
                        <h2>Поиск по бренду</h2>
                        <input
                            value={filter["brand"]}
                            onChange={(e) => handleSetFilter("brand", e.currentTarget.value)}
                            type="search"/>
                    </SSearchBlock>
                </SSettingsBlock>
            )

        }
    )

