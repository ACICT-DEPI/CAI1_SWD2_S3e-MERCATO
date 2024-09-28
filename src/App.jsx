import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Home from './component/Home/Home';
import Cart from './component/Cart/Cart';
import Categories from './component/Categories/Categories';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Products from './component/Products/Products';
import Notfound from './component/Notfound/Notfound';
import Brands from './component/Brands/Brands';
import UserContextProvider from './Context/UserContext';
import ProductDetails from './component/ProductDetails/ProductDetails';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';  
import CartContextProvider from './Context/CartContext';
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './component/Checkout/Checkout';
import AllOrders from './component/AllOrders/AllOrders';
import Wishlist from './component/WishList/WishList'; 
import WishlistContextProvider from './Context/WishListContext.jsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>  
          <RouterProvider router={router} />
          <Toaster />
        </WishlistContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;
