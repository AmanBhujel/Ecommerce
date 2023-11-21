'use client'
import React, { useEffect, useState } from 'react';
import '../designComponents/editCanvas/styles/edit.css';
import { IoPricetagsOutline } from "react-icons/io5";
import { RxCross1 } from 'react-icons/rx';
import Loading from '@/component/javascripts/Loading';
import EditSidebar from '../designComponents/editSidebar/javascripts/EditSidebar';
import EditCanvas from '../designComponents/editCanvas/javascripts/editCanvas';
import EditSidebarBottom from '../designComponents/editSidebar/javascripts/EditSidebarBottom';
import axios from 'axios';

const Edit = ({ params }) => {
  const [screenWidth, setScreenWidth] = useState(null);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState();
  const productId = params.id;
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://backend-ecommerce-60yd.onrender.com/${productId}`);
        setProduct(response.data);
        setImages(response.data.images[0].data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false)
        return (<p>No product found</p>)
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);
  return (
    // <Loading />
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header className='headerOfEditPage'>
            <div className='headerOfEditPageProductName'>
              <h2>Trending Hoodie Cotton-Fabric</h2>
            </div>
            <div className='headerOfEditPageButtons'>
              <button>
                <i>
                  <RxCross1 />
                </i>
              </button>
            </div>
          </header>
          {screenWidth && screenWidth > 900 ? (
            <section className='bodyOfEditPage'>
              <EditSidebar />
              <EditCanvas images={images} />
            </section>
          ) : (
            <section className='bodyOfEditPageForSmallScreen'>
              <EditCanvas images={images} />
              <EditSidebarBottom />
            </section>
          )}
          {screenWidth && screenWidth > 900 ? (
            <footer className='footerOfEditPage'>
              <section className='footerOfEditPageContent'>
                <p>
                  <i>
                    <IoPricetagsOutline />
                  </i>
                  Rs {product?.price}
                </p>
                <button>Add to cart</button>
              </section>
            </footer>
          ) : null}
        </>
      )}
    </>
  );
}

export default Edit;