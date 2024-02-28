import {configureStore} from "@reduxjs/toolkit";
import {productsApi} from "app/productsApi";
import {rtkQueryErrorLogger} from "utils/rtkQueryErrorLogger/rtkQueryErrorLogger";

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(rtkQueryErrorLogger)
})
