import {isRejectedWithValue, Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import {productsApi} from "app/productsApi";
// type actionsType =
//     "fetchProductsIds"
//     | "fetchProducts"
//     | "fetchProductsFields"
//     | "filterProducts"
export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action: any) => {

        if (isRejectedWithValue(action)) {
            debugger
            if (action.payload.originalStatus >= 500) {
                console.warn(`Error status: ${action.payload.originalStatus}\nError data: ${action.payload.data}`)

                // switch (action.meta.arg.endpointName) {
                //     case "fetchProductsIds": {
                //         api.dispatch(productsApi.endpoints?.fetchProductsIds.initiate(undefined, {forceRefetch: true}))
                //         break;
                //     }
                //     case "fetchProducts": {
                //         api.dispatch(productsApi.endpoints?.fetchProducts.initiate(undefined, {forceRefetch: true}))
                //         break;
                //     }
                //     case "fetchProductsFields": {
                //         api.dispatch(productsApi.endpoints?.fetchProductsFields.initiate(undefined, {forceRefetch: true}))
                //         break;
                //     }
                //     case "filterProducts": {
                //         api.dispatch(productsApi.endpoints?.filterProducts.initiate(undefined, {forceRefetch: true}))
                //         break;
                //     }
                // }

            }
        }

        return next(action)
    }