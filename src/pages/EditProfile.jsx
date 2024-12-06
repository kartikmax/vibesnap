import React, { useState, useEffect } from "react";
import ProfileImg from "../assets/Profile/profile.png";
import Banner from "../assets/Profile/banner.png";
import { HiPencil } from "react-icons/hi";

function EditProfile() {
  // Retrieve user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  const { username, photoURL, bio } = storedUser || {}; // Use fallback if no data

  // Local state for managing edits
  const [userNameInput, setUserNameInput] = useState(username || "");
  const [bioInput, setBioInput] = useState(bio || "");
  const [profilePhoto, setProfilePhoto] = useState(photoURL || ProfileImg);

  // Handle input changes
  const handleUserNameChange = (e) => setUserNameInput(e.target.value);
  const handleBioChange = (e) => setBioInput(e.target.value);

  // Save updated profile details
  const handleSaveProfile = () => {
    // Save the updated details to localStorage
    localStorage.setItem("user", JSON.stringify({
      username: userNameInput,
      bio: bioInput,
      photoURL: profilePhoto,
    }));

    // Optionally, alert the user or show a success message
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex items-center relative justify-center flex-col">
      <div className="w-[360px] h-[800px] flex flex-col border relative border-black gap-2">
        <div className="relative">
          <img src={Banner} className="h-[180px]" alt="Banner" />
          <button className="w-[27px] h-[27px] bg-[#F4F4F4] text-black absolute right-2 rounded-full flex justify-center items-center top-36">
            <HiPencil />
          </button>

          <div className="absolute left-[10px] bottom-[-40px]">
            <img
              src={profilePhoto}
              className="w-[112px] h-[112px] rounded-full"
              alt="Profile"
            />
          </div>
          <button className="w-[27px] h-[27px] bg-[#F4F4F4] text-black absolute left-24 rounded-full flex justify-center items-center ">
            <HiPencil />
          </button>
        </div>
        <div className="flex flex-col justify-between h-[550px]">
          <div className="flex flex-col px-4 justify-between">
            <div className="flex flex-col mt-6 p-1 space-y-4 bg-white rounded-lg">
              <div className="w-full">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={userNameInput}
                  onChange={handleUserNameChange}
                  className="mt-1 w-full rounded-md border-gray-300"
                />
              </div>

              <div className="w-full">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  value={bioInput}
                  onChange={handleBioChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            className="bottom-2 rounded-full h-12 bg-[#000000] text-white flex justify-center items-center uppercase text-[16px] font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
