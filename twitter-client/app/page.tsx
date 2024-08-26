"use client";

import React, { useCallback, useState } from "react";
import FeedCard from "./Componenet/FeedCard";
import { useCurrentUser } from "@/hooks/user";
import Image from "next/image";
import { GoFileMedia } from "react-icons/go";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import { HiMiniGif } from "react-icons/hi2";
import { useCreateTweet, useGetAllTweets } from "./../hooks/tweet";
import EmojiPicker from "emoji-picker-react";
import TwitterLayout from "./Componenet/Layout/TwitterLayout";
import { Tweet } from "@/gql/graphql";


export default function Home() {
  const { user } = useCurrentUser();

  // console.log(user);

  const { tweets = [] } = useGetAllTweets();

  

  const [content, setContent] = useState("");

  const { mutate } = useCreateTweet();


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
    // <div>
      <TwitterLayout>
        <div className="second  border border-gray-700 lg:w-2/5 w-5/6 h-screen overflow-y-scroll no-scrollbar">
          {/* <PostTweet /> */}

          <div className="flex flex-row h-auto  transition-all cursor-pointer border border-b-1 border-t-1 border-r-0 border-l-0 border-gray-700 pb-3">
            <div className="userImage w-1/6 pl-2 lg:pl-4">
              <Image
                src={user?.profileImageURL}
                alt="User Image"
                height={40}
                width={50}
                className="rounded-full  mt-2 lg:mt-4 m-auto"
              />
            </div>
            <div className="Message w-full pt-4 lg:pt-6 pl-2 mr-5">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What is happening?!"
                className="userMessage w-full text-sm md:text-base lg:text-xl text-gray-500 bg-transparent mr-5"
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

              <div className="Icons flex justify-between mt-2  lg:mt-4">
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
                  <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3 hidden lg:block">
                    <RiCalendarScheduleLine className="" />
                  </div>
                  <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3 hidden lg:block">
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

          {tweets?.map((tweet) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
      </TwitterLayout>
    // </div>
  );
}
