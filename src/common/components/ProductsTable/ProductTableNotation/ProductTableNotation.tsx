import React, {memo} from "react";

type PT = {
    id: string
    name: string
    price: number
    brand: string
}
export const ProductTableNotation = memo(
    ({
         name,
         price,
         id,
         brand
     }: PT) => {
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{brand}</td>
            </tr>
        )
    }
)