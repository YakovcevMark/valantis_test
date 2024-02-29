import {createApi, FetchArgs, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react";
import {generateToken} from "utils/generateToken/generateToken";

type ProductFields = "brand" | "price" | "product"
type Params<T> = {
    offset: number
    limit: number
} & T

type Response<T> = {
    result: T
}
export type Product = {
    id: string
    brand: string,
    price: number
    product: string
}
const staggeredBaseQueryWithBailOut = retry(
    async (args: string | FetchArgs, api, extraOptions) => {

        const result = await fetchBaseQuery(
            {
                baseUrl: "https://api.valantis.store:41000/",
                prepareHeaders: (headers) => {
                    const token = generateToken()
                    headers.set('X-Auth', token)
                    return headers
                },
            })(
            args,
            api,
            extraOptions
        )

        if (result.meta && result.error) {
            if(result.meta.response && result.error.data) {
                if (result.meta.response.status >= 500) {
                    console.warn(`Error status: ${result.meta.response.status}\nError data: ${result.error.data}`)
                }
            }
        }
        return result
    },
    {
        maxRetries: 10,
    }
)
export const productsApi = createApi({
    reducerPath: "products",
    baseQuery: staggeredBaseQueryWithBailOut,
    endpoints: build => ({
        fetchProductsIds: build.query<Response<string []>, void | Partial<Params<{}>>>({
            query: (params) => ({
                url: "",
                method: 'POST',
                body: {
                    params,
                    action: "get_ids"
                }
            }),
            transformResponse: (response: Response<string []>) =>
                ({result: Array.from(new Set(response.result))}),
        }),
        fetchProducts: build.query<Response<Array<Product>>,
            void | { ids: string[] }>({
            query: (params) => ({
                url: "",
                method: 'POST',
                body: {
                    params,
                    action: "get_items"
                }
            }),
            transformResponse: (response: Response<Array<Product>>) => {
                let output = new Array(response.result.length)
                const set = new Set()
                response.result.forEach(item => {
                    if (!set.has(item.id)) {
                        output.push(item)
                        set.add(item.id)
                    }
                })
                return {result: output}
            },
        }),
        fetchProductsFields: build.query<Response<string []>,
            void | Params<{ field: ProductFields }>>({
            query: (params) => ({
                url: "",
                method: 'POST',
                body: {
                    params,
                    action: "get_fields"
                }
            }),
        }),
        filterProducts: build.query<Response<string []>, Partial<Product>>({
            query: (params) => ({
                url: "",
                method: 'POST',
                body: {
                    params,
                    action: "filter"
                }
            }),
        }),
    }),
})
export const {
    useLazyFilterProductsQuery,
    useFetchProductsQuery,
    useFetchProductsFieldsQuery,
    useFetchProductsIdsQuery,
} = productsApi
// @ts-ignore
window.productsApi = productsApi