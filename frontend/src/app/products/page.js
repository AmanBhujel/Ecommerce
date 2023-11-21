'use client'
import React, { useState } from 'react';
import ProductsNavbar from './javascripts/ProductsNavbar';
import FilterSidebar from './javascripts/FilterSidebar';
import Footer from '@/component/javascripts/Footer';
import ProductsSection from './javascripts/ProductsSection';
import './styles/Products.css'
const Products = () => {
  return (
    <>
      <ProductsNavbar />
      <div className='products-container' >
        <FilterSidebar />
        <ProductsSection  />
      </div>
      <Footer />

    </>
  );
};

export default Products;
