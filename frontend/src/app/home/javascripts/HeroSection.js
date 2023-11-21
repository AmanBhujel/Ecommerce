'use client'
import React from 'react';
import '../styles/HeroSection.css';
import Link from 'next/link';


const HeroSection = () => {
    return (
        <>
            <main className='heroSectionContainer'>
                <div className='heroSectionContainerContents'>
                    <section className='heroSectionContent'>
                        <h2>Customize Your Perfect Clothes Online</h2>
                        <p>
                            Nephara offers a seamless online experience for desgining and printing personalized t-shirts.Stand out from the crowd with our high quality prints and endless customization options.
                        </p>
                        <section className='heroSectionButtons'>
                            <Link href="/products" style={{ textDecoration: 'none' }}>
                                <button className='heroSectionStartButton'>
                                    Start
                                </button>
                            </Link>
                            <Link href="/about" style={{ textDecoration: 'none' }}>
                                <button className='heroSectionLearnMoreButton'>Learn More</button>
                            </Link>
                        </section>
                    </section>
                    <section className='heroSectionImage'>
                        <img src='/kakashiHoodie-removebg.png' />
                    </section>
                </div>
            </main>
        </>
    )
}

export default HeroSection;