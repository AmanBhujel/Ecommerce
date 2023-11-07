'use client'
import React, { useState } from 'react'
import { PiMagicWandBold, PiTShirt, PiTextTBold } from "react-icons/pi";
import { FiLayers, FiUpload } from "react-icons/fi";
import '../styles/EditSidebar.css';
import EditSidebarProduct from './editSidebarProduct';
import EditSidebarLayers from './editSidebarLayers';
import EditSidebarDesigns from './editSidebarDesigns';
import EditSidebarUploads from './editSidebarUpload';
import EditSidebarText from './editSidebarText';

const EditSidebar = () => {
    const [activeButton, setActiveButton] = useState('Product');

    const sidebarButtons = [
        {
            icon: <PiTShirt />,
            name: 'Product'
        },
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

    ]
    const renderContent = () => {
        switch (activeButton) {
            case 'Product':
                return <EditSidebarProduct />;

            case 'Layers':
                return <EditSidebarLayers />;
            case 'Uploads':
                return <EditSidebarUploads />;
            case 'Text':
                return <EditSidebarText />;
            case 'Designs':
                return <EditSidebarDesigns />;
            default:
                return <editSidebarProduct />;
        }
    };

    return (
        <>
            <section className='sidebarSectionInEditPage'>
                <div className='sidebarSectionInEditPageButtons'>
                    {sidebarButtons.map((button, index) => (
                        <div
                            className={`sidebarSectionInEditPageButton ${activeButton === button.name ? 'active' : ''
                                }`}
                            key={index}
                            onClick={() => setActiveButton(button.name)}
                        >   
                            <i>{button.icon} </i>
                            <p> {button.name} </p>
                        </div>
                    ))}
                </div>
                <div className='sidebarSectionInEditPageContents'>
                    {renderContent()}
                </div>
            </section>
        </>
    )
}

export default EditSidebar;