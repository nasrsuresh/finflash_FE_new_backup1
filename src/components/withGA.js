// src/components/withGA.js

import Head from 'next/head';

const WithGA = ({ children }) => {
  return (
    <>
      <Head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K1WFKY4JMH"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K1WFKY4JMH');
            `,
          }}
        />
      </Head>
      {children}
    </>
  );
};

export default WithGA;
