import React, { useState, useEffect } from "react";
import { storage } from "../firebase.config";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import Banner from "../assets/Profile/banner.png";
import ProfileImg from "../assets/Profile/profile.png";
import Skeleton from "./components/Skeleton";
import { isImageOrVideo } from '../utils/common'

function Profile() {

  const navigate = useNavigate();
  const [postUrls, setPostUrls] = useState([]); // Store post URLs
  const [loadingPosts, setLoadingPosts] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { username, photoURL, bio, bannerURL, uid } = storedUser || {};

  const fetchPosts = async () => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    setLoadingPosts(true);
    const postsRef = ref(storage, `users/${uid}/posts`);

    try {
      const listResult = await listAll(postsRef); 
      const urls = await Promise.all(
        listResult.items.map((item) => getDownloadURL(item))
      ); 
      setPostUrls(urls);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoadingPosts(false);
    }
  };


  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);


  return (
    <div className="flex items-center relative justify-center flex-col">
      <div className="w-[360px] h-[800px] flex flex-col border relative  gap-2">
        {/* Banner Image */}
        <div className="relative">
          <nav className="flex z-10 absolute text-white items-center py-3">
            <button
              className="px-3"
              onClick={() => {
                navigate("/feeds");
              }}
            >
              <IoMdArrowBack fontSize={20} />
            </button>
          </nav>
          <img src={bannerURL || Banner} className="h-[180px]" alt="Banner" />
          {/* Profile Image */}
          <div className="absolute left-[10px] bottom-[-40px]">
            <img
              src={photoURL || ProfileImg}
              className="w-[112px] h-[112px] rounded-full"
              alt="Profile"
            />
          </div>
        </div>
        <div className="flex justify-end pr-2">
          <button
            className="rounded-full border border-[#00000057] px-4 py-1 text-[12px] w-[200px]"
            onClick={() => {
              navigate("/editProfile");
            }}
          >
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col px-4">
          <div className="font-semibold text-lg mt-4">{username || "user"}</div>
          <div className="text-[14px] text-gray-600">{bio}</div>
          <div className="text-[18px] font-semibold mt-2">My Posts</div>

          {postUrls.length === 0 ? (
            <div className="columns-2 gap-2 mt-3 w-30">
              <Skeleton className="w-158 h-192 mb-2 rounded-lg" />
              <Skeleton className="w-158 h-240 mb-2 rounded-lg" />
              <Skeleton className="w-158 h-80 mb-2 rounded-lg" />
              <Skeleton className="w-158 h-120 mb-2 rounded-lg" />
             
            </div>
          ) : (
            <div className="columns-2 gap-1 mt-1">
              {postUrls.map((post, i) => (<React.Fragment key={i}>
                
                  {isImageOrVideo(post)==='image' &&  <img src={post} alt="post" className="rounded-lg mb-2" /> }
                  {isImageOrVideo(post)==='video' && (
                    <video controls className="rounded-lg mb-2" poster={post + "#t=0.1"}>
                      <source src={post} />
                    </video>
                  ) }
                  </React.Fragment>
              ))}
            </div>
          )}
        </div>

        <button
          className="w-[50px] h-[50px] absolute z-10 rounded-full bottom-40 right-2 bg-[#000000] text-white flex justify-center items-center "
          onClick={()=>{
            navigate('/createPosts')
          }}
        >
          <BsPlus fontSize={30} />
        </button>
      </div>
    </div>
  );
}

export default Profile;
