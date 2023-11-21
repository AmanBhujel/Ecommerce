
'use client'
import React, {  createContext, useContext, useState } from 'react';

const CartIDContext = createContext();

export const useCartIdContext = () => {
    return useContext(CartIDContext);
}

export const CartIdContextProvider = ({children}) => {

    const [cartIds,setCartIds]=useState([]);

    return (
        <CartIDContext.Provider value={{cartIds,setCartIds}}>
            {children}
        </CartIDContext.Provider>
    );
};