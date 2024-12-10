import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Feeds from "./pages/Feeds";
import EditProfile from "./pages/EditProfile";
import CreatePosts from "./pages/CreatePosts";
import ChoosePosts from "./pages/ChoosePosts";
import { Provider } from "react-redux";
import store from "./store/store";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/createPosts" element={<CreatePosts />} />
          <Route path="/choosePosts" element={<ChoosePosts />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
