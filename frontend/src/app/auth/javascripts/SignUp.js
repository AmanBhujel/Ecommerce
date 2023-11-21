'use client'
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignUp.css';
import setCookie from '@/component/javascripts/SetCookie';
import ToastMessage from '@/component/javascripts/ToastMessage';
import { useRouter } from 'next/navigation';
const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUpOpen, setIsSignUpOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const router = useRouter();


    // for log in
    const handleSubmitLogin = async (e) => {
        e.preventDefault(); // Uncomment this line if this function is attached to a form submission.
    
        try {
            const user = {
                email: email,
                password: password,
            };
            const response = await axios.post('http://localhost:5000/login', user);
    
            if (response.status === 200) {
                ToastMessage('success', response.data.message);
                setCookie('authorization', response.data.token, 7);
                setFullName('');
                setEmail('');
                setPassword('');
                router.replace('/products');
            }
        } catch (error) {
            if (error.response && error.response.status) {
                // Check if error.response and error.response.status exist before accessing them.
                if (error.response.status === 500) {
                    ToastMessage('error', 'Error logging in');
                } else if (error.response.status === 401) {
                    ToastMessage('error', 'Invalid password');
                } else {
                    // Handle other HTTP error status codes if needed.
                    ToastMessage('error', 'An error occurred during login');
                }
            } else {
                // Handle non-HTTP errors, like network issues.
                ToastMessage('error', 'An error occurred during login');
            }
        }
    };
    

    // for Signing up
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const user = {
                name: fullName,
                email: email,
                password: password,
            };
    
            const response = await axios.post('http://localhost:5000/signup', user);
            
            if (response.status === 201) {
                ToastMessage('success', response.data.message);
                setFullName('');
                setEmail('');
                setPassword('');
                setIsSignUpOpen(false);
            }
        } catch (error) {
            if (error.response && error.response.status) {
                // Check if error.response and error.response.status exist before accessing them.
                if (error.response.status === 500) {
                    ToastMessage('error', 'Error signing up');
                } else if (error.response.status === 409) {
                    ToastMessage('error', 'Email already registered');
                } else {
                    // Handle other HTTP error status codes if needed.
                    ToastMessage('error', 'An error occurred during sign up');
                }
            } else {
                // Handle non-HTTP errors, like network issues.
                ToastMessage('error', 'An error occurred during sign up');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleSignUpOpen = () => {
        setIsSignUpOpen(!isSignUpOpen)
    }
    return (
        <>
            <section className='signUpSection'>
                <div className='signUpSectionContainer'>
                    <h2>NEPHARA</h2>
                    <p>Are you ready to design your style? </p>
                    {isSignUpOpen ?
                        <form>
                            <div className='signUpContainerInput' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    placeholder='Enter your name...'
                                />
                            </div>

                            <div className='signUpContainerInput' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email...'
                                    required
                                />
                            </div>
                            <div className='signUpContainerInput' style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'} // Use 'text' when showPassword is true
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Enter password...'
                                    required
                                />
                                <button
                                    className='showPasswordButton'
                                    onClick={togglePasswordVisibility}
                                    type='button'
                                    style={{ position: "absolute", top: "40%", right: '5%', backgroundColor: 'transparent', border: 'none' }}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <button className='signUpButton' onClick={handleSubmit}>Sign up</button>
                            <p className='signUpContainerLine'>OR</p>
                            <button className='signUpButtonGoogle' onClick={handleSubmit}>Sign up With Google</button>
                            <p className='signUpSectionBottomContent'>Already have an account? <span style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleSignUpOpen}>Log in</span></p>

                        </form>
                        :
                        <form>
                            <div className='signUpContainerInput' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email...'
                                    required
                                />
                            </div>
                            <div className='signUpContainerInput' style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'} // Use 'text' when showPassword is true
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Enter password...'
                                    required
                                />
                                <button
                                    className='showPasswordButton'
                                    onClick={togglePasswordVisibility}
                                    type='button'
                                    style={{ position: "absolute", top: "40%", right: '5%', backgroundColor: 'transparent', border: 'none' }}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <button className='signUpButton' onClick={handleSubmitLogin}>Log in</button>
                            <p className='signUpContainerLine'>OR</p>
                            <button className='signUpButtonGoogle' onClick={handleSubmit}>Continue With Google</button>
                            <p className='signUpSectionBottomContent'>Don't have an account? <span style={{ fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }} onClick={toggleSignUpOpen}>Sign up</span></p>

                        </form>}
                </div>

            </section>
        </>
    )
}

export default SignUp