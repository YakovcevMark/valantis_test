import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {productsApi} from "app/productsApi";

const appSlice = createSlice({
    name: 'app',
    initialState: {
        productsIds: [] as string [],
        page: 1
    },
    selectors: {
        selectIds: (state) => state.productsIds,
        selectPage: (state) => state.page
    },
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setProductsIds: (state, action: PayloadAction<string []>) => {
            state.productsIds = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addMatcher(productsApi.endpoints?.fetchProductsIds.matchFulfilled,
                (state, action) => {
                    state.productsIds = action.payload.result
                    state.page = 1
                })
            .addMatcher(productsApi.endpoints?.filterProducts.matchFulfilled,
                (state, action) => {
                    state.productsIds = action.payload.result
                    state.page = 1
                })
    }
})

export const {
    selectIds,
    selectPage
} = appSlice.selectors

export const {
    setPage,
    setProductsIds
} = appSlice.actions
export const appReducer = appSlice.reducer
