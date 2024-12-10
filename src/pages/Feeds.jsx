import React, { useState, useEffect } from "react";


import { useNavigate } from "react-router";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import PostSection from "./components/PostSection";
import "../App.css";
import { BsPlus } from "react-icons/bs";
import PostSkeleton from "./components/PostSkeleton";

function Feeds() {
  const navigate = useNavigate();
  const auth = getAuth();


  const [posts, setPosts] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { username, photoURL } = storedUser || {};
  const [liked, setLiked] = useState(false);


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
      } catch (error) {
        navigate("/");
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();

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

  const handleLike = async (postId) => {
    try {
      const userId = auth.currentUser.uid; // Get the current user's ID
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const postData = postDoc.data();
        const currentLikes = postData.likes || 0;
        const likedBy = postData.likedBy || [];
        if (liked) {
          // User has already liked the post, perform "unlike" action
          await updateDoc(postRef, {
            likes: currentLikes - 1,
            likedBy: likedBy.filter((id) => id !== userId), // Remove user ID from likedBy array
          });

          // Update local state for UI
          setLiked(false);

          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    likes: currentLikes - 1,
                    likedBy: likedBy.filter((id) => id !== userId),
                  }
                : post
            )
          );
        } else {
          await updateDoc(postRef, {
            likes: currentLikes + 1,
            likedBy: [...likedBy, userId], // Add user ID to likedBy array
          });
          setLiked(true);
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    likes: currentLikes + 1,
                    likedBy: [...likedBy, userId],
                  }
                : post
            )
          );
        }
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
          {posts.length === 0 ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : (
            posts.map((post, i) => (
              <PostSection
                key={post.id}
                name={post.username}
                time={post.time}
                post={post.postURL}
                likes={post.likes}
                likedBy={liked}
                caption={post.caption}
                showDialog={showDialog}
                photoURL={post.photoURL}
                background={i % 2 === 0 ? "bg-[#f7ebff]" : "bg-[#fffaee]"}
                handleLike={handleLike}
                postId={post.id}
              />
            ))
          )}
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

      
    </div>
  );
}

export default Feeds;
