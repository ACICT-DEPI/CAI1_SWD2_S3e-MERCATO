import React, { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../Context/WishListContext';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Wishlist() {
  const { wishlist, deleteProductFromWishlist } = useContext(WishlistContext);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    try {
      await deleteProductFromWishlist(id);
      toast.success("Product removed from wishlist.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Simulating loading time
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust the loading time as necessary
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen my-5 mt-5">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-4xl" />
      </div>
    );
  }

  if (wishlist.length === 0) {
    return <p>Your wishlist is empty.</p>;
  }

  return (
    <div className='flex flex-wrap justify-center'>
      {wishlist.map((product) => (
        <div key={product._id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2'>
          <div className='product p-3 border border-gray-200 rounded-lg shadow-lg relative group'>
            <img src={product.imageCover} className='w-full h-40 object-cover mb-3' alt={product.title} />
            <h3 className='text-green-600'>{product.category.name}</h3>
            <h3 className='font-bold'>{product.title}</h3>
            <div className='flex justify-between'>
              <span>{product.price} EGP</span>
              <span><i className='fa fa-star text-yellow-300'></i> {product.ratingsAverage}</span>
            </div>
            <button
              onClick={() => handleDelete(product._id)}
              className='w-full bg-red-500 text-white p-3 rounded mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300'
              style={{ height: '40px' }} // Set height for the button space
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
