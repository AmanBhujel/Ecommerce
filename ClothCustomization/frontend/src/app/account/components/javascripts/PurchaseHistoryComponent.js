'use client'
import GetCookie from '@/component/javascripts/GetCookie';
import axios from 'axios';
import React, { useEffect } from 'react'

const PurchaseHistoryComponent = () => {

  const getOrders = async () => {
    const authorizationToken = GetCookie('authorization');
    const headers = {
      Authorization: `Bearer ${authorizationToken}`,
    };
    // Make a get request to get the order
    await axios.get('http://localhost:5000/get-order', { headers })
      .then((response) => {
        console.log('Order got:', response.data);
      })
      .catch((error) => {
        console.error('Error while creating order:', error);
      });
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bolder',
      fontSize: '2rem',
      height: '100%'
    }}>No Items Purhcased  yet.</div>
  )
}

export default PurchaseHistoryComponent;