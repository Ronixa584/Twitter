"use client";

import toast, { Toaster } from "react-hot-toast";
import { BiEnvelope, BiSolidHomeCircle } from "react-icons/bi";
import { BsFillPeopleFill, BsTwitter } from "react-icons/bs";
import { CiCircleMore } from "react-icons/ci";
import { IoPerson, IoSearchSharp } from "react-icons/io5";
import { LuSquareSlash } from "react-icons/lu";
import { RiNotification4Line } from "react-icons/ri";
import Image from "next/image";
import { useCurrentUser } from "../../../hooks/user";
import {
  CredentialResponse,
  GoogleLogin,
} from "@react-oauth/google";
import { graphqlClient } from "@/clients/api";
import { useCallback, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import Link from "next/link";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const listOfMenu: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiSolidHomeCircle className="text-3xl" />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <IoSearchSharp className="text-3xl" />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <RiNotification4Line className="text-3xl" />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BiEnvelope className="text-3xl" />,
        link: "/",
      },
      {
        title: "Grok",
        icon: <LuSquareSlash className="text-3xl" />,
        link: "/",
      },
      {
        title: "Commuities",
        icon: <BsFillPeopleFill className="text-3xl" />,
        link: "/",
      },
      {
        title: "Premium",
        icon: <BsTwitter className="text-3xl" />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <IoPerson className="text-3xl" />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <CiCircleMore className="text-3xl" />,
        link: "/",
      },
    ],
    [user?.id]
  ); 

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

  return (
    <div className="main flex h-screen w-screen lg:justify-center  flex-wrap  ">
      <Toaster />

      <div className="first w-1/6 lg:1/4 overflow-y-scroll no-scrollbar lg:overflow-auto flex flex-col items-center justify-between">
        <div className="flex flex-col m-1">
          <div className="menu flex justify-center items-center  md:justify-normal md:items-start md:p-1  lg:justify-normal lg:items-start flex-col  lg:p-1">
            <div className="logo hover:bg-gray-800 rounded-full flex justify-center items-center lg:w-14 h-14 lg:ml-1">
              <BsTwitter className="text-3xl" />
            </div>
            {listOfMenu.map((item) => (
              <Link href={item?.link}>
                <div
                  key={item?.title}
                  className="menuElements flex gap-1 lg:gap-5 my-3 lg:my-0 hover:bg-gray-800 rounded-full w-fit cursor-pointer lg:px-5 py-2"
                >
                  <div className="">{item?.icon}</div>
                  <div className="hidden lg:flex lg:justify-center lg:items-center lg:text-xl lg:font-semibold">
                    {item.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="lg:mt-5 lg:mr-7 lg:ml-2 flex justify-center items-center">
            <button className="tweetButton bg-[#1d9bf0] font-semibold py-3 rounded-full w-full">
              Tweet
            </button>
          </div>
        </div>
        {user && user.profileImageURL ? (
          <div
            onClick={logout}
            className="flex flex-col lgxl:flex-row justify-center items-center lgxl:justify-normal gap-3 mt-10 lgxl:mt-16 lgxl:ml-2 lgxl:mb-3  p-2 lgxl:mr-10 hover:bg-slate-800 rounded-full cursor-pointer"
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
            <div className="hidden lg:block">
              <h2 className="">
                {user.firstName} {user.lastName}
              </h2>
              <h2 className="text-gray-400">@{user.email.split("@")[0]}</h2>
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        )}
      </div>

      {props.children}

      <div className="third w-1/4 hidden lg:block">
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
};

export default TwitterLayout;
