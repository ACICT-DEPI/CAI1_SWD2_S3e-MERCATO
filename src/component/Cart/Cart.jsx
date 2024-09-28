import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Cart() {
  const { getLoggedUserCart, updateCartProductQuantity, deleteCartItem, clearCart } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  async function getCartItem() {
    try {
      let response = await getLoggedUserCart();
      if (response.data.status === "success") {
        setCartDetails(response.data.data);
      } else {
        toast.error("Failed to fetch cart items");
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      toast.error("Failed to fetch cart items");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }

  async function updateProduct(id, count) {
    if (count === 0) {
      return; 
    }

    try {
      let response = await updateCartProductQuantity(id, count);
      if (response.data.status === "success") {
        setCartDetails(response.data.data);
        toast.success("Product Updated Successfully");
      } else {
        toast.error("Error updating product");
      }
    } catch (error) {
      console.error('Error updating product quantity:', error);
      toast.error("Failed to update product");
    }
  }

  async function deleteItem(productId) {
    try {
      let response = await deleteCartItem(productId);
      if (response.status === 200 && response.data.status === "success") {
        setCartDetails(response.data.data);
        toast.success("Product Deleted Successfully");
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      console.error('Error in deleteItem function:', error);
      toast.error("Failed to delete product");
    }
  }

  async function handleClearCart() {
    try {
      await clearCart();
      setCartDetails({ products: [], totalCartPrice: 0 }); 
      toast.success("Cart Cleared Successfully");
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error("Failed to clear cart");
    }
  }

  useEffect(() => {
    getCartItem();
  }, []);

  if (loading) { // Display spinner while loading
    return (
      <div className="flex justify-center items-center h-screen">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-green-500" />
      </div>
    );
  }

  return (
    <>
      {cartDetails?.products.length > 0 ? (
        <>
          <div className="container flex justify-center my-8">
            <h2 className='text-center bg-green-500 p-3 font-bold rounded text-white w-96'>
              Total Price: {cartDetails?.totalCartPrice} EGP
            </h2>
          </div>
          
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Qty</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails?.products.map((product) => (
                  <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img 
                        src={product.product.imageCover} 
                        className="w-16 md:w-32 max-w-full max-h-full" 
                        alt={product.product.title} 
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateProduct(product.product.id, product.count - 1)} 
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                          type="button"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div><span>{product.count}</span></div>
                        <button 
                          onClick={() => updateProduct(product.product.id, product.count + 1)} 
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                          type="button"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        onClick={() => deleteItem(product.product.id)} 
                        className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className='container flex justify-center my-5'>
            <button 
              onClick={handleClearCart} 
              className='bg-red-600 text-white text-center rounded-lg p-3 mx-4 w-72'
            >
              Clear Cart
            </button>

            <Link to={'/checkout'}>
              <button className="bg-green-500 text-white text-center rounded-lg p-3 mx-4 w-72">
                Checkout
              </button>
            </Link>
          </div>
        </>
      ) : (
        <div className='container flex justify-center'>
          <h1 className='bg-red-500 text-white rounded-lg p-3 text-center font-bold my-10 w-96'>
            No Products added
          </h1>
        </div>
      )}
    </>
  );
}
