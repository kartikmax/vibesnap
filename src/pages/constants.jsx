import {
  FaTwitter,
  FaFacebook,
  FaDiscord,
  FaFacebookMessenger,
  FaTelegramPlane,
  FaInstagramSquare,
} from "react-icons/fa";
import { GrReddit } from "react-icons/gr";
import { RiWhatsappFill } from "react-icons/ri";

export const sharePost = [
  {
    name: "Twitter",
    bgColor: "#E9F6FB",
    iconColor: "#03A9F4",
    icon: <FaTwitter />,
  },
  {
    name: "Facebook",
    bgColor: "#E7F1FD",
    iconColor: "#1877F2",
    icon: <FaFacebook />,
  },
  {
    name: "Reddit",
    bgColor: "#FDECE7",
    iconColor: "#FF5722",
    icon: <GrReddit />,
  },
  {
    name: "Discord",
    bgColor: "#ECF5FA",
    iconColor: "#6665D2",
    icon: <FaDiscord />,
  },
  {
    name: "WhatsApp",
    bgColor: "#E7FBF0",
    iconColor: "#67C15E",
    icon: <RiWhatsappFill />,
  },
  {
    name: "Messenger",
    bgColor: "#E5F3FE",
    iconColor: "#1E88E5",
    icon: <FaFacebookMessenger />,
  },
  {
    name: "Telegram",
    bgColor: "#E6F3FB",
    iconColor: "#1B92D1",
    icon: <FaTelegramPlane />,
  },
  {
    name: "Instgram",
    bgColor: "#FF40C617",
    iconColor:
      "linear-gradient(49.1deg, #FFDD55 6.59%, #FF543E 50.03%, #C837AB 93.47%)",
    icon: <FaInstagramSquare />,
  },
];
