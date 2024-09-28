import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Electronics');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Error fetching categories');
      }
    }

    fetchCategories();
  }, []);

  
  const fetchProducts = async (categoryId) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
        params: { category: categoryId }, 
      });

      console.log('API Response:', response);
      console.log('Products Data:', response.data.data);

      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        setProducts([]);
        setError('No products found in this category.');
      }
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
      setError(
        error.response && error.response.data && error.response.data.message
          ? `Error: ${error.response.data.message}`
          : 'Error fetching products. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const categoryId = categories.find(cat => cat.name === selectedCategory)?._id;
    if (categoryId) {
      fetchProducts(categoryId);
    }
  }, [selectedCategory, categories]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center my-4">
        <button
          onClick={() => setSelectedCategory('Women\'s Fashion')}
          className={`px-4 py-2 mx-2 rounded ${selectedCategory === 'Women\'s Fashion' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Women's Fashion
        </button>
        <button
          onClick={() => setSelectedCategory('Electronics')}
          className={`px-4 py-2 mx-2 rounded ${selectedCategory === 'Electronics' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Electronics
        </button>
        <button
          onClick={() => setSelectedCategory('Men\'s Fashion')}
          className={`px-4 py-2 mx-2 rounded ${selectedCategory === 'Men\'s Fashion' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Men's Fashion
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded shadow-md">
            <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>

      {!loading && products.length === 0 && !error && (
        <p>No products available in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
