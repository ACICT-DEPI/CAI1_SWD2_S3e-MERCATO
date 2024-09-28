import React, { useContext, useState } from 'react';
import logo from "../../assets/Mercato Logo.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFacebookMessenger, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <nav className="z-50 border-gray-200 bg-gray-200 fixed top-0 right-0 left-0 shadow">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* Increase logo size here */}
          <img src={logo} width="200" className="h-12" alt="Logo" /> {/* Adjust height and/or width as needed */}
        </Link>

        {/* Toggle Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navbar Menu */}
        <div className={`flex-grow ${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:justify-center`}>
          <ul className={`flex gap-6 ${isMenuOpen ? 'flex-col' : 'flex-row'}`}>
            {userLogin ? (
              <>
                <li>
                  <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                      isActive ? "bg-green-500 text-white p-2 rounded" : "text-black p-2"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/Cart" 
                    className={({ isActive }) => 
                      isActive ? "bg-green-500 text-white p-2 rounded" : "text-black p-2"
                    }
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/WishList" 
                    className={({ isActive }) => 
                      isActive ? "bg-green-500 text-white p-2 rounded" : "text-black p-2"
                    }
                  >
                    WishList
                  </NavLink>
                </li>
                <li>
                  <NavLink 
                    to="/Categories" 
                    className={({ isActive }) => 
                      isActive ? "bg-green-500 text-white p-2 rounded" : "text-black p-2"
                    }
                  >
                    Categories
                  </NavLink>
                </li>
              </>
            ) : (
              <div className='flex flex-col md:flex-row gap-6'>
                <li><Link to="/Login" className="text-sm">Login</Link></li>
                <li><Link to="/Register" className="text-sm">Register</Link></li>
              </div>
            )}
          </ul>
        </div>

        <div className='flex items-center space-x-6 rtl:space-x-reverse'>
          <div className='icons flex gap-5'>
            <FontAwesomeIcon className='text-blue-800 text-2xl' icon={faFacebook} />
            <FontAwesomeIcon className='text-blue-600 text-2xl' icon={faFacebookMessenger} />
            <FontAwesomeIcon className='text-red-600 text-2xl' icon={faYoutube} />
          </div>
          {userLogin && <Link onClick={signout} className="text-sm p-2 rounded bg-blue-300">Sign Out</Link>}
        </div>
      </div>
    </nav>
  );
}
