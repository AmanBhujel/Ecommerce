'use client'
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ContactSection.css';
import { BsFacebook, BsInstagram, BsTelephoneFill, BsTiktok, BsYoutube } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import ToastMessage from '@/component/javascripts/ToastMessage';

const ContactSection = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/contact-info', {
                name,
                email,
                phone,
                message 
            });
            if (response.data && response.data.message) {
                ToastMessage('success', response.data.message);
            } else {
                console.error('Unexpected response format:', response);
            }
            setEmail('');
            setMessage('');
            setName('');
            setPhone('');
        } catch (error) {
            console.error('Error:', error); 
            ToastMessage('error', error.message);
        }
    }


    return (
        <section className='contactSection'>
            <div className='contactSectionContent'>
                <p className='contactSectionContentHeading'>GET IN TOUCH</p>
                <p className='contactSectionContentPhone'><i><BsTelephoneFill /> </i>Phone: +977-986928374</p>
                <p className='contactSectionContentEmail'><i><MdEmail /></i> Email: Nephara23@gmail.com</p>
                <div className='contactSectionContentSocials'>
                    <button><BsFacebook /> </button>
                    <button> <BsInstagram /> </button>
                    <button>  <BsYoutube /></button>
                    <button><BsTiktok /> </button>
                </div>
            </div>
            <div className='contactSectionForm'>
                <div className='contactSectionInputs'>
                    <div className='contactSectionInputsInfo'>
                        <input
                            type="text"
                            placeholder='Your name*'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Your Phone*'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder='Your Email*'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <textarea
                        className='contactSectionInputsMessage'
                        placeholder='Your Message...'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>SEND MESSAGE</button>
            </div>
        </section>
    );
}

export default ContactSection;
