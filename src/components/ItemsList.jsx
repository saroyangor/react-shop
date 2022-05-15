import React from "react"
import Item from "./Item"

function ItemsList({ items = [], addToBasket = Function.prototype }) {
    if (!items.length) {
        return <h3>Nothing here</h3>
    }

    return (
        <div className="items">
            {items.map((item) => (
                <Item key={item.id} {...item} addToBasket={addToBasket} />
            ))}
        </div>
    )
}

export default ItemsList
