import React, { useState } from "react";
import ProfileImg from "../assets/Profile/profile.png";
import Banner from "../assets/Profile/banner.png";
import { HiPencil } from "react-icons/hi";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";

function EditProfile() {
  // Retrieve user data from localStorage

  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const { username, photoURL, bio, bannerURL } = storedUser || {};

  // Local state for managing edits
  const [userNameInput, setUserNameInput] = useState(username || "");
  const [bioInput, setBioInput] = useState(bio || "");
  const [profilePhoto, setProfilePhoto] = useState(photoURL || ProfileImg);
  const [bannerPhoto, setBannerPhoto] = useState(bannerURL || Banner);

  // Handle input changes
  const handleUserNameChange = (e) => setUserNameInput(e.target.value);
  const handleBioChange = (e) => setBioInput(e.target.value);

  // Handle file upload for profile photo or banner
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profilePhoto") setProfilePhoto(reader.result);
        if (type === "bannerPhoto") setBannerPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save updated profile details
  const handleSaveProfile = () => {
    const updatedData = {
      username: userNameInput,
      bio: bioInput,
      photoURL: profilePhoto,
      bannerURL: bannerPhoto,
    };

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(updatedData));

    alert("Profile updated successfully!");
  };

  return (
    <div className="flex items-center relative justify-center flex-col">
      <div className="w-[360px] h-[800px] flex flex-col border relative border-black gap-2">
        <div className="relative">
          {/* Banner */}
          <nav className="flex absolute text-white items-center py-3 ">
            <button
              className="px-3"
              onClick={() => {
                navigate('/profile');
              }}
            >
              <IoMdArrowBack fontSize={20} />
            </button>
            <div className="text-[20px] font-bold">Edit Profile</div>
          </nav>
          <img src={bannerPhoto} className="h-[180px]" alt="Banner" />
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

          {/* Profile Photo */}
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
              } // Trigger the file input
            >
              <HiPencil />
            </button>
            <input
              id="profileFileInput"
              type="file"
              accept="image/*"
              className="hidden" // Hide the file input
              onChange={(e) => handleFileUpload(e, "profilePhoto")}
            />
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col justify-around h-[550px]">
          <div className="flex flex-col px-4 justify-around">
            <div className="flex flex-col mt-6 p-1 space-y-4 bg-white rounded-lg">
              {/* Username */}
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
                  onChange={handleUserNameChange}
                  className="mt-1 w-full rounded-md border-gray-300"
                />
              </div>

              {/* Bio */}
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
                  onChange={handleBioChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveProfile}
            className="bottom-1 rounded-full h-12 bg-[#000000] text-white flex justify-center items-center uppercase text-[16px] font-semibold"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
