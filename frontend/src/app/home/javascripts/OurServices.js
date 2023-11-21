'use client'
import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import '../styles/OurServices.css';
import { MdDashboardCustomize, MdOutlineFireTruck, MdWorkspacePremium } from "react-icons/md";

const OurServices = () => {
    const serviceRefs = Array.from({ length: 4 }, () => useRef(null));

    useEffect(() => {
        serviceRefs.forEach((ref) => {
            if (ref.current) {
                const tiltNode = ref.current;
                VanillaTilt.init(tiltNode, {
                    max: 25,
                    speed: 400,
                    glare: true,
                    'max-glare': 0.5,
                });
            }
        });

        return () => {
            serviceRefs.forEach((ref) => {
                if (ref.current && ref.current.vanillaTilt) {
                    ref.current.vanillaTilt.destroy();
                }
            });
        };
    }, []);

    const services = [
        {
            heading: 'Premium Quality',
            description: 'Elevate your style with our premium quality clothing that stands out from the crowd.',
            icon: <MdWorkspacePremium />
        },
        {
            heading: 'Customization Control',
            description: 'Create your own fashion statement with our easy-to-use clothing customization tools.',
            icon: <MdDashboardCustomize />
        },
        {
            heading: 'Fast Delivery',
            description: 'Get your unique and stylish clothing delivered swiftly to your doorstep.',
            icon: <MdOutlineFireTruck />

        },
        {
            heading: 'Cash On Delivery',
            description: 'Experience hassle-free shopping with our Cash On Delivery option for your tailored clothing.',
            icon: <RiMoneyDollarBoxFill />
        }
    ];


    return (
        <main className='ourServices'>
            <div className='ourServicesLayer'></div>
            <section className='ourServicesContent'>
                <h2>OUR SERVICES</h2>
                <div className='ourServicesContentContainer'>
                    <div className='ourServicesGrid'>
                        {services.map((service, index) => (
                            <div key={index} ref={serviceRefs[index]} className='ourServicesContentContainerContent'>
                                <i>{service.icon}</i>
                                <div className='ourServicesContentContainerContentRightSide'>
                                    <h6>{service.heading}</h6>
                                    <p>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default OurServices;
