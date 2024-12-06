import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import Post from "../assets/CreatePosts/post.png";

function CreatePosts() {
  return (
    <div className="flex items-center relative justify-center flex-col">
      <div className="w-[360px] h-[800px] flex flex-col border relative border-black gap-2 ">
        <nav className="flex  items-center py-3 ">
          <div className="px-3">
            <IoMdArrowBack fontSize={20} />
          </div>
          <div className="text-[20px] font-bold">New Post</div>
        </nav>

        <div className="flex justify-center">
          <img src={Post} className="w-[280px] h-[285px]" />
        </div>
        <div className="px-4 mt-3 text-black">
          <textarea
            id="caption"
            // placeholder="Surrounded by nature's beauty, finding peace in every leaf, breeze, and sunset. 🌿🌞
            // #NatureVibes #OutdoorEscape #EarthLover"
            rows="4"
            className="mt-1 p-2 text-black w-full rounded-md border-gray-300 font-normal text-[14px] "
          >
            Surrounded by nature's beauty, finding peace in every leaf, breeze,
            and sunset. 🌿🌞 #NatureVibes #OutdoorEscape #EarthLover
          </textarea>
        </div>
        <div className="w-full absolute bottom-20 justify-center  flex ">
          <button className=" w-full  mx-2 rounded-full h-12 bg-[#000000] text-white flex justify-center items-center uppercase text-[16px] font-semibold">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePosts;
