import React from "react";
import Image from "next/image";
import { GoFileMedia } from "react-icons/go";
import { FaSquarePollHorizontal } from "react-icons/fa6";
import { BsEmojiSmile } from "react-icons/bs";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import { HiMiniGif } from "react-icons/hi2";


const PostTweet: React.FC = () => {
  return (
    <div className="flex flex-row h-auto  transition-all cursor-pointer border border-b-1 border-t-1 border-r-0 border-l-0 border-gray-700 pb-3">
      <div className="userImagew-1/6 pl-4">
        <Image
          src="https://avatars.githubusercontent.com/u/109419194?v=4"
          alt="User Image"
          height={40}
          width={50}
          className="rounded-full mt-4 m-auto"
        />
      </div>
      <div className="Message w-full pt-6 pl-2">
        <div className="userMessage text-xl text-gray-500">
          What is happening?
        </div>
        <div className="Icons flex justify-between mt-4">
          <div className="flex justify-start ">
            <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
              <GoFileMedia />
            </div>
            <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
              <HiMiniGif className="" />
            </div>
            <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
              <FaSquarePollHorizontal />
            </div>
            <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
              <BsEmojiSmile className="" />
            </div>
            <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
              <RiCalendarScheduleLine className="" />
            </div>
            <div className="text-[#1d9bf0] hover:bg-gray-800 rounded-full p-3">
              <TfiLocationPin className="" />
            </div>
          </div>
          <div className="mr-5">
              <button className="tweetButton bg-[#1d9bf0] font-semibold py-2 px-5 rounded-full ">
                Tweet
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTweet;