import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import GuidelinesSection from '../components/GuidelinesSection';
import AwardCategories from '../components/AwardCategories';
// import PreviousWinners from '../components/PreviousWinners';
import ContactSection from '../components/ContactSection';
import FAQSection from '../components/FAQSection';
import GallerySection from '../components/GallerySection';
import Footer from '../components/Footer';
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <AboutSection/>
      <GuidelinesSection/>
      <AwardCategories/>
      {/* <PreviousWinners/> */}
      <ContactSection/>
      <FAQSection/>
      <GallerySection/>
      <Footer/>
    </>
  );
};

export default LandingPage;
