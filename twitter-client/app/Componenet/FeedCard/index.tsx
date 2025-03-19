import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoBookmarkOutline } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { Tweet } from '@/gql/graphql';
import Link from "next/link";
import { useGetLikeCountForTweet, useHasUserLikedTweet, useLikeTweet, useUnlikeTweet } from "@/hooks/like";
import toast from "react-hot-toast";
interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;

  console.log(data);

  //Useeffect
  const [isLiked, setIsLiked] = useState(false);
  const { mutate: likeTweet } = useLikeTweet();
  const { mutate: unlikeTweet } = useUnlikeTweet();

  // Fetch the initial like status when the component mounts
  const likeStatus =  useHasUserLikedTweet({
    userId: data?.author?.id || "",
    tweetId: data?.id
  });

  // Fetch the number of likes
  const likeCount = useGetLikeCountForTweet({
    userId: data?.author?.id || "", // userId is not needed for counting likes, but used to maintain structure of LikeTweetInput
    tweetId: data?.id,
  });

    // Update the `isLiked` state when the like status changes
  useEffect(() => {
    if (likeStatus !== undefined) {
      setIsLiked(likeStatus);
    }
  }, [likeStatus]);
  
  const handleLikeToggle = useCallback(() => {
    if (!data?.author?.id || !data?.id) {
      toast.error("User ID or Tweet ID is missing");
      return;
    }

    if (isLiked) {
      unlikeTweet({ userId: data?.author?.id, tweetId: data?.id });
    } else {
      likeTweet({ userId: data?.author?.id, tweetId: data?.id });
    }

    setIsLiked((prev) => !prev); // Toggle the like state
  }, [data?.author?.id, data?.id, isLiked, likeTweet, unlikeTweet]);

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
        {data.imageURL && (
          <Image src={data.imageURL} alt="image" width={400} height={300} />
        )}
        <div className="Icons flex flex-wrap justify-between  mt-3">
          <div className="hover:text-[#1d9bf0] hover:bg-gray-800 rounded-full p-1">
            <BiMessageRounded />
          </div>
          <div className="hover:text-green-400 hover:bg-gray-800 rounded-full p-1">
            <FaRetweet />
          </div>
          {/* {data.author && <LikeButton tweetId={data?.id} currentUserId={data?.author?.id} />} */}

          <button
            onClick={handleLikeToggle}
            className="hover:text-pink-600 hover:bg-gray-800 rounded-full p-1"
          >
            {isLiked ? (
              <IoIosHeart className="text-pink-600" />
            ) : (
              <IoIosHeartEmpty />
            )}
          </button>
          {likeCount > 0 && (
            <span className="text-sm text-gray-500">{likeCount}</span>
          )}
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