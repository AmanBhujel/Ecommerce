'use client'
import React, { useState } from 'react';
import '../styles/editSidebarProduct.css';
import SizeChart from '@/component/javascripts/SizeChart';
const EditSidebarProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <section className='productSectionInSidebarContent'>
        <h3>
          Unisex Premium Hoodie | Cotton Heritage M2580
        </h3>
        <p className='productSectionInSidebarContentPrice'>Price: Rs 1850</p>
        <p className='productSectionInSidebarContentDescription'>
          Cloth Fabric:Cotton rich , Bhuwa naaaune <br />
        </p>
        <p className='productSectionInSidebarContentPrintingTechnique'>Printing Technique:<span>Digital </span></p>
        <div className='productSectionInSidebarContentSizeButtons'>
          <div className='productSectionInSidebarContentSizeButtonsTexts'>
            <p>Choose Size:</p>
            <p onClick={openModal} >See size chart</p>
          </div>
          <div className='productSectionInSidebarContentSizeButtonsButton'>
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
          </div>
        </div>
      </section>
      {
        isModalOpen ?
          <SizeChart openModal={openModal} closeModal={closeModal} isModalOpen={isModalOpen} />
          : ''
      }
    </>

  )
}

export default EditSidebarProduct;