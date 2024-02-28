import {md5} from "js-md5";
export const generateToken = () => {

    const password = "Valantis"

    const timestamp = new Date()
        .toISOString()
        .slice(0, 10)
        .split('-')
        .join('')

    return md5(`${password}_${timestamp}`)
}