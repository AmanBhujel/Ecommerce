'use client'
import React, { useEffect, useState } from 'react';
import '../styles/AuthImages.css';
import Loading from '@/component/javascripts/Loading';



const feedbackArray = [
    {
        name: 'Ram',
        img: '/Feedback1.jpg',
        feedback: 'Great experience using the website. Very user-friendly!',
        position: 'CEO of Daraz, Horlicks',
    },
    {
        name: 'Krishna',
        img: '/Feedback2.jpg',
        feedback: 'The website design is fantastic, and the content is very informative.',
        position: 'Software Engineer',
    },
    {
        name: 'Shiva',
        img: '/Feedback3.jpg',
        feedback: 'I love how fast the website loads. The stock market information is helpful.',
        position: 'Online Creator and Editor',
    },
];
const AuthImage = () => {
    const [randomIndex, setRandomIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const newIndex = Math.floor(Math.random() * feedbackArray.length);
        setRandomIndex(newIndex);
        setIsLoading(false)
    }, []);
    return (
        <>

            <div className='authImageSection'>
                {isLoading ? <Loading /> :
                    <div className='authImageContainer'>
                        <div className='authFeedback' key={feedbackArray[randomIndex].name}>
                            <img className='authImageContainerImage' src={feedbackArray[randomIndex].img} alt={feedbackArray[randomIndex].name} />
                            <div className='authFeedbackContents'>
                                <p className='authFeedbackContentsFeedback'> "{feedbackArray[randomIndex].feedback}"</p>
                                <p className='authFeedbackContentsName'>{feedbackArray[randomIndex].name}</p>
                                <p className='authFeedbackContentsPosition'>{feedbackArray[randomIndex].position}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default AuthImage