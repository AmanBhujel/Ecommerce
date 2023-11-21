'use client'
import React, { useState } from 'react';
import '../styles/FAQ.css'

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqArray = [
        {
            question: " What is cloth customization?",
            answer: "Cloth customization is the process of creating personalized clothing items that are tailored to your specific preferences and style. It involves choosing various design elements such as fabric, color, patterns, and embellishments to create a unique garment."
        },
        {
            question: "How can I customize my clothes?",
            answer: "You can customize your clothes by using online clothing customization platforms or visiting a local tailor or designer. Online platforms often provide tools to choose fabrics, colors, designs, and even add custom measurements to create a one-of-a-kind piece."
        },
        {
            question: "What can I customize in a garment?",
            answer: "You can customize various aspects of a garment, including the fabric type, color, style, neckline, sleeves, length, and additional embellishments such as embroidery or prints. The extent of customization may vary depending on the service provider."
        },
        {
            question: "Are customized clothes more expensive?",
            answer: "The cost of customized clothes can vary. While some customization options may add to the price, it's possible to find affordable customization services. The final cost depends on the materials used, complexity of design, and any additional features you choose."
        },
        {
            question: "How long does it take to customize clothes?",
            answer: "The time required for cloth customization depends on factors like the complexity of the design, the availability of materials, and the workload of the service provider. It's a good idea to inquire about the estimated turnaround time when placing an order."
        },
        {
            question: "Can I customize existing clothing items?",
            answer: "Yes, you can often customize existing clothing items to some extent. Tailors and designers can alter the fit, length, and style of your existing garments to better suit your preferences."
        },
        {
            question: "Are there any limitations to cloth customization?",
            answer: "While cloth customization offers a wide range of possibilities, there may be some limitations based on the available materials and techniques. It's essential to discuss your ideas with the service provider to understand what can be achieved."
        },
        {
            question: "Is cloth customization eco-friendly?",
            answer: "Cloth customization can be more environmentally friendly than mass-produced clothing since it reduces waste and promotes the use of quality materials. Opting for sustainable and organic fabrics can further enhance the eco-friendliness of customized clothing."
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faqContainer">
            <p className='faqContainerHeading'>
            Frequently Asked Questions
            </p>
            {faqArray.map((faq, index) => (
                <div key={index} className={`faqItem ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleAccordion(index)}>
                    <div className="faqQuestion"><span style={{fontWeight:'bolder'}}> Q:</span>{faq.question}</div>
                    {activeIndex === index && <div className="faqAnswer"><span style={{fontWeight:'bolder'}}> Ans:</span>{faq.answer}</div>}
                </div>
            ))}
        </div>
    );
};

export default FAQ;
