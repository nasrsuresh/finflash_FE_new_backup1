"use client";
import Header from "@/components/Header";
import Research from "@/components/Sections/Dashboard/Research";
import AAPL from "@/components/Sections/Dashboard/AAPL";
import { Inter } from "next/font/google";
import Script from 'next/script';
import { useRef, useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Analytics from './Analytics';


const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });

export default function Home() {
  const mainref = useRef();
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   // Google Analytics Manual Page View Tracking
  //   const handleRouteChange = (url) => {
  //     window.gtag('config', 'G-K1WFKY4JMH', {
  //       page_path: url,
  //     });
  //   };
  //   handleRouteChange(window.location.pathname + window.location.search);
  //   router.events.on('routeChangeComplete', handleRouteChange);
  //   return () => {
  //     router.events.off('routeChangeComplete', handleRouteChange);
  //   };
  // }, [router.events]);

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

  function openModal() {

  }

  return (
    <main ref={mainref} className={`${inter.className} h-[100vh]"`}>
      <Analytics />
      {/* Load Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-K1WFKY4JMH`}
        strategy="afterInteractive"
      />
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-K1WFKY4JMH', { send_page_view: false }); // Disable automatic page view tracking
        `}
      </Script>

      <Header modalContainer={mainref} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      <div className="w-100 flex flex-col md:flex-row">
        <Research setIsOpen={setIsOpen} />
        <AAPL />
      </div>
    </main>
  );
}
