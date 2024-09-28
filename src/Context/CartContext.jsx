import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
    const [cartId, setCartId] = useState(0);
    const [wishlist, setWishlist] = useState([]);
    const headers = {
        token: localStorage.getItem("UserToken"),
    };

    const addProductToCart = (productId) => {
        return axios.post(
            'https://ecommerce.routemisr.com/api/v1/cart',
            { productId: productId },
            { headers }
        )
        .then((res) => res)
        .catch((err) => {
            console.error('Error adding product to cart:', err);
            throw err;
        });
    };

    const getLoggedUserCart = () => {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
            .then((res) => {
                setCartId(res.data.data._id);
                return res;
            })
            .catch((err) => {
                console.error('Error fetching cart:', err);
                throw err;
            });
    };

    const updateCartProductQuantity = (productId, newCount) => {
        return axios.put(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count: newCount },
            { headers }
        )
        .then((res) => res)
        .catch((err) => {
            console.error('Error updating cart product quantity:', err);
            throw err;
        });
    };

    const deleteCartItem = (productId) => {
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { headers }
        )
        .then((res) => res)
        .catch((err) => {
            console.error('Error deleting cart item:', err);
            throw err;
        });
    };

    const clearCart = () => {
        return axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers })
            .then((res) => res)
            .catch((err) => {
                console.error('Error clearing the cart:', err);
                throw err;
            });
    };

    const checkout = (cartId, url, formdata) => {
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            { shippingAddress: formdata },
            { headers }
        )
        .then((res) => res)
        .catch((err) => {
            console.error('Error during checkout:', err);
            throw err;
        });
    };

    const addProductToWishlist = (productId) => {
        return axios.post(
            'https://ecommerce.routemisr.com/api/v1/wishlist',
            { productId: productId },
            { headers }
        )
        .then((res) => {
            setWishlist([...wishlist, res.data.product]);
            return res;
        })
        .catch((err) => {
            console.error('Error adding product to wishlist:', err);
            throw err;
        });
    };

    const removeProductFromWishlist = (productId) => {
        return axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            { headers }
        )
        .then((res) => {
            setWishlist(wishlist.filter(product => product._id !== productId));
            return res;
        })
        .catch((err) => {
            console.error('Error removing product from wishlist:', err);
            throw err;
        });
    };

    const getUserWishlist = () => {
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
            .then((res) => {
                setWishlist(res.data.data);
                return res;
            })
            .catch((err) => {
                console.error('Error fetching wishlist:', err);
                throw err;
            });
    };

    useEffect(() => {
        getLoggedUserCart();
        getUserWishlist();
    }, []);

    return (
        <CartContext.Provider value={{
            addProductToCart,
            getLoggedUserCart,
            updateCartProductQuantity,
            deleteCartItem,
            clearCart,
            checkout,
            cartId,
            addProductToWishlist,
            removeProductFromWishlist,
            getUserWishlist,
            wishlist
        }}>
            {props.children}
        </CartContext.Provider>
    );
}
