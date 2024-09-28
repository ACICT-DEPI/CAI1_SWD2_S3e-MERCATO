import React, { useContext } from 'react';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function Checkout() {
  const { cartId, checkout } = useContext(CartContext);
  const checkoutUrl = 'http://localhost:5173/';

  async function handleCheckout(cartId, url) {
    try {
      const { data } = await checkout(cartId, url, formik.values);
      if (data?.session?.url) {
        window.location.href = data.session.url;
      } else {
        toast.error('Checkout failed. Please try again.');
      }
    } catch (error) {
      toast.error('Error during checkout. Please try again.');
      console.error('Checkout error:', error);
    }
  }

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckout(cartId, checkoutUrl),
  });

  return (
    <>
      <h1 className="text-center my-5 text-green-800 text-2xl font-bold">Checkout Now</h1>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-5">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.details}
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600">
            Details
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600">
            Phone
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.city}
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600">
            City
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Checkout
        </button>
      </form>
    </>
  );
}
