import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import Slider from "react-slick";
import style from "./CategoriesSlider.module.css"; 




export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
  };

  function getCategories() {
    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className={style.sliderItem}> 
            <img
              src={category.image}
              className='w-full h-[200px] object-contain'
              alt={category.name}
            />
            <h4 className="text-center">{category.name}</h4> 
          </div>
        ))}
      </Slider>
    </>
  );
}
