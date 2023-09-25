"use client"
import Banner from '@/components/Sections/LandingPage/Banner';
import Footer from '@/components/Sections/LandingPage/Footer';
import Hero from '@/components/Sections/LandingPage/Hero';
import VerticalFeatures from "@/components/Sections/LandingPage/VerticalFeatures"
import Testimonials from '@/components/Testimonials';

const Base = () => (
  <div className="text-gray-600  bg-white antialiased">
    <Hero />
    <VerticalFeatures />
    <Banner />
    <Testimonials />
    <Footer />
  </div>
);

export default Base

