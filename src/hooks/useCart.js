import { useEffect, useMemo, useState } from "react";
import { db } from "../data/db";


export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };


    // const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);



    function addTocart (item) {

        const itemExist = cart.findIndex(guitar => guitar.id === item.id);

        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return;
            const copyCart = [...cart];
            copyCart[itemExist].quantity++;
            setCart(copyCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }

    }

    function removeFronCart (id) {
        setCart(cart => cart.filter(guitar => guitar.id !== id));
    }


    function incrementarQuantity (id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    function uncrementarQuantity (id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        });
        setCart(updatedCart);
    }


    function clearCart () {
        setCart([]);
    }


    //State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);


    return {
        db,
        cart,
        addTocart,
        removeFronCart,
        incrementarQuantity,
        uncrementarQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}