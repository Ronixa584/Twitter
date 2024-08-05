import { BsTwitter } from "react-icons/bs";
import { BiSolidHomeCircle } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { RiNotification4Line } from "react-icons/ri";
import { BiEnvelope } from "react-icons/bi";
import { LuSquareSlash } from "react-icons/lu";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import React from "react";
import FeedCard from "./Componenet/FeedCard";
import PostTweet from "./Componenet/PostTweet";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const listOfMenu: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiSolidHomeCircle className="text-3xl" />,
  },
  {
    title: "Explore",
    icon: <IoSearchSharp className="text-3xl" />,
  },
  {
    title: "Notifications",
    icon: <RiNotification4Line className="text-3xl" />,
  },
  {
    title: "Messages",
    icon: <BiEnvelope className="text-3xl" />,
  },
  {
    title: "Grok",
    icon: <LuSquareSlash className="text-3xl" />,
  },
  {
    title: "Commuities",
    icon: <BsFillPeopleFill className="text-3xl" />,
  },
  {
    title: "Premium",
    icon: <BsTwitter className="text-3xl" />,
  },
  {
    title: "Profile",
    icon: <IoPerson className="text-3xl" />,
  },
  {
    title: "More",
    icon: <CiCircleMore className="text-3xl" />,
  },
]; 

export default function Home() {
  return (
    <div className="main flex h-screen w-screen justify-center">
      <div className="first w-1/4 ">
        <div className="menu flex flex-col ml-20 p-1">
          <div className="logo hover:bg-gray-800 rounded-full flex justify-center items-center w-14 h-14 ml-1">
            <BsTwitter className="text-3xl" />
          </div>
          {listOfMenu.map((item) => (
            <div
              key={item.title}
              className="menuElements flex gap-5 hover:bg-gray-800 rounded-full w-fit cursor-pointer px-5 py-2"
            >
              <div className="">{item.icon}</div>
              <div className="flex justify-center items-center text-xl font-semibold">
                {item.title}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pl-24 pr-10">
          <button className="tweetButton bg-[#1d9bf0] font-semibold py-3 rounded-full w-full">
            Tweet
          </button>
        </div>
        <div className="profile"></div>
      </div>
      <div className="second  border border-gray-700 w-2/5 h-screen overflow-y-scroll no-scrollbar">
      <PostTweet/>
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </div>
      <div className="third w-1/4"></div>
    </div>
  );
}

