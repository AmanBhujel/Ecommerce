'use client'
import { Navigation, Pagination, A11y } from 'swiper/modules';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import '../styles/Feedback.css';
import FeedbackCard from './FeedbackCard';


const Feedback = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className='feedback'>
      <section className='feedbackHeadingSection'>
        <h6>FEEDBACK</h6>
        <p>What others have to say</p>
      </section>
      <section className='feedbackBodyContainer'>
        {isMobile ? (
          // <Swiper
          // modules={[Navigation, Pagination, A11y]}
          //   spaceBetween={50}
          //   slidesPerView={1}
          //   loop={true}
          //   navigation={{
          //     nextEl: '.swiper-button-next',
          //     prevEl: '.swiper-button-prev',
          //   }}
          // >
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
          >
            {feedbackArray.map((feedback, index) => (
              <SwiperSlide key={index}>
                <FeedbackCard
                  name={feedback.name}
                  index={index}
                  feedback={feedback.feedback}
                  img={feedback.img}
                  position={feedback.position}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          feedbackArray.map((feedback, index) => (
            <FeedbackCard
              key={index}
              name={feedback.name}
              index={index}
              feedback={feedback.feedback}
              img={feedback.img}
              position={feedback.position}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default Feedback;
