'use client'
import React, { useEffect, useState } from 'react';
import ProductsNavbar from '../javascripts/ProductsNavbar';
import './ProductPage.css';
import SizeChart from '@/component/javascripts/SizeChart';
import PriceFormatter from '@/component/javascripts/PriceFormatter';
import Link from 'next/link';
import Loading from '@/component/javascripts/Loading';
import axios from 'axios';
import GetCookie from '@/component/javascripts/GetCookie';
import ToastMessage from '@/component/javascripts/ToastMessage';
import { useRouter } from 'next/navigation';

const ProductPage = ({ params }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const productId = params.product;
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [product, setProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${productId}`);
        setProduct(response.data);
        setImages(response.data.images);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run once on component mount

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  if (!product) {
    return <div>Product not found</div>;
  }


  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

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


  useEffect(() => {
    // Function to update window width when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <ProductsNavbar />
      {loading ?
        <Loading /> :
        <>
          {windowWidth > 900 ?
            <section className='productPage'>
              <div className='productPageImageSection'>
                {/* Display the selected image */}
                <img
                  src={`data:image/png;base64,${images[selectedImage].data}`} // Assumes the images are in PNG format

                  alt={`Image ${selectedImage}`}
                  style={{ width: '100%', maxWidth: '500px' }}
                />
                <div className='productPageSmallerImages'>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={`data:image/png;base64,${image.data}`} // Assumes the images are in PNG format

                      alt={`Image ${index}`}
                      style={{

                        border: index === selectedImage ? '2px solid gray' : 'none', // Highlight the selected image
                      }}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
              <div className='productPageContentSection'>
                <h2>{product.name}</h2>
                <p className='productPageContentSectionDescription'><span style={{ fontSize: '1rem', color: 'black' }}> Description:</span><br />{product.description}</p>
                <ul className='productPageContentSectionFeatures'>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className='productPageColorAndQuantity'>
                  {
                    product.colors ?
                      <div className='productPageContentSectionColors'>
                        <p>Available Colours:</p>
                        <div className='productPageContentSectionColorsContainer'>
                          {product.colors.map((color, index) => (
                            <div className='productPageContentSectionColorsColor'
                              key={index}
                              style={{ backgroundColor: color }}>
                            </div>
                          ))}
                        </div>
                      </div> : ''
                  }
                  <div className='productPageSectionQuantity'>
                    <label> Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      min={1}
                      max={10}
                      step={1}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className='productPageSectionSizes'>
                  <div className='productPageSectionSizesLabels'>
                    <p>Sizes</p>
                    <p onClick={openModal}>See size chart</p>
                  </div>
                  <div className='productPageSectionSizesButtons'>
                    {
                      ['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          className={`productPageSectionSizesButton ${selectedSize === size ? 'selected' : ''}`}
                          onClick={() => handleSizeClick(size)}
                        >
                          {size}
                        </button>))
                    }
                  </div>
                </div>
                <p className='productPageContentSectionPrice'>Price: Rs <PriceFormatter price={product.price} /></p>
                {
                  isModalOpen ?
                    <SizeChart openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} />
                    : ''
                }
                <div className='productPageContentSectionButtonContainer'>
                  {product.designable ?
                    <button className='productPageContentSectionButton' >
                      <Link href={`/edit/${product.id}`} style={{ textDecoration: 'none', color: 'white', width: '100%' }}>
                        Design Now
                      </Link>

                    </button>
                    :
                    <button className='productPageContentSectionButton' onClick={handleCart}> Add to cart </button>
                  }
                </div>
              </div>
            </section>
            :
            <section className='productPage'>
              <div className='productPageImageSection'>
                {/* Display the selected image */}
                <img
                  src={`data:image/png;base64,${images[selectedImage].data}`} // Assumes the images are in PNG format
                  alt={`Image ${selectedImage}`}
                  style={{ width: '100%', maxWidth: '500px' }} // Adjust the width as needed
                />
                <div className='productPageSmallerImages'>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={`data:image/png;base64,${image.data}`} // Assumes the images are in PNG format
                      alt={`Image ${index}`}
                      style={{

                        border: index === selectedImage ? '2px solid gray' : 'none', // Highlight the selected image
                      }}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
                </div>
              </div>
              <div className='productPageContentSection'>
                <h2>{product.name}</h2>
                <div className='productPageColorAndQuantity'>
                  {
                    product.colors ?
                      <div className='productPageContentSectionColors'>
                        <p>Available Colours:</p>
                        <div className='productPageContentSectionColorsContainer'>
                          {product.colors.map((color, index) => (
                            <div className='productPageContentSectionColorsColor'
                              key={index}
                              style={{ backgroundColor: color }}>
                            </div>
                          ))}
                        </div>
                      </div> : ''
                  }
                  <div className='productPageSectionQuantity'>
                    <label> Quantity:</label>
                    <input
                      type="number"
                      value={quantity}
                      min={1}
                      max={10}
                      step={1}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className='productPageSectionSizes'>
                  <div className='productPageSectionSizesLabels'>
                    <p>Sizes</p>
                    <p onClick={openModal}>(See size chart)</p>
                  </div>
                  <div className='productPageSectionSizesButtons'>
                    {
                      ['S', 'M', 'L', 'XL'].map((size, index) => (
                        <button
                          className={`productPageSectionSizesButton ${selectedSize === size ? 'selected' : ''}`}
                          onClick={() => handleSizeClick(size)}
                          key={index}
                        >
                          {size}
                        </button>))
                    }
                  </div>
                </div>
                <p className='productPageContentSectionPrice'>Price: Rs <PriceFormatter price={product.price} /></p>
                {
                  isModalOpen ?
                    <SizeChart openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} />
                    : ''
                }
                <p className='productPageContentSectionDescription'><span style={{ fontSize: '1rem', color: 'black' }}> Description:</span><br />{product.description}</p>
                <ul className='productPageContentSectionFeatures'>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className='productPageContentSectionButtonContainer'>
                  {product.designable ?

                    <button className='productPageContentSectionButton'>
                      <Link href={`/edit/${product.id}`} style={{ textDecoration: 'none', color: 'white', width: '100%' }}>
                        Design Now
                      </Link> </button>
                    :
                    <button className='productPageContentSectionButton' onClick={handleCart}> Add to cart </button>
                  }
                </div>
              </div>
            </section>
          }
        </>

      }

    </>
  );
}

export default ProductPage;
