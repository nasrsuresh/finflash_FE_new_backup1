import Link from 'next/link';

import Image from 'next/image';
import LOGO_IMAGE from "@/../public/assets/Logo/logo.png";


const Hero = () => (
  <div className="bg-gray-100">
    <div className="mx-auto max-w-screen-lg px-3 py-6">
      <div className="flex flex-wrap items-center justify-between">
        <div >
          <Link href="/">
            <Image src={LOGO_IMAGE} className="h-[48px] w-[48px]" alt="LOGO" />

          </Link>

        </div>
        <nav className="">
          <ul
            className="navbar flex items-center text-xl font-medium text-gray-800"
          >
            <li>
              <Link href="/">
                Finance Flash
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div className="mx-auto max-w-screen-lg px-3 pt-20 pb-32">
      <div className="flex w-full">
        <div className="w-7/10 text-right">
          <header className="text-center">
            <h1
              className="whitespace-pre-line text-5xl font-bold leading-normal text-gray-900"
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
      </div>
    </div>
  </div>

)

export default Hero;
