import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase.config";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

import c1p1 from "../assets/Login/c1p1.png";
import c1p2 from "../assets/Login/c1p2.png";
import c1p3 from "../assets/Login/c1p3.png";
import c2p1 from "../assets/Login/c2p1.png";
import c2p2 from "../assets/Login/c2p2.png";
import c2p3 from "../assets/Login/c2p3.png";
import c3p1 from "../assets/Login/c3p1.png";
import c3p2 from "../assets/Login/c3p2.png";
import c3p3 from "../assets/Login/c3p3.png";
import Logo from "../assets/Login/logo-vibe.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(app)

  const handleGoogleSignIn = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Save user details to localStorage
      localStorage.setItem('user', JSON.stringify({
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));
  
      // Optionally, dispatch the user details to Redux (if you're using Redux)
      dispatch(setUser({
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }));
  
      // Redirect to the feeds page
      navigate('/feeds');
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  
  };

  return (
    <div className="flex items-center relative justify-center flex-col border border-black">
      <div className="flex flex-col h-[800px]">
        <div className="columns-3 w-[360px] relative">
          <img src={c1p1} className="mb-3" alt="" />
          <img src={c1p2} className="mb-3" alt="" />
          <img src={c1p3} className="mb-3" alt="" />
          <img src={c2p1} className="mb-3" alt="" />
          <img src={c2p2} className="mb-3" alt="" />
          <img src={c2p3} className="mb-3" alt="" />
          <img src={c3p1} className="mb-3" alt="" />
          <img src={c3p2} className="mb-3" alt="" />
          <img src={c3p3} className="mb-3" alt="" />
        </div>
        <div className="absolute rounded-[60px] bg-white w-[360px] h-[250px] bottom-[80px] z-10 flex flex-col items-center gap-4">
          <div className="flex mt-10">
            <img src={Logo} alt="Logo" />
            <div className="font-semibold text-lg">Vibesnap</div>
          </div>
          <div>Moments That Matter, Shared Forever.</div>
          <button
            onClick={handleGoogleSignIn}
            className="border border-black w-[200px] bg-[#292929] text-white p-3 rounded-[26px] flex items-center justify-around"
          >
            <FcGoogle fontSize={18} />
            <div className="text-sm">Continue with Google</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
