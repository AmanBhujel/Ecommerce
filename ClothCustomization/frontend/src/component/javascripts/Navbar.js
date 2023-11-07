'use client'
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { HiBars4 } from "react-icons/hi2";
import '../styles/Navbar.css';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hideNavbar, setHideNavbar] = useState(false);
    const [prevScrollY, setPrevScrollY] = useState(0);
    const navRef = useRef();
    const router = useRouter();
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > prevScrollY) {
                setHideNavbar(true);
                setIsSidebarOpen(false);
            } else {
                setHideNavbar(false);
            }
            setPrevScrollY(currentScrollY);
        };
        const mediaQuery = window.matchMedia("(max-width: 575px)");

        const handleDocumentClick = (event) => {
            if (isSidebarOpen && mediaQuery.matches && !navRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleDocumentClick);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [prevScrollY]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header className={`navbar ${hideNavbar ? 'hidden' : ''}`}>
                <h1 onClick={() => router.push("/")} style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>NEPHARA</h1>
                <nav className='navbarLinks'>
                    <ul>
                        <li onClick={() => router.push("/products")} style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>PRODUCTS</li>
                        <li onClick={() => router.push("/about")} style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>ABOUT US</li>
                        <li onClick={() => router.push("/account")} style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>MY ACCOUNT</li>
                        <li onClick={() => router.push("/contact-us")} style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>CONTACT US</li>
                    </ul>
                </nav>
                <div className='navbarRightSection'>
                    <i className='navbarCart'>
                        <AiOutlineShoppingCart onClick={() => router.push("/cart")} style={{ color: 'white', cursor: 'pointer' }} />
                    </i>
                    {
                        isSidebarOpen ?
                            <i className='navbarSidebarCross' onClick={toggleSidebar}>
                                <RxCross1 />
                            </i> :
                            <i className='navbarSidebarButton' onClick={toggleSidebar}>
                                <HiBars4 />
                            </i>
                    }
                </div>
            </header>
            {isSidebarOpen && (
                <div className='navbarSidebarNavigation' ref={navRef}>
                    <ul>
                        <li onClick={() => router.push("/products")} >PRODUCTS</li>
                        <li onClick={() => router.push("/about")} >ABOUT US</li>
                        <li onClick={() => router.push("/account")} >MY ACCOUNT</li>
                        <li onClick={() => router.push("/contact-us")} >CONTACT US</li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;
