"use client";

import { BsTwitter } from "react-icons/bs";
import { BiSolidHomeCircle } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { RiNotification4Line } from "react-icons/ri";
import { BiEnvelope } from "react-icons/bi";
import { LuSquareSlash } from "react-icons/lu";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import React, { useCallback, useState } from "react";
import FeedCard from "./Componenet/FeedCard";
import PostTweet from "./Componenet/PostTweet";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { GoFileMedia } from "react-icons/go";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import { HiMiniGif } from "react-icons/hi2";
import { useCreateTweet, useGetAllTweets } from "./../hooks/tweet";
import EmojiPicker from "emoji-picker-react";
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
  const { user } = useCurrentUser();

  // console.log(user);

  const { tweets = [] } = useGetAllTweets();

  const queryClient = useQueryClient();

  const [content, setContent] = useState("");

  const { mutate } = useCreateTweet();

  //Function to get credential, send it to backend and get JWT token which can be used further.
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) return toast.error(`Google token not found`);

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success(`Verified Success`);

      console.log("Success " + verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("TWITTER_TOKEN", verifyGoogleToken);
      }

      await queryClient.invalidateQueries(["CURRENT_USER"]);
    },
    [queryClient]
  );

  const logout = () => {
    window.localStorage.removeItem("TWITTER_TOKEN");

    toast.success(`Logged out Success`);
    window.location.href = "/";
  };

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const onEmojiClick = (emojiObject: { emoji: string }) => {
    setContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false); // Optional: Close the emoji picker after selection
  };

  return (
    <div className="main flex h-screen w-screen justify-center">
      <Toaster />

      <div className="first w-1/4">
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
        {user && user.profileImageURL && (
          <div
            onClick={logout}
            className="flex gap-3 mt-20 ml-24 p-2 mr-10 hover:bg-slate-800 rounded-full cursor-pointer"
          >
            <div>
              <Image
                className="rounded-full"
                src={user?.profileImageURL}
                height={40}
                width={45}
                alt="USER_IMAGE"
              />
            </div>
            <div>
              <h2 className="">
                {user.firstName} {user.lastName}
              </h2>
              <h2 className="text-gray-400">@{user.email.split("@")[0]}</h2>
            </div>
          </div>
        )}
      </div>
      <div className="second  border border-gray-700 w-2/5 h-screen overflow-y-scroll no-scrollbar">
        {/* <PostTweet /> */}

        <div className="flex flex-row h-auto  transition-all cursor-pointer border border-b-1 border-t-1 border-r-0 border-l-0 border-gray-700 pb-3">
          <div className="userImagew-1/6 pl-4">
            <Image
              src={user?.profileImageURL}
              alt="User Image"
              height={40}
              width={50}
              className="rounded-full mt-4 m-auto"
            />
          </div>
          <div className="Message w-full pt-6 pl-2 mr-5">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is happening?!"
              className="userMessage w-full text-xl text-gray-500 bg-transparent mr-5"
              style={{
                overflowY: "auto",
                resize: "none",
                maxHeight: "calc(100vh - 100px)",
              }}
              onInput={(e) => {
                e.target.style.height = "auto"; // Reset the height
                e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight
              }}
            />

            <div className="Icons flex justify-between mt-4">
              <div className="flex justify-start ">
                <div
                  onClick={handleSelectImage}
                  className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3"
                >
                  <GoFileMedia />
                </div>
                <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
                  <HiMiniGif className="" />
                </div>
                <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
                  <FaSquarePollHorizontal />
                </div>
                <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
                  <BsEmojiSmile
                    onClick={() =>
                      setShowEmojiPicker((prevState) => !prevState)
                    }
                    className=""
                  />
                </div>
                <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
                  <RiCalendarScheduleLine className="" />
                </div>
                <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
                  <TfiLocationPin className="" />
                </div>
              </div>
              <div className="">
                <button
                  onClick={() => {
                    if (content.trim() !== "") {
                      handleCreateTweet();
                    }
                  }}
                  className="tweetButton bg-[#1d9bf0] font-semibold py-2 px-5 rounded-full "
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
        {showEmojiPicker && (
          <div className="emoji-picker z-10">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

        {tweets.map((tweet) =>
          tweet ? <FeedCard key={tweet.id} data={tweet} /> : null
        )}
        {/* <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard /> */}
      </div>
      <div className="third w-1/4">
        {!user ? (
          <div className="mt-5 ml-8 p-4 border border-gray-700 rounded-xl">
            <h1 className="text-2xl font-bold">New to Twitter? Join today!</h1>
            <div className="mt-5">
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          </div>
        ) : (
          <div className="mt-5 ml-8 p-4 border border-gray-700 rounded-xl">
            <h1 className="text-xl font-bold">Subscribe to Premium</h1>
            <h3 className="mt-2">
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </h3>
            <div className="mt-3">
              <button className="tweetButton bg-[#1d9bf0] font-semibold py-2 px-5 rounded-full ">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
