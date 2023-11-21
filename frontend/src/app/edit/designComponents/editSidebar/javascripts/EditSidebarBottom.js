'use client'
import React, { useState, useRef, useEffect } from 'react';
import '../styles/editSidebarBottom.css';
import { PiMagicWandBold, PiTShirt, PiTextTBold } from 'react-icons/pi';
import { FiLayers, FiUpload } from 'react-icons/fi';
import EditSidebarLayers from './editSidebarLayers';
import EditSidebarDesigns from './editSidebarDesigns';
import EditSidebarUpload from './editSidebarUpload';
import EditSidebarText from './editSidebarText';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaWindowClose } from "react-icons/fa";

const EditSidebarBottom = () => {
  const [activeButton, setActiveButton] = useState('');
  const [showContent, setShowContent] = useState(false);
  const contentsRef = useRef(null);

  const toggleActiveButton = (buttonName) => {
  if (activeButton === buttonName) {
    setActiveButton('');
  } else {
    setShowContent(true)
    setActiveButton(buttonName);
  }
};
const closeContent = () => {
  setShowContent(false);
  setActiveButton('');
};

const sidebarButtons = [
  {
    icon: <FiLayers />,
    name: 'Layers'
  },
  {
    icon: <FiUpload />,
    name: 'Uploads'
  },
  {
    icon: <PiTextTBold />,
    name: 'Text'
  },
  {
    icon: <PiMagicWandBold />,
    name: 'Designs'
  },
  {
    icon: <AiOutlineShoppingCart />,
    name: 'Cart'
  },
];

const renderContent = () => {
  if (activeButton) {
    switch (activeButton) {
      case 'Layers':
        return <EditSidebarLayers />;
      case 'Uploads':
        return <EditSidebarUpload />;
      case 'Text':
        return <EditSidebarText />;
      case 'Designs':
        return <EditSidebarDesigns />;
      case 'Cart':
        return <p>cart</p>;
      default:
        return;
    }
  }
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      contentsRef.current &&
      !contentsRef.current.contains(event.target)
    ) {
      setShowContent(false);
      setActiveButton('')
    }
  };

  // Listen for clicks on the document body
  document.addEventListener('mousedown', handleClickOutside);

  return () => {
    // Clean up the event listener when the component unmounts
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);


return (
  <section className='editSidebarBottomSection'>
    {activeButton && showContent ? (
      // Assign the ref to the contents div
      <div ref={contentsRef} className='editSidebarBottomSectionContents'>
        <div className='editSidebarBottomSectionClose'>
        <button className='editSidebarBottomSectionContentsCloseButton' onClick={closeContent}><FaWindowClose/></button>
        </div>
        {renderContent()}
      </div>
    ) : (
      ''
    )}
    <div className={`editSidebarBottomSectionButtons`}>
      {sidebarButtons.map((button, index) => (
        <div
          className={`editSidebarBottomSectionButton ${activeButton === button.name ? 'active' : ''}`}
          key={index}
          onClick={() => toggleActiveButton(button.name)}
        >
          <i>{button.icon} </i>
          <p>{button.name}</p>
        </div>
      ))}
    </div>
  </section>
);
};

export default EditSidebarBottom;
