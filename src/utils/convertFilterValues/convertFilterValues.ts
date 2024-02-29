export const convertFilterValues = (filter: any): any => {
    let output: any = {}
    for (let field in filter) {
        if (filter[field])
            output[field] = filter[field]
    }
    return output
}