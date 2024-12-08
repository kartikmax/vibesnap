import React from "react";
import Menu from "../../assets/Feeds/Menu.png";
// import Nyc1 from "../assets/Feeds/nyc1.png";
// import Nyc2 from "../assets/Feeds/nyc2.png";
// import Vid1 from "../assets/Feeds/vid1.png";
import { IoHeartSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
// import Copy from '../../assets/Feeds/copy.png'

function PostSection({
  name,
  time,
  post,
  likes,
  caption,
  showDialog,
  photoURL,
  background,
}) {
  return (
    <section
      className={`${background} h-[280px] px-5 py-3  w-full rounded-[26px]`}
    >
      <div className="flex items-center justify-start  gap-2 ">
        <img src={photoURL} alt={photoURL} className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
          <div className="font-semibold text-sm">{name}</div>
          <div className="font-thin text-xs">{time} ago</div>
        </div>
      </div>
      <div className="caption font-normal text-[12px]">{caption}</div>

      {post && (
        <section className="flex gap-1 items-center justify-center">
          <img
            src={post}
            alt="post"
            className="w-[auto] h-[150px] rounded-lg"
          />
        </section>
      )}
      <div className="flex justify-between  px-px pt-3 items-center">
        <div className="hearts flex  items-center justify-center text-[#D95B7F]">
          <button className="">
            <IoHeartSharp />
          </button>
          <div className="text-sm ">{likes}</div>
        </div>
        <button
          className="send flex w-[80px] justify-center px-2 py-1 rounded-3xl bg-[#00000012] items-center"
          onClick={showDialog}
        >
          <RiSendPlaneFill />
          <div className="fill-black text-xs">Share</div>
        </button>
      </div>
    </section>
  );
}

export default PostSection;
