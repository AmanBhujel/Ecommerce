'use client'
import React, { useState } from 'react';
import '../styles/AccountPageContents.css'
import { useAccountContext } from '../contexts/AccountSidebarContexts';
import ProfileComponent from './ProfileComponent';
import PurchaseHistoryComponent from './PurchaseHistoryComponent';
import LogoutModal from './LogOutModal';
const AccountPageContents = () => {

    const { isLogoutModalOpen, setLogoutModalOpen,selectedButton, setSelectedButton } = useAccountContext();
    let contentToRender;


    switch (selectedButton) {
        case 'Profile':
            contentToRender = <ProfileComponent />;
            break;
        case 'Purchase History':
            contentToRender = <PurchaseHistoryComponent />;
            break;
      
        default:
            contentToRender = <ProfileComponent />;
    }

    return (
        <main className='accountPageContents'>

            {contentToRender}
            {selectedButton === 'Log Out' && (
                <LogoutModal
                    isOpen={isLogoutModalOpen}
                    onClose={() => {
                        setLogoutModalOpen(false)
                        setSelectedButton('Profile')
                    }}
                />
            )}
        </main>
    );
}


export default AccountPageContents;