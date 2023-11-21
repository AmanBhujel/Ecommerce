'use client'
import React, { useState, useEffect } from 'react';
import '../styles/ProfileComponent.css';
import axios from 'axios';
import GetCookie from '@/component/javascripts/GetCookie';
import Loading from '@/component/javascripts/Loading';
import ToastMessage from '@/component/javascripts/ToastMessage';

const ProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [laoding, setLoading] = useState(true);

  const fetchUserData = async () => {
    const authorizationToken = GetCookie('authorization');
    const headers = {
      Authorization: `Bearer ${authorizationToken}`,
    };
    axios.get('https://backend-ecommerce-60yd.onrender.com/getuser', { headers })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const userData = response.data[0];
          const { name, address, email, phone } = userData;
          setFullName(name);
          setAddress(address || '');
          setEmail(email || '');
          setPhone(phone || '');
        } else {
          console.error('Invalid API response:', response);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

  };
  useEffect(() => {
    fetchUserData();
    setLoading(false);
  }, []);


  const fields = [
    { label: 'Full name', stateKey: 'fullName' },
    { label: 'Phone number', stateKey: 'phone' },
    { label: 'Email', stateKey: 'email' },
    { label: 'Address', stateKey: 'address' },
  ];

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedData = {
      address,
      email,
      phone,
    };

    const authorizationToken = GetCookie('authorization');
    const headers = {
      Authorization: `Bearer ${authorizationToken}`,
    };

    axios.put('https://backend-ecommerce-60yd.onrender.com/update-user', updatedData, { headers })
      .then((response) => {
        if (response.status === 201) {
          ToastMessage('success', 'User profile updated successfully')
        } 
        // else {
        //   console.error('Invalid API response:', response);
        // }
      })
      .catch((error) => {
        ToastMessage('error', 'Error updating user profile')
      });
    setIsEditing(false);
  };

  const handleChange = (e, stateKey) => {
    const newValue = e.target.value;
    if (stateKey === 'fullName') {
      setFullName(newValue);
    } else if (stateKey === 'address') {
      setAddress(newValue);
    } else if (stateKey === 'email') {
      setEmail(newValue);
    } else if (stateKey === 'phone') {
      setPhone(newValue);
    }
  };

  return (
    laoding ? (
      <Loading />
    ) : (
      <section className='profileComponentContainer'>
        <p className='profileComponentContainerHeading'>Your Details</p>
        <img src='/defaultUserAvatar.png' alt='profile' />
        <p className='profileComponentContainerHeadingName'>{fullName} </p>
        <form className='profileComponentContainerForm'>
          <div className='profileFormGrid'>
            {fields.map((field) => (
              <div key={field.label}>
                {isEditing ? (
                  <div className='profileComponentContainerFormLabels'>
                    <label>{field.label}:</label>

                    <input
                      type='text'
                      value={
                        field.stateKey === 'fullName'
                          ? fullName
                          : field.stateKey === 'address'
                            ? address
                            : field.stateKey === 'email'
                              ? email
                              : phone
                      }
                      onChange={(e) => handleChange(e, field.stateKey)}
                      readOnly={field.stateKey === 'fullName' || field.stateKey === 'email'}
                    />
                  </div>
                ) : (
                  <>
                    <div className='profileComponentContainerFormLabels'>
                      <label>{field.label}:</label>
                      <input
                        type='text'
                        value={
                          field.stateKey === 'fullName'
                            ? fullName
                            : field.stateKey === 'address'
                              ? address
                              : field.stateKey === 'email'
                                ? email
                                : phone
                        }
                        readOnly
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </form>
        {isEditing ? (
          <>
            <button className='profileComponentContainerBlackButton' onClick={handleSaveClick}>Save</button>
            <button className='profileComponentContainerWhiteButton' onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button className='profileComponentContainerBlackButton' onClick={handleEditClick}>Edit Profile</button>
        )}
      </section>
    )
  );
};

export default ProfileComponent;
