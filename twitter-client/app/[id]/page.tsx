"use client";

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import TwitterLayout from "../Componenet/Layout/TwitterLayout";
import { IoArrowBackSharp } from "react-icons/io5";
import { useCurrentUser } from "../../hooks/user";
import Image from "next/image";
import FeedCard from "../Componenet/FeedCard";
import { Tweet } from "@/gql/graphql";

const UserProfilePage = () => {
  const router = useRouter();
  // const { id } = router.query;
  console.log(router.query);

  const { user } = useCurrentUser();

  return (
    <TwitterLayout>
      <div className="second  border border-gray-700 lg:w-2/5 w-5/6 h-screen overflow-y-scroll no-scrollbar">
        <div className="navigationBar flex border border-gray-700">
          <div className="nav p-4">
            <IoArrowBackSharp className="text-xl" />
          </div>
          <div className="w-11/12 pl-3">
            {user && (
              <>
                <h1 className="text-xl font-bold">
                  {user?.firstName} {user?.lastName}
                </h1>
                <div className="text-md text-gray-400">
                  {user?.tweets?.length} tweets
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-indigo-500 bg-gradient-to-r from-sky-500 to-indigo-500 h-1/4  border border-gray-700 relative ">
          {user && user.profileImageURL && (
            <div className="mt-28  pl-5 absolute">
              <div>
                <Image
                  className="rounded-full cursor-pointer "
                  src={user?.profileImageURL}
                  height={130}
                  width={140}
                  alt="USER_IMAGE"
                />
              </div>
              <div className="pt-5">
                <h2 className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <h2 className="text-gray-400">@{user.email.split("@")[0]}</h2>
              </div>
            </div>
          )}
        </div>

        <div className="tweets mt-40">
          {user?.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </div>
    </TwitterLayout>
  );
};

export default UserProfilePage;
