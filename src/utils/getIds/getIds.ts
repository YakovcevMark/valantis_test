export const getIds = (ids: string [] | undefined, page: number, amount: number = 50,) => {

    if (ids) {
        const startIndex = (page - 1) * 50
        const endIndex = startIndex + 50

        return ids.slice(startIndex, endIndex)
    }

    return []

}