import React, {memo} from "react";
import {ProductTableNotation} from "common/components/ProductsTable/ProductTableNotation/ProductTableNotation";
import {useFetchProductsQuery, useLazyFilterProductsQuery} from "app/productsApi";
import {useAppSelector} from "common/hooks/hooks";
import {selectIds, selectPage} from "app/appSlice";
import {STd, STh, Table} from "common/components/ProductsTable/styles";
import {getIds} from "utils/getIds/getIds";

export const ProductsTable =
    memo(
        () => {

            const productsIds = useAppSelector(selectIds)
            const currentPage = useAppSelector(selectPage)

            const [, {isFetching: isProductsFiltered}] = useLazyFilterProductsQuery(undefined)

            const {
                data: products,
                isFetching: isProductsFetching
            } = useFetchProductsQuery({ids: getIds(productsIds, currentPage)})

            return (
                <Table>
                    <thead>
                    <tr>
                        <STh>Идентификатор товара</STh>
                        <STh>Название товара</STh>
                        <STh>Цена</STh>
                        <STh>Бренд</STh>
                    </tr>
                    </thead>
                    {isProductsFetching || isProductsFiltered
                        ? (
                            <tbody>
                                <tr>
                                    <STd colSpan={4}>Loading...</STd>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {products?.result.length
                                    ? products?.result.map(p =>
                                        <ProductTableNotation
                                            key={p.id}
                                            id={p.id}
                                            name={p.product}
                                            price={p.price}
                                            brand={p.brand}/>
                                    ) : (
                                        <tr>
                                            <STd colSpan={4}>Нет продукции соответсвующей поиску...</STd>
                                        </tr>
                                    )
                                }
                            </tbody>
                        )}
                </Table>
            )
        }
    )
