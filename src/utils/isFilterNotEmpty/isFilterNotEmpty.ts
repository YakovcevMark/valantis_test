export const isFilterNotEmpty = (filter: any): boolean => {
    for (let field in filter) {
        if (!!filter[field])
            return true
    }
    return false
}