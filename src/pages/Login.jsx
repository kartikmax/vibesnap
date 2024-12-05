import React from "react";
import c1p1 from "../assets/Login/c1p1.png";
import c1p2 from "../assets/Login/c1p2.png";
import c1p3 from "../assets/Login/c1p3.png";
import c2p1 from "../assets/Login/c2p1.png";
import c2p2 from "../assets/Login/c2p2.png";
import c2p3 from "../assets/Login/c2p3.png";
import c3p1 from "../assets/Login/c3p1.png";
import c3p2 from "../assets/Login/c3p2.png";
import c3p3 from "../assets/Login/c3p3.png";
import Logo from "../assets/Login/logo-vibe.png";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div className="flex items-center relative justify-center flex-col border border-black">
      {/* Images Container */}
      <div className="columns-3 w-[360px] relative">
        <img src={c1p1} className="mb-3" />
        <img src={c1p2} className="mb-3" />
        <img src={c1p3} className="mb-3" />
        <img src={c2p1} className="mb-3" />
        <img src={c2p2} className="mb-3" />
        <img src={c2p3} className="mb-3" />
        <img src={c3p1} className="mb-3" />
        <img src={c3p2} className="mb-3" />
        <img src={c3p3} className="mb-3" />
      </div>
      {/* Overlayed Gray Box */}
      <div className="absolute rounded-[60px] bg-white w-[360px] h-[250px]  bottom-[-60px] z-10 flex flex-col items-center gap-4">
        <div className="flex mt-10 ">
          <img src={Logo}></img> <div className="font-semibold text-lg">Vibesnap</div>
        </div>
        <div>Moments That Matter, Shared Forever.</div>
        <button className="border border-black w-[200px] bg-[#292929] text-white p-3 rounded-[26px] flex items-center justify-around">
          <FcGoogle fontSize={18} />
          <div className="text-sm">Continue with Google</div>
        </button>
      </div>
    </div>
  );
}

export default Login;
