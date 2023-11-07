'use client'
import React, { useEffect } from 'react'
import ProductsNavbar from '../products/javascripts/ProductsNavbar';
import AccountSidebar from './components/javascripts/AccountSidebar';
import AccountPageContents from './components/javascripts/AccountPageContents';
import { checkAuthorization } from '@/component/javascripts/CheckAuthorization';
import { useRouter } from 'next/navigation';
// import './components/styles/AccountPage.css';

const MyAccount = () => {
  const router = useRouter();

    const checkAuth=async()=>{
      const isAuthorized = await checkAuthorization(); 
      if (!isAuthorized) {
        router.push('/auth');
      }
    }
  useEffect( () => { 
    checkAuth();
  }, []); 

  return (
    <>
      <div style={{ overflow: 'hidden' }}>
        <ProductsNavbar />
        <main
          style={{
            display: 'flex',
            width: '100%',
            height: '45.5rem',
          }}>
          <AccountSidebar />
          <AccountPageContents />
        </main>
      </div>
    </>
  )
}

export default MyAccount;