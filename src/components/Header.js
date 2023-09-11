"use client";
import Image from "next/image";
import LOGO_IMAGE from "@/../public/assets/Logo/logo.png";
import GOOGLE_LOGO from "@/../public/assets/Logo/GoogleLogo.svg";
import LINKEDIN_LOGO from "@/../public/assets/Logo/LinkedInLogo.svg";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useState, useEffect, useContext } from "react";
import { GoHome } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import ReactModal from "react-modal";
import { BASE_URL } from "@/Constants";
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const jakarta = Plus_Jakarta_Sans({
  weight: ["700"],
  subsets: ["latin"],
});

const SCREENS_ARRAY = [
  {
    title: "Contextual Search",
    link: "/contextual-search",
  },
  {
    title: "Key Negatives",
    link: "/key-negatives",
  },
  {
    title: "Flash Report",
    link: "/flash-report",
  },
  {
    title: "Sec GPT",
    link: "/sec-gpt",
  },
  {
    title: "Financials",
    link: "/financials",
  },
];
const Header = ({ modalContainer }) => {
  const router = useRouter();
  const currentPage = usePathname(); 3
  const { isAuthenticated, storeToken } = useAuth();
  const [modalIsOpen, setIsOpen] = useState(false);

  // State to manage loggedIn status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const tokenFromUrl = new URL(window.location.href).searchParams.get('token');
    if (tokenFromUrl) {
      localStorage.setItem('token', tokenFromUrl);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(Boolean(localStorage.getItem('token')));
    }
  }, [router.pathname]);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const login = () => {
    axios.post(BASE_URL + '/login', {}, {
      headers: {
        'Authorization': `Bearer ${token}` // assuming token is acquired here
      }
    }).then(response => {
      storeToken(response.data.token);  // assuming the token is returned as 'token' in the response data
      router.push("/contextual-search");
    });
  };

  const logout = () => {
    localStorage.removeItem('token');  // Remove the token from local storage
    setIsLoggedIn(false);  // Update the local state to reflect that user is logged out
    router.push('/');  // Redirect user to home page or login page
  }

  ReactModal.setAppElement(modalContainer?.current);
  return (
    <nav
      className={`${jakarta.className} sm:h-[8vh] flex flex-col sm:flex-row items-center justify-between bg-primary px-[60px] py-2 sm:py-0`}
    >
      <div className="flex items-center gap-6">
        <Image src={LOGO_IMAGE} className="h-[48px] w-[48px]" alt="LOGO" />
        <p className="text-[22px] text-white font-bold">Finance Flash</p>
        {currentPage !== "/" && (
          <div className="flex gap-3 ml-5">
            {SCREENS_ARRAY.map((v) => (
              <Link href={v.link} key={v.link}>
                <button
                  className={`${v.link === currentPage
                    ? "bg-white text-primary"
                    : "bg-primary text-white"
                    } min-w-fit px-4  text-base font-bold h-11 rounded-md`}
                >
                  {v.title}
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="fixed md:static w-full md:w-[unset] bottom-0 left-0 z-50 flex">
        {isLoggedIn ? (
          <button
            className="bg-white text-primary text-base font-bold w-full md:w-24 h-11 rounded-md"
            onClick={logout}
          >
            Log Out
          </button>
        ) : (
          currentPage !== "/" ? (
            <Link href={"/"}>
              <button className="bg-primary text-white text-2xl">
                <GoHome />
              </button>
            </Link>
          ) : (
            <button
              className="bg-primary text-white md:bg-white md:text-primary text-base font-bold w-full md:w-36 h-11 md:rounded-md"
              onClick={openModal}
            >
              Sign Up For Free
            </button>
          )
        )}
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Login"
      >
        <p className="text-right cursor-pointer" onClick={closeModal}>X</p>
        <div className="w-full m-auto flex-col justify-center items-center gap-5 p-5">
          <div className="flex justify-center items-center bg-primary text-white w-[300px] m-auto">
            <Image src={LOGO_IMAGE} className="h-[48px] w-[48px]" alt="LOGO" />
            <p>Login/Register</p>
          </div>
          <div className="w-fit m-auto text-center">
            <h1 className="p-5 text-black font-bold">
              It just takes two clicks!
            </h1>
            <div className="p-3">
              <button
                onClick={() => {
                  router.push("https://api.finance-flash.com/login");
                }}
                className="bg-white border-2 border-gray-300 text-gray-800 rounded-md p-2 flex items-center space-x-2 hover:bg-gray-100 focus:outline-none"
              >
                <Image
                  src={GOOGLE_LOGO}
                  alt="google"
                  className="h-[32px] w-[32px]"
                />
                <span>Continue with Google</span>
              </button>
            </div>
            <div className="p-3">
              <button
                className="bg-white border-2 border-gray-300 text-gray-800 rounded-md p-2 flex items-center space-x-2 hover:bg-gray-100 focus:outline-none"
                onClick={() => {
                  router.push("https://api.finance-flash.com/login-linkedin");
                }}
              >
                <Image
                  src={LINKEDIN_LOGO}
                  alt="linkedin"
                  className="h-[32px] w-[32px]"
                />
                <span>Continue with LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
        <p className="text-center">
          <button onClick={closeModal}>cancel</button>
        </p>
        <button onClick={login}></button>
      </ReactModal>
    </nav>
  );
};
export default Header;
