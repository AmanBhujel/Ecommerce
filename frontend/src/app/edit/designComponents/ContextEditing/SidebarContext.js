'use client'
import React, { createContext, useContext, useState } from 'react';

// Create a new context
const SidebarContext = createContext();

// Create a custom hook to access the context
export const useSidebarContext = () => {
    return useContext(SidebarContext);
};

// Create a provider component to wrap your application
export const SidebarContextProvider = ({ children }) => {
    const [openSidebarBottomComponent,setOpenSidebarBottomComponent]=useState(false);
    return (
        <SidebarContext.Provider value={{ openSidebarBottomComponent,setOpenSidebarBottomComponent}}>
            {children}
        </SidebarContext.Provider>
    );
};
