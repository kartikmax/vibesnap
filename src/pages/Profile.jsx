import React, { useRef, useState, useEffect } from "react";
import { storage } from "../firebase.config";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router";
import { IoMdArrowBack } from "react-icons/io";
import Banner from "../assets/Profile/banner.png";
// import Banner from "../assets/Profile/banner.png";
import ProfileImg from "../assets/Profile/profile.png";
import Skeleton from "./components/Skeleton";

function Profile() {
  const navigate = useNavigate();
  // const fileInputRef = useRef(null);
  // const [uploading, setUploading] = useState(false);
  const [postUrls, setPostUrls] = useState([]); // Store post URLs
  const [loadingPosts, setLoadingPosts] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { username, photoURL, bio, bannerURL, uid } = storedUser || {};

  // Function to handle file selection
  // const handleFileSelect = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     handleUpload(file);
  //   }
  // };

  // Function to upload files to Firebase Storage
  const handleUpload = async (file) => {
    if (!user) {
      alert("You must be logged in to upload files.");
      return;
    }

    setUploading(true);

    const storageRef = ref(storage, `users/${uid}/posts/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      console.log("File uploaded successfully. URL:", downloadURL);
      alert("Image uploaded successfully!");

      // Fetch posts again after uploading
      fetchPosts();
    } catch (error) {
      console.error("Error uploading image:", error.message);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // Function to fetch uploaded posts
  const fetchPosts = async () => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    setLoadingPosts(true);
    const postsRef = ref(storage, `users/${uid}/posts`);

    try {
      const listResult = await listAll(postsRef); // List all files in the directory
      const urls = await Promise.all(
        listResult.items.map((item) => getDownloadURL(item))
      ); // Fetch download URLs for all items
      setPostUrls(urls);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoadingPosts(false);
    }
  };

  // Trigger file input click
  // const triggerFileInput = () => {
  //   fileInputRef.current.click();
  // };

  // Fetch posts on component mount
  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  console.log(postUrls);

  return (
    <div className="flex items-center relative justify-center flex-col">
      <div className="w-[360px] h-[800px] flex flex-col border relative border-black gap-2">
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
        <div className="flex justify-end">
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
              <Skeleton className="w-158 h-192 mb-2 rounded-md" />
              <Skeleton className="w-158 h-240 mb-2 rounded-md" />
              <Skeleton className="w-158 h-80 mb-2 rounded-md" />
              <Skeleton className="w-158 h-120 mb-2 rounded-md" />
             
            </div>
          ) : (
            <div className="columns-2 gap-1 mt-1">
              {postUrls.map((post, i) => (
                <img
                  src={post}
                  key={i}
                  className="rounded-lg mb-2"
                  alt={`Post ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        {/* <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileSelect}
        /> */}

        {/* "+" Button */}
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
