"use client";

import TwitterLayout from "../Componenet/Layout/TwitterLayout";
import { IoArrowBackSharp } from "react-icons/io5";
import { useGetUserInfo } from "../../hooks/user";
import Image from "next/image";
import FeedCard from "../Componenet/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface ServerProps {
  user?: User;
}

const UserProfilePage: React.FC<ServerProps> = (props) => {
  const params = useParams();
  const id = params?.id as string;
  
  const { userProfileInfo } = useGetUserInfo(id);

  // console.log("USER Profile "+ userProfileInfo);
  // console.log("USER Profile " + JSON.stringify(userProfileInfo, null, 2));

  return (
    <TwitterLayout>
      <div className="second  border border-gray-700 lg:w-2/5 w-5/6 h-screen overflow-y-scroll no-scrollbar">
        <div className="navigationBar flex border border-gray-700">
          <Link href="/">
          <div className="nav p-4">
            <IoArrowBackSharp className="text-xl" />
            </div>
            </Link>
          <div className="w-11/12 pl-3">
            {userProfileInfo && (
              <>
                <h1 className="text-xl font-bold">
                  {userProfileInfo?.firstName} {userProfileInfo?.lastName}
                </h1>
                <div className="text-md text-gray-400">
                  {userProfileInfo?.tweets?.length} tweets
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-indigo-500 bg-gradient-to-r from-sky-500 to-indigo-500 h-1/4  border border-gray-700 relative ">
          {userProfileInfo && userProfileInfo.profileImageURL && (
            <div className="mt-28  pl-5 absolute">
              <div>
                <Image
                  className="rounded-full cursor-pointer "
                  src={userProfileInfo?.profileImageURL}
                  height={130}
                  width={140}
                  alt="USER_IMAGE"
                />
              </div>
              <div className="pt-5">
                <h2 className="text-xl font-bold">
                  {userProfileInfo.firstName} {userProfileInfo.lastName}
                </h2>
                <h2 className="text-gray-400">@{userProfileInfo.email.split("@")[0]}</h2>
              </div>
            </div>
          )}
        </div>

        <div className="tweets mt-40">
          {userProfileInfo?.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </div>
    </TwitterLayout>
  );
};

export default UserProfilePage;

// export const getServerSideProps: GetServerSideProps<ServerProps> = async (context) => {
//   const id = context.query.id as string | undefined;

//   if (!id) return { notFound: true, props: {user: undefined} };

//   const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

//   if (!userInfo?.getUserById) return { notFound: true };

//   return {
//     props: {
//       userInfo: userInfo.getUserById as User,
//     },
//   };
// };

// export default async function UserPage({ params }: Props) {
//   const id = params.id;

//   if (!id) {
//     return notFound();
//   }

//   const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

//   if (!userInfo?.getUserById) {
//     return notFound();
//   }

//   return userInfo;

// }
