import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishListContext.jsx';  
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faStar, faHeart } from '@fortawesome/free-solid-svg-icons'; 

export default function RecentProduct() {
  const [products, setProducts] = useState([]);
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishlist, deleteProductFromWishlist, wishlist, getWishlist } = useContext(WishlistContext);  
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; 
  const [addingToCart, setAddingToCart] = useState(false); 
  const [addingToWishlist, setAddingToWishlist] = useState(false); 

  useEffect(() => {
    getProducts();
    getWishlist();
  }, []);

  async function toggleWishlist(id) {
    setCurrentId(id);
    setAddingToWishlist(true); 
    const isInWishlist = wishlist.some(product => product._id === id);
    try {
      if (isInWishlist) {
        let response = await deleteProductFromWishlist(id);
        if (response.data.status === "success") {
          toast.success("Product removed from wishlist");
        } else {
          toast.error(response.data.message);
        }
      } else {
        let response = await addProductToWishlist(id);
        if (response.data.status === "success") {
          toast.success("Product added to wishlist");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred while updating the wishlist.");
    } finally {
      setAddingToWishlist(false); 
    }
    setLoading(false);
  }

  async function addToCart(id) {
    setCurrentId(id);
    setAddingToCart(true); 
    try {
      let response = await addProductToCart(id);
      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while adding the product to the cart.");
    } finally {
      setAddingToCart(false); 
    }
  }

  function getProducts() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/products')
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 my-5">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {currentProducts.map((product) => (
          <div 
            key={product._id} 
            className='bg-white shadow-md rounded-lg overflow-hidden relative transform transition-transform duration-300 hover:scale-105'
          >
            <Link to={`/productdetails/${product._id}/${product.category.name}`}>
              <img 
                src={product.imageCover} 
                className='w-full h-64 object-cover mb-3' 
                alt={product.title} 
              />
              <div className='p-4'>
                <h3 className='text-green-600'>{product.category.name}</h3>
                <h3 className='font-bold'>{product.title}</h3>
                <div className='flex justify-between'>
                  <span>{product.price} EGP</span> 
                  <span className='flex items-center'>
                    <span className='text-yellow-400'><FontAwesomeIcon icon={faStar} /></span> 
                    {product.ratingsAverage}
                  </span>
                </div>
              </div>
            </Link>
            <div 
              className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-300 bg-white`}
            >
              <button onClick={() => toggleWishlist(product._id)}>
                <FontAwesomeIcon 
                  icon={faHeart} 
                  size="lg" 
                  className={wishlist.some(item => item._id === product._id) ? 'text-gray-500' : 'text-red-500'} 
                />
              </button>
            </div>
            <div className='p-4 flex justify-between items-center'>
              {!addingToCart || currentId !== product._id ? (
                <button 
                  onClick={() => addToCart(product._id)} 
                  className='btn bg-amber-400 text-white p-3 rounded'
                  disabled={loading && currentId === product._id}
                >
                  {loading && currentId === product._id ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className='pagination mt-4 text-center'>
        {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`btn mx-1 p-2 px-5 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
