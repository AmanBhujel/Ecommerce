'use client'
import React, { useEffect } from 'react';
import AuthImage from './javascripts/AuthImage';
import SignUp from './javascripts/SignUp';
import { useRouter } from 'next/navigation';
import { checkAuthorization } from '@/component/javascripts/CheckAuthorization';

const AuthPage = () => {
    const router = useRouter();

    const checkAuth = async () => {
        const isAuthorized =await checkAuthorization();

        if (isAuthorized) {
            router.replace('/account');
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <div className='authPage'
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <SignUp />
                <AuthImage />
            </div>
        </>
    )
}

export default AuthPage;