'use client'
import React, { useEffect, useState } from 'react';
import '../styles/ProductsSectionProductCard.css';
import Link from 'next/link';
import axios from 'axios';
import { useFilterContext } from './FilterContext';

const ProductsSectionProductCard = () => {
  const [products, setProducts] = useState([]);
  const { selectedFilter, setSelectedFilter } = useFilterContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://backend-ecommerce-60yd.onrender.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on the selectedFilter
  const filteredProducts = products.filter((product) => {
    if (selectedFilter === 'all') {
      return true; // Show all products
    } else if (selectedFilter === 'designed') {
      return !product.designable; // Show products with designable false
    } else if (selectedFilter === 'designable') {
      return product.designable; // Show products with designable true
    }
  });

  return (
    <>
      {filteredProducts.map((product, index) => (
        <Link
          href={`/products/${product.id}`}
          key={product.id}
          style={{ textDecoration: 'none' }}
        >
          <div className='productsSectionProductCardContainer' key={index}>
            <img
              src={`data:image/png;base64,${product.images[0].data}`} // Assumes the images are in PNG format
              alt={product.name}
            />
            <div className='productsSectionProductCardContainerContents'>
              <article className='productsSectionProductCardContainerContentsTexts'>
                <h2>{product.name}</h2>
                <p className='productsSectionProductCardContainerContentsStock'>
                  In Stock({product.stock})
                </p>
                <ul className='productsSectionProductCardContainerContentsFeatures'>
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </article>
              <p className='productsSectionProductCardContainerContentsPrice'>
                {product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProductsSectionProductCard;
