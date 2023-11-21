import React from 'react';

const FeedbackCard = ({ name, img, position, feedback, index }) => {
    return (
        <>
            <div className='feedbackBodyContent' key={index} >
                <p className='feedbackBodyContentFeedback'>
                    "{feedback}"
                </p>
                <img src={img} alt={name} /> 
                <p className='feedbackBodyContentName'>{name}</p>
                <p className='feedbackBodyContentPosition'>{position}</p>
            </div>
        </>
    )
}

export default FeedbackCard;