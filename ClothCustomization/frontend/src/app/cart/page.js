'use client'
import React, { useEffect, useState } from 'react';
import './styles/Cart.css'
import { AiOutlineDelete } from 'react-icons/ai';
import PriceFormatter from '@/component/javascripts/PriceFormatter';
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import GetCookie from '@/component/javascripts/GetCookie';
import ToastMessage from '@/component/javascripts/ToastMessage';
import { useRouter } from 'next/navigation';
import { useCartIdContext } from './CartIdContext';

// const products = [
//     {
//         id: 34,
//         name: 'Mens Fashion Hoodie',
//         stock: 8,
//         description: `The cotton premium hoodie is a must-have addition to your wardrobe. Crafted from top-quality, soft cotton fabric, it provides unparalleled comfort that you'll love wearing all day. With its classic design, complete with a front kangaroo pocket and a snug hood, it's not only cozy but also stylish.`,
//         features: [
//             'Comfortable and Cozy',
//             'Versatile Style',
//             'New Teens Fashion',
//         ],
//         price: 2850,
//         images: ['/editHoodie.png'],
//         designable: true,
//         colors: ['Red', 'Blue', 'Black'],
//         sizes: ['S', 'M', 'L', 'XL'],
//         fabric: ['Cotton', 'Wool Lining'],
//         quantity: 1, // Add the "quantity" field here
//     },
//     {
//         id: 39,
//         name: `Luffy Hoodie`,
//         stock: 10,
//         description: `The cotton premium hoodie is a must-have addition to your wardrobe. Crafted from top-quality, soft cotton fabric, it provides unparalleled comfort that you'll love wearing all day. With its classic design, complete with a front kangaroo pocket and a snug hood, it's not only cozy but also stylish.`,
//         features: [
//             'Soft and Warm Material',
//             'Classic Design',
//             'Available in Multiple Colors',
//         ],
//         price: 3200,
//         images: ['/luffyHoodie.png'],
//         designable: false,
//         colors: ['Black', 'Gray', 'White'],
//         sizes: ['S', 'M', 'L', 'XL'],
//         fabric: ['Cotton', 'Polyester Blend'],
//         quantity: 9, // Add the "quantity" field here
//     },
//     {
//         id: 84,
//         name: 'Akatsuki Itachi Hoodie',
//         stock: 6,
//         description: `The cotton premium hoodie is a must-have addition to your wardrobe. Crafted from top-quality, soft cotton fabric, it provides unparalleled comfort that you'll love wearing all day. With its classic design, complete with a front kangaroo pocket and a snug hood, it's not only cozy but also stylish.`,
//         features: [
//             'Premium Quality Fabric',
//             'Modern Fit',
//             'Ideal for All Seasons',
//         ],
//         price: 2700,
//         images: ['/akatsukiHoodie.png', '/itachiHoodie.png'],
//         designable: false,
//         colors: ['black'],
//         sizes: ['S', 'M', 'L', 'XL'],
//         fabric: ['Cotton', 'Polyester Blend'],
//         quantity: 2, // Add the "quantity" field here
//     },
//     {
//         id: 384,
//         name: 'Onepiece Trio Hoodie(ASL)',
//         stock: 15,
//         description: `The cotton premium hoodie is a must-have addition to your wardrobe. Crafted from top-quality, soft cotton fabric, it provides unparalleled comfort that you'll love wearing all day. With its classic design, complete with a front kangaroo pocket and a snug hood, it's not only cozy but also stylish.`,
//         features: [
//             'Cute and Adorable Design',
//             'Durable Fabric',
//             'Perfect for Playtime',
//         ],
//         price: 2200,
//         images: ['/luffyAceSaboHoodie.png'],
//         designable: false,
//         colors: ['Black'],
//         sizes: ['S', 'M', 'L', 'XL'],
//         fabric: ['Cotton', 'Polyester Blend'],
//         quantity: 4, // Add the "quantity" field here
//     },
// ];


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();
    const { cartIds } = useCartIdContext();

    // const total = cartItems.reduce((acc, item) => {
    //     return acc + item.price * item.quantity;
    // }, 0);


    const fetchCartItems = async () => {
        try {
            const authorizationToken = GetCookie('authorization');
            const headers = {
                Authorization: `Bearer ${authorizationToken}`,
            };
            console.log('authtoken', authorizationToken)
            const response = await axios.get('http://localhost:5000/get-cart-items', {
                headers
            });
            setCartItems(response.data);
            calculateTotal(response.data);
            console.log(response)
            const items = response.data;

            items.map((item) => {
                cartIds.push(item.cart_id)
            })
            console.log(cartIds)
        } catch (error) {
            console.error('Error fetching cart items:', error);
            ToastMessage("error", "Sign in required!");
            router.replace('/auth');
        }
    }
    const calculateTotal = (items) => {
        const totalPrice = items.reduce((acc, item) => {
            return acc + item.product_price * item.quantity;
        }, 0);
        setTotal(totalPrice);
    };

    // Delete cart item
    const handleDeleteItem = async (productId) => {
        try {
            const authorizationToken = GetCookie('authorization');
            const config = {
                headers: {
                    Authorization: `Bearer ${authorizationToken}`,
                },
            };
            const response = await axios.delete(`http://localhost:5000/delete-cart-items?productId=${productId}`, config);
            ToastMessage('success', response.data.message);
            fetchCartItems();
        } catch (error) {
            ToastMessage('error', 'Error occurred.');
        }
    };


    //updating cart items like quantity
    const updateCartItems = async (productId, quantity) => {
        try {
            const authorizationToken = GetCookie('authorization');
            const headers = {
                Authorization: `Bearer ${authorizationToken}`,
            };
            console.log(productId)
            const response = await axios.put('http://localhost:5000/update-cart-item', {
                productId,
                quantity,
            }, { headers });

            if (response.status === 200) {
                console.log(response.data.message);
                fetchCartItems();
            }
        } catch (error) {
            console.error('Error updating items:', error);
        }
    };
    const handleCheckout = () => {
        if (cartItems.length > 0) {
            router.push('/checkout')
        }
    };

    const increaseQuantity = (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.product_id === itemId && item.quantity < 10) {
                console.log(item)
                updateCartItems(item.product_id, item.quantity + 1);
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };
    const decreaseQuantity = (itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.product_id === itemId && item.quantity > 1) {
                console.log(item)
                updateCartItems(item.product_id, item.quantity - 1);
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    // Function to handle the back button click
    const handleBackButtonClick = () => {
        window.history.back();
    };

    const buttonStyles = {
        cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer', // Change cursor style based on condition
      };
    useEffect(() => {
        fetchCartItems();
    }, [])

    return (
        <>
            <section className='cartSection'>
                <div className='cartProducts'>
                    <div className='cartProductsTop'>
                        <button className='cartProductsBackButton' onClick={handleBackButtonClick}>
                            <BiArrowBack />
                        </button>
                        <p className='cartProductsTopHeader'>YOUR CART</p>
                    </div>
                    <div className='cartProductsBody'>
                        <div className='cartHeader' style={{ borderBottom: '1px solid black' }}>
                            <div className='cartHeaderText'>PRODUCT</div>
                            <div className='cartHeaderText'>PRICE</div>
                            <div className='cartHeaderText'>QUANTITY</div>
                            <div className='cartHeaderText'>SUBTOTAL</div>
                            <div className='cartHeaderText'>REMOVE</div>
                        </div>
                        {cartItems.length === 0 ?
                            <div style={{ marginTop: '2rem' }}>
                                No Products in Cart.
                            </div>
                            :
                            cartItems.map((item, index) => (
                                <div className='cartProductRow' key={index}>
                                    <div className='cartProductImage'>
                                        <img
                                            src={`data:image/png;base64,${item.product_image_data}`} // Assumes the images are in PNG format
                                            alt='Product'
                                        />
                                        <p className='cartProductName'> {item.product_name} </p>
                                        {/* <p className='cartProductColor'>Color: Black + Size: M</p> */}
                                    </div>
                                    <div className='cartPrice'>Rs <PriceFormatter price={item.product_price} /></div>
                                    <div className='cartProductQuantity'>
                                        <button onClick={() => decreaseQuantity(item.product_id)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => increaseQuantity(item.product_id)}>+</button>
                                    </div>
                                    <div className='cartSubTotal'>Rs <PriceFormatter price={item.quantity * item.product_price} /></div>
                                    <div className='cartDeleteButton' onClick={() => handleDeleteItem(item.product_id)}><AiOutlineDelete /></div>
                                </div>
                            ))}
                    </div>
                </div>

                <div className='cartCheckout'>
                    <p className='cartCheckOutHeading'>NEPHARA</p>
                    <div className='cartCheckOutAmount'>
                        <div className='cartCheckoutSubTotal'>
                            <p > Subtotal: </p>
                            <p>Rs <PriceFormatter price={total} /> </p>
                        </div>
                        <div className='cartCheckoutDeliveryFee'>
                            <p> Delivery:</p>
                            <p> Rs 0 </p>
                        </div>
                        <div className='cartCheckoutTotal'>
                            <p > Order Total:</p>
                            <p> Rs <PriceFormatter price={total} /></p>
                        </div>
                    </div>
                    <p className='cartCheckoutTax'>Taxes are already included.</p>
                    <div className='cartCheckoutButtonSection'>
                        <button 
                        className='cartCheckoutButton' 
                        onClick={handleCheckout} 
                        style={buttonStyles}
                        >Checkout</button>
                    </div>
                </div>
            </section>
        </>
    );
}




export default Cart;