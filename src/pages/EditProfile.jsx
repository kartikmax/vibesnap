import React, { useState } from "react";
import ProfileImg from "../assets/Profile/profile.png";
import Banner from "../assets/Profile/banner.png";
import { HiPencil } from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { query, collection, where, getDocs, updateDoc,doc ,getDoc} from "firebase/firestore";
import { db,storage } from "../firebase.config";
import { getAuth } from "firebase/auth";
// import { } from "firebase/firestore";

function EditProfile() {
  const navigate = useNavigate();
  const auth = getAuth();

  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { username, photoURL, bio, bannerURL, userId  } = storedUser || {};

  console.log(auth.currentUser, userId)
  const usersCollectionRef = collection(db, "users");
        console.log(usersCollectionRef)
  
  const [userNameInput, setUserNameInput] = useState(username || "");
  const [bioInput, setBioInput] = useState(bio || "");
  const [profilePhoto, setProfilePhoto] = useState(photoURL || ProfileImg);
  const [bannerPhoto, setBannerPhoto] = useState(bannerURL || Banner);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event, type) => {

    const file = event.target.files[0];
    if (file) {
      try {
        setIsUploading(true); // Show a loading state
  
        const auth = getAuth();
        const userEmail = auth.currentUser?.email;
  
        if (!userEmail) {
          console.error("No authenticated user found.");
          return;
        }
  
        const storageRef = ref(storage,`users/${auth.currentUser.uid}/${type}/${file.name}`); 
        await uploadBytes(storageRef, file); 
        const downloadURL = await getDownloadURL(storageRef); 
  
        console.log(`Updated ${type} URL:`, downloadURL);
  
       
        const usersCollectionRef = collection(db, "users");
        console.log(usersCollectionRef)
        const q = query(usersCollectionRef, where("uid", "==", auth.currentUser.uid)); // Match user's email
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          console.error("No user document found with the current email.");
          return;
        }
  
        // Assuming only one document matches the query
        const userDocRef = querySnapshot.docs[0].ref;
  
        // Update the corresponding field in Firestore
        if (type === "profilePhoto") {
          await updateDoc(userDocRef, { photoURL: downloadURL });
          setProfilePhoto(downloadURL); // Update the local state
        } else if (type === "bannerPhoto") {
          await updateDoc(userDocRef, { bannerURL: downloadURL });
          setBannerPhoto(downloadURL); // Update the local state
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsUploading(false); // Hide the loading state
      }
    }
  };

  const handleSaveProfile = async () => {
    try {
      const user = auth.currentUser;
      
  
      if (!user) {
        console.error("User is not authenticated.");
        return;
      }
  
      // Prepare updated data
      const updatedData = {
        username: userNameInput || "",
        bio: bioInput || "",
        photoURL: profilePhoto || "",
        bannerURL: bannerPhoto || "",
      };
  
      console.log("Updated data being saved to Firestore:", updatedData);
  
      // Try finding the document by UID first
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        await updateDoc(userDocRef, updatedData);
      } else {
        // If no document by UID, query by email
        console.warn("No document found by UID, querying by email...");
        const usersCollectionRef = collection(db, "users");
        const q = query(usersCollectionRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          console.error("No user document found with the current email.");
          return;
        }
  
        // Update the first matching document
        const userDocRefByEmail = querySnapshot.docs[0].ref;
        await updateDoc(userDocRefByEmail, updatedData);
      }
  
      localStorage.setItem("user", JSON.stringify(updatedData));
      console.log("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  

  return (
    <div className="flex items-center relative justify-center flex-col">
      <div className="w-[360px] h-[800px] flex flex-col border relative gap-2">
        <div className="relative">
          <nav className="flex absolute text-white items-center py-3">
            <button
              className="px-3"
              onClick={() => {
                navigate("/profile");
              }}
            >
              <IoMdArrowBack fontSize={20} />
            </button>
            <div className="text-[20px] font-semibold">Edit Profile</div>
          </nav>
          <div className="h-[180px]">
            <img src={bannerPhoto} className="w-full" alt="Banner" />
          </div>
          <button
            className="w-[27px] h-[27px] bg-[#F4F4F4] text-black absolute right-2 rounded-full flex justify-center items-center top-36"
            onClick={() => document.getElementById("bannerFileInput").click()}
          >
            <HiPencil />
          </button>
          <input
            id="bannerFileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(e, "bannerPhoto")}
          />

          <div className="absolute left-[10px] bottom-[-40px]">
            <img
              src={profilePhoto}
              className="w-[112px] h-[112px] rounded-full"
              alt="Profile"
            />
          </div>
          <div>
            <button
              className="w-[27px] h-[27px] bg-[#F4F4F4] text-black absolute left-24 rounded-full flex justify-center items-center"
              onClick={() =>
                document.getElementById("profileFileInput").click()
              }
            >
              <HiPencil />
            </button>
            <input
              id="profileFileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload(e, "profilePhoto")}
            />
          </div>
        </div>

        <div className="flex flex-col justify-around h-[550px]">
          <div className="flex flex-col px-4 justify-around">
            <div className="flex flex-col mt-6 p-1 space-y-4 bg-white rounded-lg">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-300"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className="bottom-1 rounded-full h-12 bg-[#000000] text-white flex justify-center items-center uppercase text-[16px] font-semibold"
          >
            {isUploading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
