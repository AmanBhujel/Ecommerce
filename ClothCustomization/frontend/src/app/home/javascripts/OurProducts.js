'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../styles/OurProducts.css';
import Link from 'next/link';
import Loading from '@/component/javascripts/Loading';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import axios from 'axios';


const OurProducts = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 700);
        };
        handleResize();
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/products`);
                setProducts(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {isLoading ?
                <Loading />
                :
                <section className='ourProductsSection'>
                    <h6>TRENDING NOW</h6>
                    <div className='ourProductsSectionProductCards'>
                        {isMobile ?
                            (<div className='ourProductsSectionProductCardContainer' >
                                <Swiper
                                    effect={"coverflow"}
                                    grabCursor={true}
                                    centeredSlides={true}
                                    slidesPerView={4}
                                    coverflowEffect={{
                                        rotate: 50,
                                        stretch: 0,
                                        depth: 100,
                                        modifier: 1,
                                        slideShadows: false,
                                    }}
                                    pagination={true}
                                    className="mySwiper"
                                >
                                    {products.slice(0, 4).map((item, index) => (
                                        <SwiperSlide key={index}>

                                            <ProductCard
                                                key={index} id={item.id} name={item.name} stock={item.stock} price={item.price} image={item.images[0].data}
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper> </div>) :
                            (
                                <>
                                    {
                                        products.slice(0, 4).map((item, index) => (
                                            <ProductCard key={index} id={item.id} name={item.name} stock={item.stock} price={item.price} image={item.images[0].data}
                                            />
                                        ))
                                    }
                                </>)
                        }
                    </div>
                    <Link href="/products" style={{ textDecoration: 'none' }}>
                        <button className='ourProductsSectionButton'>
                            See More
                        </button>
                    </Link>
                </section>
            }
        </>
    )
};

export default OurProducts;