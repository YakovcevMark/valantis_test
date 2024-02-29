import {useFetchProductsFieldsQuery, useFetchProductsIdsQuery} from "app/productsApi";

export const useInitializeApp = () => {

    const {
        isSuccess: isProductsIdsFetched,
    } = useFetchProductsIdsQuery(undefined)

    const {
        isSuccess: isProductsFieldsFetched,
    } = useFetchProductsFieldsQuery()

    const isAppInitialized =
        isProductsFieldsFetched
        && isProductsIdsFetched

    return {
        isAppInitialized
    }
}