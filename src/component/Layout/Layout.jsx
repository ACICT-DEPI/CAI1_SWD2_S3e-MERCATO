import React from 'react'
import style from "./Layout.module.css"

import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
  return  <>
  <Navbar />


   <div className='container mx-auto py-16'>
    <Outlet />
   </div>
     
  {/* <Footer /> */}
   
    </>
  
}
