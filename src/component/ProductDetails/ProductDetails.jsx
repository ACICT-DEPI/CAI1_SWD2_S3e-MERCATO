import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import style from './ProductDetails.module.css';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'; // Import CartContext
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addProductToCart } = useContext(CartContext); // Use CartContext

  const { id } = useParams();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const productResponse = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      const fetchedProduct = productResponse.data.data;
      setProduct(fetchedProduct);

      const productsResponse = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      const allProducts = productsResponse.data.data;

      const related = allProducts.filter(
        (item) => item.category.name === fetchedProduct.category.name && item.id !== fetchedProduct.id
      );
      setRelatedProducts(related);
      setError(null);
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to fetch product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addProductToCart(product.id); // Use the product's ID
      toast.success('Product added to cart successfully!'); // Notify the user
    } catch (error) {
      toast.error('Failed to add product to cart.'); // Handle error
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-green-500 text-xl">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-red-500 text-xl">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="md:w-1/3">
          <Slider {...settings}>
            {product?.images.map((src, index) => <img key={index} src={src} className='w-full' alt={product.title} />)}
          </Slider>
        </div>
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-green-600 text-xl font-semibold mr-4">
                {product.price} EGP
              </span>
              <div className="flex items-center">
                <i className="fa fa-star text-yellow-400 mr-1"></i>
                <span>{product.ratingsAverage}</span>
              </div>
            </div>
            <span className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded">
              {product.category.name}
            </span>
          </div>
          <button
            onClick={handleAddToCart} // Call handleAddToCart on click
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h3 className="text-xl font-bold mb-6">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={`/productdetails/${relatedProduct.id}`}>
                  <img
                    src={relatedProduct.imageCover}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2">
                      {relatedProduct.title}
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-600 font-semibold">
                        {relatedProduct.price} EGP
                      </span>
                      <div className="flex items-center">
                        <i className="fa fa-star text-yellow-400 mr-1"></i>
                        <span>{relatedProduct.ratingsAverage}</span>
                      </div>
                    </div>
                    <span className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded">
                      {relatedProduct.category.name}
                    </span>
                  </div>
                </Link>
                <button className="w-full bg-green-500 text-white py-2 hover:bg-green-600 transition duration-300">
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
