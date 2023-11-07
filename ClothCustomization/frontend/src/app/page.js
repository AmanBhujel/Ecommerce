'use client'
import React, { useState, useEffect } from "react";
import HeroSection from "./home/javascripts/HeroSection";
import OurProducts from "./home/javascripts/OurProducts";
import OurServices from "./home/javascripts/OurServices";
import Feedback from "./home/javascripts/Feedback";
import Footer from "@/component/javascripts/Footer";
import Navbar from "@/component/javascripts/Navbar";
import Loading from "@/component/javascripts/Loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Measure the time before rendering your components
  //   const startTime = performance.now();

  //   // Simulate rendering or loading time
  //   // In a real scenario, this might be your actual component rendering logic
  //   const simulateRendering = () => {
  //     // Simulate rendering by using a setTimeout
  //     setTimeout(() => {
  //       // Measure the time after rendering your components
  //       const endTime = performance.now();

  //       // Calculate the time elapsed during rendering
  //       const renderingTime = endTime - startTime;

  //       // Decide when to hide the loading spinner based on rendering time
  //       if (renderingTime > 2000) { // You can adjust the time threshold as needed
  //         setIsLoading(false);
  //       } else {
  //         // Continue to show the loading spinner
  //         simulateRendering();
  //       }
  //     }, 500); // Simulate a 0.5-second rendering time; adjust as needed
  //   };

  //   // Start simulating the rendering process
  //   simulateRendering();
  // }, []);


  useEffect(() => {
    const componentsToLoad = [
      "HeroSection",
      "OurProducts",
      "OurServices",
      "Feedback",
      "Footer",
      "Navbar"
    ];

    // Create a counter for tracking loaded components
    let loadedComponents = 0;

    // Function to check if all components are mounted
    const checkAllComponentsLoaded = () => {
      loadedComponents++;
      if (loadedComponents === componentsToLoad.length) {
        setIsLoading(false);
      }
    };

    componentsToLoad.forEach(componentName => {
      setTimeout(() => {
        checkAllComponentsLoaded();
      }, 1000); 
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div style={{ overflowX: 'hidden' }}>
          <Navbar />
          <HeroSection />
          <OurProducts />
          <OurServices />
          <Feedback />
          <Footer />
        </div>
      )}
    </>
  );
}
