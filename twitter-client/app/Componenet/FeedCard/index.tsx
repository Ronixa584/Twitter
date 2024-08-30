import React from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoBookmarkOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { Tweet } from '@/gql/graphql';
import Link from "next/link";

interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {

  const { data } = props;
// console.log(data);

    return (
      <div className="flex flex-row h-auto hover:bg-slate-950  transition-all cursor-pointer border border-b-1 border-t-1 border-r-0 border-l-0 border-gray-700 pb-3">
        <div className="userImage w-1/6 pl-2 lg:pl-4">
          {data.author?.profileImageURL && (
            <Image
              src={data.author?.profileImageURL}
              alt="User Image"
              height={40}
              width={50}
              className="rounded-full mt-2 lg:mt-4 m-auto"
            />
          )}
        </div>
        <div className="Message w-full pt-2 lg:pt-3 pl-2">
          <Link href={`/${data.author?.id}`}>
          <div className="UserName text-sm md:text-base lg:text-base font-medium">
            {data.author?.firstName}
          </div>
          </Link>
          <div className="userMessage text-sm md:text-base lg:text-base">
            {data.content}
          </div>
          {data.imageURL && <Image src={data.imageURL} alt="image" width={400} height={300}/>}
          <div className="Icons flex flex-wrap justify-between  mt-3">
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