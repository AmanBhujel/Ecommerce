import React from 'react'
import CheckoutNavbar from './javascripts/CheckoutNavbar'
import CheckoutForm from './javascripts/CheckoutForm'

const Checkout = () => {
    return (
        <>
            <CheckoutNavbar />
            <section style={{ display: 'flex', width: '100%', height: '44rem', justifyContent: 'center' }}>
                <CheckoutForm />
            </section>
        </>)
}

export default Checkout