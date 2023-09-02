// "use client";
// import Header from "@/components/Header";
// import LOGO_IMAGE from "@/../public/assets/Logo/logo.png";
// import Image from "next/image";
// import { BASE_URL } from "@/Constants";
// import { redirect } from "next/navigation";

// export default function Login() {
//   return (
//     <main className="h-[100vh] bg-[#F7F8F9] text-black">
//       <Header />
//       <div className="w-full m-auto flex-col justify-center items-center gap-5 p-5">
//         <div className="flex justify-center items-center bg-primary text-white w-[300px] m-auto">
//           <Image src={LOGO_IMAGE} className="h-[48px] w-[48px]" alt="LOGO" />
//           <p>Login/Register</p>
//         </div>
//         <div className="w-fit m-auto text-center">
//           <h1 className="p-5 text-black font-bold">It just takes two clicks</h1>
//           <div
//             className="p-3"
//             // onClick={() => {
//             //   fetch(BASE_URL + "login")
//             //     .then((res) => {
//             //       console.log(res);
//             //     })
//             //     .catch((e) => console.log(e));
//             // }}
//           >
//             {/* Google */}
//             <a href={BASE_URL + "login"}>Google</a>
//           </div>
//           <div className="p-3">
//             <button>LinkedIn</button>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";
import Header from "@/components/Header";
import LOGO_IMAGE from "@/../public/assets/Logo/logo.png";
import Image from "next/image";
import { BASE_URL } from "@/Constants";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { redirect } from "next/navigation";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      router.push('/');
    }
  }, []);

  return (
    <main className="h-[100vh] bg-[#F7F8F9] text-black">
      <Header />
      <div className="w-full m-auto flex-col justify-center items-center gap-5 p-5">
        <div className="flex justify-center items-center bg-primary text-white w-[300px] m-auto">
          <Image src={LOGO_IMAGE} className="h-[48px] w-[48px]" alt="LOGO" />
          <p>Login/Register</p>
        </div>
        <div className="w-fit m-auto text-center">
          <h1 className="p-5 text-black font-bold">It just takes two clicks</h1>
          <div className="p-3">
            <a href="http://127.0.0.1:5000/login">Login/Register with Google</a>
          </div>
          <div className="p-3">
            <a href="http://127.0.0.1:5000/login-linkedin">Login/Register with LinkedIn</a>
          </div>
        </div>
      </div>
    </main>
  );
}
