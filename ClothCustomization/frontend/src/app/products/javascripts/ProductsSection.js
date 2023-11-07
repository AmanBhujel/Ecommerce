import React from 'react';
import '../styles/ProductsSection.css';
import ProductsSectionProductCard from './ProductsSectionProductCard';

const ProductsSection = ({selectedFilter}) => {
  return (
    <>
      <section className='productsSection'>
        <p className='productsSectionHeading'>Shop Our Best Picks </p>
        <div className='productsSectionProducts'>
          <ProductsSectionProductCard />
        </div>
      </section>
    </>
  )
}

export default ProductsSection;