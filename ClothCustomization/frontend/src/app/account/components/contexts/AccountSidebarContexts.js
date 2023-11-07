'use client'
import React, { createContext, useContext, useState } from 'react';

const AccountContext = createContext();

export const useAccountContext = () => {
    return useContext(AccountContext);
}

export const AccountContextProvider = ({ children }) => {

    const [selectedButton, setSelectedButton] = useState('Profile');
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    return (
        <AccountContext.Provider value={{ isLogoutModalOpen, setLogoutModalOpen, selectedButton, setSelectedButton }}>
            {children}
        </AccountContext.Provider>
    );
};