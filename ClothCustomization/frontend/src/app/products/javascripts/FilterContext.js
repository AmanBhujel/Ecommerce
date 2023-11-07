'use client'
import React, { createContext, useContext, useState } from 'react';

const filterProductContext = createContext();

export const useFilterContext = () => {
    return useContext(filterProductContext);
}

export const FilterContextProvider = ({ children }) => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    return (
        <filterProductContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            {children}
        </filterProductContext.Provider>
    );
};