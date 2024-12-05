import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Feeds from "./pages/Feeds";
import EditProfile from "./pages/EditProfile";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/createPosts" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
