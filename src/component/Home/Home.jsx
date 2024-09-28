import React from 'react';
import style from "./Home.module.css";
import RecentProduct from './../RecentProduct/RecentProduct';
import CategoriesSlider from './../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  return (
    <div className={style.homeContainer}>
      <MainSlider />
      <CategoriesSlider />
      <RecentProduct />
      
    </div>
  );
}
