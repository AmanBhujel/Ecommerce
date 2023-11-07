'use client'
import React, { createContext, useContext, useState } from 'react';

// Create a new context
const ImageContext = createContext();

// Create a custom hook to access the context
export const useImageContext = () => {
    return useContext(ImageContext);
};

// Create a provider component to wrap your application
export const ImageProvider = ({ children }) => {
    const [image, setImage] = useState('');
    const[addImage,setAddImage]=useState(false)


    return (
        <ImageContext.Provider value={{ image, setImage,addImage,setAddImage,}}>
            {children}
        </ImageContext.Provider>
    );
};
