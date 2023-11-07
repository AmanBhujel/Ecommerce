'use client'
import React, { createContext, useContext, useState } from 'react';

// Create a new context
const CanvasContext = createContext();

// Create a custom hook to access the context
export const useCanvasContext = () => {
    return useContext(CanvasContext);
};

// Create a provider component to wrap your application
export const CanvasProvider = ({ children }) => {
    const [showGrid,setShowGrid]=useState(true);
    const [objectsInCanvas,setObjectsInCanvas]=useState([])
    return (
        <CanvasContext.Provider value={{ showGrid,setShowGrid,objectsInCanvas,setObjectsInCanvas,}}>
            {children}
        </CanvasContext.Provider>
    );
};
