import React from 'react'
import '../styles/ProductCard.css'
import { useRouter } from 'next/navigation';
import ToastMessage from '@/component/javascripts/ToastMessage';
import GetCookie from '@/component/javascripts/GetCookie';
import axios from 'axios';
const ProductCard = ({ id, name, stock, price, image }) => {
    const router = useRouter();
    const handleCart = async () => {
        try {
          const authorizationToken = GetCookie('authorization');
          if (authorizationToken) {
            const headers = {
              Authorization: `Bearer ${authorizationToken}`,
            };
            const response = await axios.post('http://localhost:5000/add-to-cart', {
              productId,
              quantity,
            }, { headers });
    
            if (response.status === 200 || response.status === 201) {
              ToastMessage('success', 'Added to cart.');
            }
          }
          else {
            ToastMessage('error', 'Log in required.')
            router.push('/auth')
          }
        } catch (error) {
          ToastMessage('error', 'Error occured while adding to cart.');
        }
      };

    const handleButtonCLick = (name) => {
        if (name === 'buy') {
            router.push(`products/${id}`)
        }
        else handleCart();
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength - 3) + '...';
        }
        return text;
    };
    const productName = name; // Replace this with your actual product name
    const truncatedProductName = truncateText(productName, 23);
    return (
        <>
            <section className='productCard' >
                <img
                    src={`data:image/png;base64,${image}`} // Assumes the images are in PNG format
                    alt='Tshirt' />
                <article className='productCardContent'>
                    <div className='productCardContentTop'>
                        <div className='productCardContentHeader'>
                            <h5>{truncatedProductName}</h5>
                            <p>In Stock({stock})</p>
                        </div>
                    </div>
                    <div className='productCardContentButtons'>
                        <button className='productCardContentButtonDesign' onClick={(e)=>handleButtonCLick('buy')}>Buy now</button>
                        <button className='productCardContentButtonSize' onClick={(e)=>handleButtonCLick('add')}>Add to Cart</button>
                    </div>
                </article>
            </section>
        </>
    )
}

export default ProductCard