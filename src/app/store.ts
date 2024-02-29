import {configureStore} from "@reduxjs/toolkit";
import {productsApi} from "app/productsApi";
import {rtkQueryErrorLogger} from "utils/rtkQueryErrorLogger/rtkQueryErrorLogger";
import {appReducer} from "app/appSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(productsApi.middleware)
            .concat(rtkQueryErrorLogger)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch