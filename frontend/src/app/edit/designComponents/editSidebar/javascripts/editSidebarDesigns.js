'use client'
import { useImageContext } from '@/app/edit/designComponents/ContextEditing/ImageContext';
import React, { useState } from 'react'
import '../styles/editSidebarDesigns.css'
const EditSidebarDesigns = () => {
  const [images, setImages] = useState([]);
  const {setImage,setAddImage } = useImageContext();

  const designs = [
    {
      name: "One Piece",
      imagePath: "/designs1.png",
    },
    {
      name: "Zoro",
      imagePath: "/designs2.png",
    },
    {
      name: "Chopper",
      imagePath: "/designs3.png",
    },
  ];
  // Function to handle image selection
  const handleImageSelect = (e) => {
    const selectedImages = e.target.files;
    if (selectedImages.length > 0) {
      const imageUrls = Array.from(selectedImages).map((image) =>
        URL.createObjectURL(image)
      );
      setImages((prevImages) => [...prevImages, ...imageUrls]);
    }
  };

  //adding image in canvas
  const addImageInCanvas=(imageURL)=>{
    setImage(imageURL);
    setAddImage(true);
  }
  
  return (
    <>
  <section className='designImagesGrid'>
        {designs.map((design, index) => (
          <div key={index} className='DesignImageContainer'>
            <div className='DesignImageWrapper'>
              <img src={design.imagePath} alt={`Image ${index}`} />
              <div className='DesignButtonOverlay'>
                <button onClick={()=>addImageInCanvas(design.imagePath)}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default EditSidebarDesigns