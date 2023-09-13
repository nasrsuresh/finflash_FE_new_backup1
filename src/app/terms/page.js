import React from 'react';
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Script from 'next/script';
import { useRef } from "react";
import { useRouter } from 'next/router';
import Analytics from './Analytics';

const inter = Inter({ weight: ["500", "700"], subsets: ["latin"] });

export default function PublicPage() {
  const mainref = useRef();
  const router = useRouter();

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
          gtag('config', 'G-K1WFKY4JMH', { send_page_view: false });
        `}
      </Script>

      <Header modalContainer={mainref} />
      <div className="container mx-auto p-4">
    <h1>Terms and Conditions</h1>
    <p>Welcome to Finance Flash!</p>
    
    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Finance Flash if you do not agree to take all of the terms and conditions stated on this page.</p>
    
    <h2>Cookies</h2>
    <p>We employ the use of cookies. By accessing Finance Flash, you agreed to use cookies in agreement with the Finance Flash's Privacy Policy.</p>
    
    <h2>License</h2>
    <p>Unless otherwise stated, Finance Flash and/or its licensors own the intellectual property rights for all material on Finance Flash. All intellectual property rights are reserved. You may access this from Finance Flash for your own personal use subjected to restrictions set in these terms and conditions.</p>
    
    <h2>You must not:</h2>
    <ul>
        <li>Republish material from Finance Flash</li>
        <li>Sell, rent or sub-license material from Finance Flash</li>
        <li>Reproduce, duplicate or copy material from Finance Flash</li>
        <li>Redistribute content from Finance Flash</li>
    </ul>
    
    <h2>This Agreement shall begin on the date hereof.</h2>
    
    <h2>Hyperlinking to our Content</h2>
    <p>The following organizations may link to our Website without prior written approval:</p>
    <ul>
        <li>Government agencies;</li>
        <li>Search engines;</li>
        <li>News organizations;</li>
        <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses;</li>
    </ul>
    
    <h2>Disclaimer</h2>
    <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
    <ul>
        <li>limit or exclude our or your liability for death or personal injury;</li>
        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
    </ul>
    
    <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
    
    <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
    </div>

    </main>
  );
}
