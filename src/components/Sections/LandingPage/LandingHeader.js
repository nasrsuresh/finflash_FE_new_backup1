"use client";
import Image from "next/image";
import LOGO_IMAGE from "@/../public/assets/Logo/logo.png";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";


const jakarta = Plus_Jakarta_Sans({
  weight: ["700"],
  subsets: ["latin"],
});

const LandingHeader = () => {

  return (
    <header>
      <div className="md:hidden h-12 bg-white"></div>
      <nav
        className={`${jakarta.className} fixed top-0 z-10 w-full sm:h-[8vh] flex flex-col sm:flex-row items-center justify-between bg-primary sm:px-[60px] py-2 sm:py-0`}
      >
        <div className="flex items-center sm:gap-6">

          <Link href='/'>
            <Image src={LOGO_IMAGE} className="h-[48px] w-[48px]" alt="LOGO" />

          </Link>
          <Link href='/'>

            <p className="text-[22px] text-white font-bold">Finance Flash</p>
          </Link>

        </div>
        <div className="fixed md:static w-full md:w-[unset] bottom-0 left-0 z-50 flex">
          <button
            className="bg-primary text-white md:bg-white md:text-primary text-base  font-bold w-full md:w-56 h-11 md:rounded-md"

          >
            Book a consultation
          </button>
        </div>

      </nav>
    </header>

  );
};
export default LandingHeader;
