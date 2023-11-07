'use client'
import React from 'react';
import '../styles/LogOutModal.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import ToastMessage from '@/component/javascripts/ToastMessage';

const LogoutModal = ({ isOpen, onClose }) => {
    const router = useRouter();
    const handleLogout = () => {
        const cookieName = 'authorization';
        const cookiePath = '/';
        const domain = window.location.hostname;
        const existingCookie = document.cookie
            .split(';')
            .map((c) => c.trim())
            .find((cookie) => cookie.startsWith(`${cookieName}=`));

        if (existingCookie) {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${cookiePath}; domain=${domain};`;
            ToastMessage('success', 'Logged out successfully');
            onClose();
            router.replace('/products');
        } else {
            ToastMessage('error', 'No user to log out');
            onClose();
        }
    };

    return (
        <div className={`logOutModal ${isOpen ? 'open' : ''}`}>
            <div className="logOutModalContent">
                <button onClick={onClose} className='logOutModalContentCloseButton'><AiOutlineCloseCircle /></button>

                <p style={{ marginTop: '2rem' }}> Do you want to log out?</p>
                <div className="logOutButtonContainer">
                    <button onClick={handleLogout}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
