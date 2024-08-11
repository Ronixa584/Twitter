import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoBookmarkOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { Tweet } from '@/gql/graphql';

interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {

  const { data } = props;
    return (
      <div className="flex flex-row h-auto hover:bg-slate-950  transition-all cursor-pointer border border-b-1 border-t-1 border-r-0 border-l-0 border-gray-700 pb-3">
        <div className="userImagew-1/6 pl-4">
          {data.author?.profileImageURL && (
            <Image
              src={data.author?.profileImageURL}
              alt="User Image"
              height={40}
              width={50}
              className="rounded-full mt-4 m-auto"
            />
          )}
        </div>
        <div className="Message w-full pt-3 pl-2">
          <div className="UserName font-medium">{data.author?.firstName}</div>
          <div className="userMessage">{data.content}</div>
          <div className="Icons flex justify-start gap-24 mt-3">
            <div className="hover:text-[#1d9bf0] hover:bg-gray-800 rounded-full p-1">
              <BiMessageRounded />
            </div>
            <div className="hover:text-green-400 hover:bg-gray-800 rounded-full p-1">
              <FaRetweet />
            </div>
            <div className="hover:text-pink-600 hover:bg-gray-800 rounded-full p-1">
              <IoIosHeartEmpty />
            </div>
            <div className="hover:text-[#1d9bf0] hover:bg-gray-800 rounded-full p-1">
              <TbBrandGoogleAnalytics className="" />
            </div>
            <div className="flex gap-3">
              <div className="hover:text-[#1d9bf0] hover:bg-gray-800 rounded-full p-1">
                <IoBookmarkOutline className="" />
              </div>
              <div className="hover:text-[#1d9bf0] hover:bg-gray-800 rounded-full p-1">
                <LuUpload className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default FeedCard;