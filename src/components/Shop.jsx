import React, { useState, useEffect } from "react"
import { API_URL, API_KEY } from "../config"
import Alert from "./Alert"
import BasketList from "./BasketList"
import Cart from "./Cart"
import ItemsList from "./ItemsList"
import Preloader from "./Preloader"

function Shop() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const [isBasketShow, setBasketShow] = useState(false)
    const [alertName, setAlertName] = useState("")

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id
        )

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    }
                } else {
                    return orderItem
                }
            })

            setOrder(newOrder)
        }
        setAlertName(item.name)
    }

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId)
        setOrder(newOrder)
    }

    const incQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity + 1
                return {
                    ...el,
                    quantity: newQuantity,
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    const decQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow)
    }

    const closeAlert = () => {
        setAlertName("")
    }

    useEffect(function getItems() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                data.featured && setItems(data.featured)
                setLoading(false)
            })
    }, [])

    return (
        <main className="container content">
            <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
            {loading ? (
                <Preloader />
            ) : (
                <ItemsList items={items} addToBasket={addToBasket} />
            )}
            {isBasketShow && (
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incQuantity={incQuantity}
                    decQuantity={decQuantity}
                />
            )}
            {alertName && <Alert name={alertName} closeAlert={closeAlert} />}
        </main>
    )
}

export default Shop
