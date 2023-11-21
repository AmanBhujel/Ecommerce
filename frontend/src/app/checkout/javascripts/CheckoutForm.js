'use client'
import { useState } from "react";
import { BiLock } from "react-icons/bi";
import '../styles/CheckoutForm.css';
import axios from "axios";
import GetCookie from "@/component/javascripts/GetCookie";
import { useCartIdContext } from "@/app/cart/CartIdContext";
import ToastMessage from "@/component/javascripts/ToastMessage";
import { useRouter } from "next/navigation";

const CheckoutForm = () => {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('nepal');
    const { cartIds } = useCartIdContext();
    const router = useRouter();

    console.log('cartIds', cartIds)

    const handleOrder = async () => {
        const cart_ids = cartIds.join(',');

        // Create the order data to send to the server
        const orderData = {
            name: fullname,
            phone,
            address,
            city,
            email,
            cart_ids,
        };
        const authorizationToken = GetCookie('authorization');
        const headers = {
            Authorization: `Bearer ${authorizationToken}`,
        };

        // Make a POST request to create the order
        await axios.post('http://localhost:5000/order', orderData, { headers })
            .then((response) => {
                console.log('Order created:', response.data);
                ToastMessage('success', 'Ordered Successfully.')
                router.replace('/products');
            })
            .catch((error) => {
                console.error('Error while creating order:', error);
                ToastMessage('error', 'Error occured while ordering.');
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'fullname':
                setFullname(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'city':
                setCity(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'country':
                setCountry(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <main>
                <section className="checkoutFormHeading">
                    <i>
                        <BiLock />
                    </i>
                    <p>Secure Checkout</p>
                </section>
                <form className="checkoutForm">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fullname">Full Name:</label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Full Name"
                            value={fullname}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={address}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={city}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={phone}
                            onChange={handleInputChange}
                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Select a Country:</label>
                        <select
                            id="country"
                            name="country"
                            value={country}
                            onChange={handleInputChange}
                        >
                            <option value="nepal">Nepal</option>
                        </select>
                    </div>
                </form>
                <section className="checkOutPageBottom">
                    {/* <div className='CheckOutAmount'>
                        <div className='CheckOutDiv'>
                            <p > Subtotal: </p>
                            <p>Rs <PriceFormatter price={20000} /> </p>
                        </div>
                        <div className='CheckOutDiv'>
                            <p> Delivery:</p>
                            <p> Rs 0 </p>
                        </div>
                        <div className='CheckOutDiv'>
                            <p > Order Total:</p>
                            <p> Rs <PriceFormatter price={5000} /></p>
                        </div> */}
                    <button onClick={handleOrder} className="checkoutButton">Complete Checkout</button>
                    {/* </div> */}
                </section>
            </main>
        </>
    );
};

export default CheckoutForm;
