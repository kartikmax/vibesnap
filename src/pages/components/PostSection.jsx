import React from "react";
import { IoHeartSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { isImageOrVideo } from "../../utils/common";

function PostSection({
  name,
  time,
  post,
  likes,
  caption,
  showDialog,
  photoURL,
  background,
  handleLike, 
  postId,
}) {
  // console.log(post,time);

  const mediaType = isImageOrVideo(post) //250x150
  console.log(mediaType,post)

  return (
    <section
      className={`${background} h-[280px] px-5 py-3  w-full rounded-[26px]`}
    >
      <div className="flex items-center justify-start gap-2">
        
        <img src={photoURL} alt="profile" className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
          <div className="font-semibold text-sm">{name}</div>
          <div className="font-thin text-xs"> ago</div>
        </div>
      </div>
      <div className="caption font-normal text-[12px]">{caption}</div>

      {post && (
        <section className="flex gap-1 items-center justify-center">
          {mediaType==='image' &&  <img src={post} alt="post" className="w-auto h-[150px] rounded-lg" /> }
          {mediaType==='video' && (
            <video controls className="rounded-lg" poster={post + "#t=0.1"}>
              <source src={post} />
            </video>
          ) }
         
        </section>
      )}

      <div className="flex justify-between px-px pt-3 items-center">
        <div className="hearts flex items-center text-[#D95B7F]">
          <button onClick={() => handleLike(postId)} className="">
            <IoHeartSharp />
          </button>
          <div className="text-sm">{likes}</div>
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
