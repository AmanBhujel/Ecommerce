'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import '../styles/CheckoutNavbar.css'

const CheckoutNavbar = () => {
    const router = useRouter();
    return (
        <>
            <nav className='checkoutNavbar'>
                <h1 onClick={() => router.push("/")} >NEPHARA</h1>
            </nav>
        </>
    )
}

export default CheckoutNavbar;