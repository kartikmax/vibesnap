import React,{useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import { isImageOrVideo, getTimeAgo } from "../../utils/common";
// import { Timestamp } from "firebase/firestore";
import { sharePost } from "../../utils/constants";
import Copy from "../../assets/Feeds/copy.png";

// import Copy from '../../'
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";

function PostSection({
  name,
  time,
  post,
  likes,
  caption,
  // showDialog,
  photoURL,
  background,
  handleLike,
  postId,
}) {
  // console.log(post,time);

  const mediaType = isImageOrVideo(post); //250x150
  const [visible, setVisible] = useState(false);
  
  const showDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <>
      <section
        className={`${background} h-[280px] px-5 py-3  w-full rounded-[26px]`}
      >
        <div className="flex items-center justify-start gap-2">
          <img
            src={photoURL}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <div className="font-semibold text-sm">{name}</div>
            <div className="font-thin text-xs">{getTimeAgo(time)} ago</div>
          </div>
        </div>
        <div className="caption font-normal text-[12px]">{caption}</div>

        {post && (
          <section className="flex gap-1 items-center justify-center">
            {mediaType === "image" && (
              <img
                src={post}
                alt="post"
                className="w-auto h-[150px] rounded-lg"
              />
            )}
            {mediaType === "video" && (
              <video controls className="rounded-lg" poster={post + "#t=0.1"}>
                <source src={post} />
              </video>
            )}
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

      <Dialog
        visible={visible}
        onClose={closeDialog}
        animation="zoom"
        title={
          <div className="font-semibold text-[20px] text-black">Share post</div>
        }
        maskAnimation="fade"
        style={{
          borderRadius: "12px",
          width: "328px",
          height: "378px",
          justifyContent: "center",
        }}
      >
        <section className="flex flex-wrap gap-4 justify-center">
          {sharePost.map((item, i) => {
            const postLink = encodeURIComponent("https://vibesnap-nje7.vercel.app/"); 
            const shareUrl = item.linkOfPlatform.replace("POST_LINK", postLink);

            return (
              <div key={i} className="text-center">
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <div style={{ color: item.iconColor, fontSize: "24px" }}>
                    {item.icon}
                  </div>
                </a>
                <p className="mt-2 text-xs text-gray-700">{item.name}</p>
              </div>
            );
          })}
        </section>
        <section className="flex flex-col">
          <div className="text-[14px]">Page Link</div>
          <div className="bg-[#D9D9D9] flex justify-between p-2 rounded-[8px]">
            <div className="text-[12px]">https://vibesnap-nje7.vercel.app/</div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://vibesnap-nje7.vercel.app/${caption}`);
                alert("Link copied!");
              }}
            >
              <img src={Copy} alt="copy" />
            </button>
          </div>
        </section>
      </Dialog>
    </>
  );
}

export default PostSection;
