import React from 'react';
import '../styles/AboutUsHeroSection.css';

const AboutUsHeroSection = () => {
    return (
        <>
            <section className='AboutUsHeroSection'>
                <div className='AboutUsHeroSectionFirstSection'>
                    <div className='AboutUsHeroSectionFirstSectionContent'>
                        <div className='AboutUsHeroSectionFirstSectionContentLayer'></div>
                        <p className='AboutUsHeroSectionFirstSectionContentHeading'>Crafting Fashion, Creating Memories <br /> <span> with Nephara</span></p>
                    </div>
                </div>
                <div className='AboutUsHeroSectionSecondSection'>
                    <div className='AboutUsHeroSectionSecondSectionContent'>
                        <p className='AboutUsHeroSectionSecondSectionContentHeading'>Why Nephara?</p>
                        <p className='AboutUsHeroSectionSecondSectionContentParagraph'>
                            Nephara is on a mission to transform the fashion landscape in Nepal. We're all about personalized customization and delivering garments made from the finest, high-quality fabrics. With Nephara, you have the creative power to design your own clothing right from the cozy confines of your home. Explore a world where fashion meets individuality, and let your unique style shine through with us.                        </p>
                    </div>
                    <div className='AboutUsHeroSectionSecondSectionImage'>
                        <img src='/AboutUsHeroSection3.jpg' alt='CLothes' />
                    </div>

                </div>
                <div className='AboutUsHeroSectionThirdSection'>
                    <div className='AboutUsHeroSectionThirdSectionImage'>
                        <img src='/AboutUsHeroSection1.jpg' alt='Nephara team' />
                    </div>
                    <div className='AboutUsHeroSectionThirdSectionContent'>
                        <p className='AboutUsHeroSectionThirdSectionContentHeading'> Our Team</p>
                        <p className='AboutUsHeroSectionThirdSectionContentParagraph'>
                            At Nephara, we have a dedicated team of talented individuals who bring diverse expertise to the table. Our designers work tirelessly to create unique and personalized clothing options for our customers. Our production team ensures that each garment meets the highest quality standards, and our customer support team is always ready to assist you with any inquiries. Together, we strive to make your fashion customization experience seamless and enjoyable.
                        </p>
                    </div>


                </div>
            </section>
        </>
    )
}

export default AboutUsHeroSection