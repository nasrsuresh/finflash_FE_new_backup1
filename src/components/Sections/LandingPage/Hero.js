import Link from 'next/link';

import Image from 'next/image';
import LOGO_IMAGE from "@/../public/assets/Logo/logo.png";
import Header from '@/components/Header';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


const Hero = () => {
  const mainref = useRef();
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    console.log("Token from window.location:", tokenFromURL);

    if (tokenFromURL) {
      // Store token in localStorage
      localStorage.setItem('token', tokenFromURL);
      console.log("Token stored in localStorage");

      // Set axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenFromURL}`;

      if (router.isReady) {
        // Remove the token from the URL for cleanliness
        router.replace(router.pathname);
      }
    } else if (useAuth().isAuthenticated()) {
      // If not getting token from URL but is authenticated, set axios headers
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [router.isReady]);

  return (
    <div ref={mainref} className="bg-gray-100">
      <Header modalContainer={mainref} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <div className="mx-auto container px-3 pt-20 pb-32">
        <div className="flex w-full gap-6 flex-col md:flex-row">
          <div className="text-right">
            <header className="text-left">
              <h1
                className="whitespace-pre-line text-3xl md:text-5xl font-bold md:leading-snug text-gray-900"
              >
                Crafted for your needs &amp; Automation solutions for Boutique Investment Mgmt.
                &amp; Research firms
                <span className="text-primary block">Achieve More in Less time</span>
              </h1>
              <div className="mb-16 mt-4 text-2xl">
                Curious to discover a solution precisely crafted for your needs?
              </div>
              <div >
                <div className="inline-block rounded-md text-center text-white font-extrabold text-xl py-4 px-6 bg-primary cursor-pointer">
                  Book a consultation
                </div>
                <div>
                  (No strings attached)
                </div>
              </div>

            </header>
          </div>
          <div>
            <Splide className="my-4 " options={{
              autoplay: true,
              interval: 4000,
              width: 1200,
              type: "loop"
            }}>
              <SplideSlide>
                <div>
                  <img className='mx-auto' src="/assets/images/semantic.png" alt="" />

                </div>
              </SplideSlide>
              <SplideSlide>
                <div >
                  <img className='mx-auto' src="/assets/images/statementanalyzer.png" alt="" />

                </div>
              </SplideSlide>
              <SplideSlide>
                <div>
                  <img className='mx-auto' src="/assets/images/automation.png" alt="" />
                </div>
              </SplideSlide>
            </Splide>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Hero;
