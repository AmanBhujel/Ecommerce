'use client'
import React, { useEffect, useState } from 'react';
import '../styles/AccountSidebar.css';
import { useAccountContext } from '../contexts/AccountSidebarContexts';
import { HiBars4 } from 'react-icons/hi2';
import { AiFillCloseSquare } from 'react-icons/ai';

const AccountSidebar = () => {
  const { isLogoutModalOpen, setLogoutModalOpen, selectedButton, setSelectedButton } = useAccountContext();
  const [deviceWidth, setDeviceWidth] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleButtonClick = (buttonName) => {
    if (buttonName === 'Log Out') {
      setLogoutModalOpen(true);
      setSelectedButton(buttonName);
    }
    setSelectedButton(buttonName);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };
  const handleResize = () => {
    const newWidth = window.innerWidth;
    setDeviceWidth(newWidth);
  };

  useEffect(() => {

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttons = [
    { name: 'Profile' },
    // { name: 'Purchase History' },
    { name: 'Log Out' },
  ];

  return (
    <>
      {deviceWidth > 800 && (
        <aside className='accountSidebar'>
              <p className='accountSidebarHeading'>Hey! <br />Hope you have a nice day.</p>
          <div className='accountSidebarButtons'>
            <ul>
              {buttons.map((button, index) => (
                <li
                  key={index}
                  onClick={() => handleButtonClick(button.name)}
                  className={selectedButton === button.name ? 'selected' : ''}
                >
                  {button.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
      {!showSidebar && deviceWidth < 800 ? (
        <button onClick={handleSidebarToggle} className='sidebarButtonForSmallScreen'> <HiBars4 /></button>) : ''}

      {
        showSidebar && deviceWidth < 800 ? (
          <>
            <aside className='accountSidebar'>
              <button className='accountSidebarCloseButton' onClick={handleSidebarToggle}>
                <AiFillCloseSquare />
              </button>
              <p className='accountSidebarHeading'>Hey! <br />Hope you have a nice day.</p>
              <div className='accountSidebarButtons'>
                <ul>
                  {buttons.map((button, index) => (
                    <li
                      key={index}
                      onClick={() => handleButtonClick(button.name)}
                      className={selectedButton === button.name ? 'selected' : ''}
                    >
                      {button.name}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </>

        ) :
          ''
      }
    </>
  );
}

export default AccountSidebar;
