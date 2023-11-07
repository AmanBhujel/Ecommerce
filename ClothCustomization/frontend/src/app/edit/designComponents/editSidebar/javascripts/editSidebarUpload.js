import React, { useState } from 'react';
import '../styles/editSidebarUpload.css';
import { useImageContext } from '../../ContextEditing/ImageContext';

const EditSidebarUpload = () => {
  const [images, setImages] = useState([]);
  const {setImage,setAddImage } = useImageContext();

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
      <section className='uploadImageSection'>
        <p>Upload Images</p>
        <img src='/uploadImage.svg' alt='Upload' />
        <label htmlFor="fileInput" className="custom-file-upload">
          Upload Image
        </label>
        <input
          type="file"
          id="fileInput"
          accept=".jpg, .png"
          style={{ display: 'none' }}
          multiple
          onChange={handleImageSelect} 
        />
      </section>
      <section className='uploadedImagesGrid'>
        {images.map((imageUrl, index) => (
          <div key={index} className='imageContainer'>
            <div className='imageWrapper'>
              <img src={imageUrl} alt={`Image ${index}`} />
              <div className='buttonOverlay'>
                <button onClick={()=>addImageInCanvas(imageUrl)}>Add</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default EditSidebarUpload;

