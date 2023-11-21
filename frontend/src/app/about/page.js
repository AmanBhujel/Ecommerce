import Footer from '@/component/javascripts/Footer'
import Navbar from '@/component/javascripts/Navbar'
import React from 'react'
import AboutUsHeroSection from './javascripts/AboutUsHeroSection'
import FAQ from './javascripts/FAQ'
import Feedback from '../home/javascripts/Feedback'

const About = () => {
  return (
    <>
      <Navbar />
      <AboutUsHeroSection />
      <FAQ />
      <Feedback />
      <Footer />
    </>
  )
}

export default About