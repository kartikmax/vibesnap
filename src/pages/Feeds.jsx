import React, { useState, useEffect } from "react";
import Dialog from "rc-dialog";
import "rc-dialog/assets/index.css";
import { sharePost } from "./constants";
import Copy from "../assets/Feeds/copy.png";
import { useNavigate } from "react-router";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import PostSection from "./components/PostSection";
import "../App.css";
import { BsPlus } from "react-icons/bs";
import PostSkeleton from "./components/PostSkeleton";

function Feeds() {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { username, photoURL, bio, bannerURL } = storedUser || {};
  const auth = getAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, "posts"); // Adjust collection name if different
        const querySnapshot = await getDocs(postsCollectionRef);

        const allPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(allPosts);
        // console.log("Fetched posts:", allPosts);
      } catch (error) {
        navigate("/");
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const usersCollectionRef = collection(db, "usersData");

    if (!storedUser) {
      const authUser = {
        username: username,
        photoURL: photoURL,
        bio: "Hi I am using Vibesnap",
        loggedIn: true,
      };

      const userDocRef = doc(db, "users", authUser.username);

      getDoc(userDocRef).then((docSnap) => {
        if (!docSnap.exists()) {
          setDoc(userDocRef, authUser).then(() => {
            console.log("User created in Firestore");
          });
          addDoc(usersCollectionRef, authUser);
          console.log("users added");
        }
      });

      localStorage.setItem("user", JSON.stringify(authUser));
    }
  }, []);

  const showDialog = () => setVisible(true);
  const closeDialog = () => setVisible(false);

  return (
    <div className="flex items-center relative justify-center flex-col ">
      <div className="w-[360px] flex relative  flex-col border gap-2">
        <nav className="flex mx-2">
          <button
            onClick={() => {
              navigate("/profile");
            }}
          >
            <img
              src={photoURL}
              alt="profile image"
              className="w-[50px] h-[50px] rounded-full"
            />
          </button>
          <div className="items-center mt-1 px-2  ">
            <div className="text-xs ">Welcome Back</div>
            <div className="font-semibold">{username || "user"}</div>
          </div>
        </nav>
        <div className="font-semibold text-[24px] mx-3">Feeds</div>
        <section className="flex flex-col gap-2 mx-3 overflow-y-scroll  h-screen">
          
          {posts.length === 0
            ? <>
              <PostSkeleton/>
              <PostSkeleton/>
            </ >
            : posts.map((post, i) => (
                <PostSection
                  key={post.id} // Always provide a unique key for lists
                  caption={post.caption}
                  likes={post.likes}
                  post={post.postURL}
                  name={post.username}
                  photoURL={post.photoURL}
                  showDialog={showDialog}
                  background={i % 2 === 0 ? "bg-[#f7ebff]" : "bg-[#fffaee]"}
                />
              ))}
        </section>
        <button
        className="w-[50px] h-[50px] absolute z-10 rounded-full bottom-32 right-2 bg-[#000000] text-white flex justify-center items-center "
        onClick={() => {
          navigate("/createPosts");
        }}
      >
        <BsPlus fontSize={30} />
      </button>
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
