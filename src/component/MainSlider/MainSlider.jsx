import React from 'react'
import style from "./MainSlider.module.css"
import slide1 from "../../assets/slider-image-1.jpeg"
import slide2 from "../../assets/slider-image-2.jpeg"
import slide3 from "../../assets/slider-image-3.jpeg"
import slide4 from "../../assets/grocery-banner.png"
import slide5 from "../../assets/grocery-banner-2.jpeg"
import Slider from "react-slick";

export default function MainSlider() {



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };



  return   <>
      <div className="row">
        <div className='w-3/4'>
        <Slider {...settings}>
        <img src={slide3} className='w-full h-[600px]' alt="" />
        <img src={slide4} className='w-full h-[600px]' alt="" />
        <img src={slide5} className='w-full h-[600px]' alt="" />
        </Slider>
        </div>
        <div className='w-1/4'>
        <img src={slide2} className='w-full h-[300px]' alt="" />
        <img src={slide1} className='w-full h-[300px]' alt="" />
        </div>
      </div>
      

      
    </>
  
}