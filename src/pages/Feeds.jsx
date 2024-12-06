import React, { useState } from "react";
import Menu from "../assets/Feeds/Menu.png";
import Nyc1 from "../assets/Feeds/nyc1.png";
import Nyc2 from "../assets/Feeds/nyc2.png";
import Vid1 from "../assets/Feeds/vid1.png";
import { IoHeartSharp } from "react-icons/io5";
import { RiSendPlaneFill } from "react-icons/ri";
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import { sharePost } from "./constants";
import Copy from "../assets/Feeds/copy.png";

function Feeds() {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <div className="flex items-center relative justify-center flex-col ">
      <div className="w-[360px] flex  flex-col border border-black gap-2">
        <nav className="border border-black flex">
          <img src={Menu} alt="profile image" />
          <div>
            <div className="text-xs">Welcome Back</div>
            <div className="font-semibold">Sakshi Sinha</div>
          </div>
        </nav>
        <div className="font-semibold text-[24px]">Feeds</div>
        <section className="flex flex-col gap-2">
          <div className="bg-[#F7EBFF] h-[300px] w-full rounded-[26px]">
            <div className="flex items-center justify-start gap-2 ">
              <img src={Menu} alt="profile image" className="w-10 h-10" />
              <div className="flex flex-col">
                <div className="font-bold">Aarav</div>
                <div className="font-thin text-xs">2 hours ago</div>
              </div>
            </div>
            <div className="caption font-normal text-[12px]">
              Just arrived in New York City! Excited to explore the sights,
              sounds, and energy of this amazing place. 🗽 #NYC #Travel
            </div>
            <section className="flex gap-1 items-center justify-center">
              <img src={Nyc1} />
              <img src={Nyc2} />
            </section>
            <div className="flex justify-between px-3 pt-3 items-center">
              <div className="hearts flex  items-center justify-center text-[#D95B7F]">
                <div className="">
                  <IoHeartSharp />
                </div>
                <div className="text-sm ">67</div>
              </div>
              <button
                className="send flex w-[80px] justify-center px-2 py-1 rounded-3xl bg-[#00000012] items-center"
                onClick={showDialog}
              >
                <RiSendPlaneFill />
                <div className="fill-black text-xs">Share</div>
              </button>
            </div>
          </div>
          <div className="bg-[#FFFAEE] h-[300px] w-full rounded-[26px]">
            <div className="flex items-center justify-start gap-2 ">
              <img src={Menu} alt="profile image" className="w-10 h-10" />
              <div className="flex flex-col">
                <div className="font-bold">Sneha</div>
                <div className="font-thin text-xs">2 hours ago</div>
              </div>
            </div>
            <div className="caption font-normal text-[12px]">
              Taking a moment to slow down, breathe, and focus on myself. 🌿✨
              Self-care isn't selfish - it's necessary. 💕 #SelfCare #MeTime
              #Wellness
            </div>
            <section className="flex gap-1 items-center justify-center">
              <img src={Vid1} />
            </section>
            <div className="flex justify-between px-3 pt-3 items-center">
              <div className="hearts flex  items-center justify-center text-[#D95B7F]">
                <div className="">
                  <IoHeartSharp />
                </div>
                <div className="text-sm ">67</div>
              </div>
              <button className="send flex w-[80px] justify-center px-2 py-1 rounded-3xl bg-[#00000012] items-center">
                <RiSendPlaneFill />
                <div className="fill-black text-xs">Share</div>
              </button>
            </div>
          </div>
        </section>
      </div>
      <Dialog
        visible={visible}
        onClose={closeDialog}
        animation="zoom"
        title={
          <div className="font-semibold text-[20px] text-black">Share post</div>
        }
        maskAnimation="fade"
        // closeIcon={<span style={{ fontSize: "20px" }}>x</span>}
        style={{
          borderRadius: "12px",
          width: "328px",
          height: "378px",
          justifyContent: "center",
        }}
      >
        <section className="flex flex-wrap gap-4 justify-center">
          {sharePost.map((item, i) => (
            <div key={i} className="text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center "
                style={{ backgroundColor: item.bgColor }}
              >
                <div style={{ color: item.iconColor, fontSize: "24px" }}>
                  {item.icon}
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-700">{item.name}</p>
            </div>
          ))}
        </section>
        {/* <p>This is an example dialog styled like Ant Design.</p> */}
        <section className="flex flex-col">
          <div className="text-[14px]">Page Link</div>
          <div className="bg-[#D9D9D9] flex justify-between p-2 rounded-[8px]">
            <div className="text-[12px]">https://www.arnav/feed</div>
            <button>
              <img src={Copy} alt="copy" />{" "}
            </button>
          </div>
        </section>
      </Dialog>
    </div>
  );
}

export default Feeds;
