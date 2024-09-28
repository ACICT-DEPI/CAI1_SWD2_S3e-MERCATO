import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from "yup";
import UserContextProvider, { UserContext } from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; 



export default function LoginForm() { 
  let {userLogin,setUserLogin} = useContext(UserContext)
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [loading, setloading] = useState(false);

  async function handleLogin(values) {
    setloading(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setloading(false);
        if (res.data.message === "success") { 
          localStorage.setItem("UserToken", res.data.token);
          setUserLogin(res.data.token)
          navigate("/");
        }
      })
      .catch((res) => {
        setloading(false);
        setApiError(res.response.data.message);
      });
  }

  let myValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password Should be between 6 and 10 Chars").required("Password is Required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: myValidation,
    onSubmit: handleLogin
  });

  return (
    <>
      <div className='w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg text-center '>{ApiError}</div>

      <h1 className='text-center my-5 text-green-800 text-2xl font-bold bg-red'>Login Now</h1>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto my-5">
        <div className="relative z-0 w-full mb-5 group">
          <input type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your E-mail</label>
        </div>

        {formik.errors.email && formik.touched.email && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input type="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>

        {formik.errors.password && formik.touched.password && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.password}</span>
          </div>
        )}

        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Login"}</button>

        <Link to={"/Login"}><span className='px-5 text-blue-400'>Don't you have an account, Register Now?</span></Link>
      </form>
    </>
  );
}
