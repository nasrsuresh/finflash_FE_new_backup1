"use client";
import Header from "@/components/Header";
import Research from "@/components/Sections/Dashboard/Research";
import AAPL from "@/components/Sections/Dashboard/AAPL";
import { Inter } from "next/font/google";
import { useRef, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from "next/navigation"; 
import WithGA from "@/components/withGA";

const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });

export default function Home() {
  const mainref = useRef();
  const router = useRouter();

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
  }, [router.isReady]);  // Add router.isReady to the dependency array


  return (
    <WithGA>
    <main ref={mainref} className={`${inter.className} h-[100vh]"`}>
      <Header modalContainer={mainref} />
      <div className="w-100 h-[92vh] flex">
        <Research />
        <AAPL />
      </div>
    </main>
    </WithGA>
  );
}
