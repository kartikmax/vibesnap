import React from "react";
import Banner from "../assets/Profile/banner.png";
import ProfileImg from "../assets/Profile/profile.png";
import c1p1 from "../assets/Profile/c1p1.png";
import c1p2 from "../assets/Profile/c1p2.png";
import c2p1 from "../assets/Profile/c2p1.png";
import { BsPlus } from "react-icons/bs";

function Profile() {
  return (
    <div className="flex items-center relative justify-center flex-col">
      <div className="w-[360px] h-[800px] flex flex-col border relative border-black gap-2">
        {/* Banner Image */}
        <div className="relative">
          <img src={Banner} className=" h-[180px]" alt="Banner" />

          {/* Profile Image */}
          <div className="absolute left-[10px] bottom-[-40px]">
            <img
              src={ProfileImg}
              className="w-[112px] h-[112px] rounded-full"
              alt="Profile"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="rounded-full border border-[#00000057] px-4 py-1 text-[12px] w-[200px]">
            Edit Profile
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col px-4">
          <div className="flex justify-end items-center"></div>
          <div className="font-semibold text-lg mt-4">Sakshi Agarwal</div>
          <div className="text-[14px] text-gray-600">
            Just someone who loves designing, sketching, and finding beauty in
            the little things 💕
          </div>
          <div className="text-[18px] font-semibold mt-2">My Posts</div>
          <div className="columns-2 gap-1 mt-1">
            <img src={c1p1} className="rounded-lg mb-2" alt="Post 1" />
            <img src={c1p2} className="rounded-lg mb-2" alt="Post 2" />
            <img src={c2p1} className="rounded-lg mb-2" alt="Post 3" />
          </div>
        </div>

        <button className="w-[50px] h-[50px] absolute z-10 rounded-full bottom-20 right-2 bg-[#000000] text-white flex justify-center items-center">
          <BsPlus fontSize={30} />
        </button>
      </div>
    </div>
  );
}

export default Profile;
