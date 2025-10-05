"use client";

import Card from "@/components/Card";
import { signout } from "@/lib/auth";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import React from "react";
import { followUser, getSuggestedUsersToFollow } from "@/lib/follow";
import Link from "next/link";

interface UserData {
  _id: string;
  profilePic: string;
  name: string;
  userName: string;
  following: string[];
}

export default function UserProfile() {
  const router = useRouter();
  const [suggestedUsers, setSuggestedUsers] = React.useState<UserData[]>([]);

  React.useEffect(() => {
    getSuggestedUsersToFollow()
      .then((users) => {
        setSuggestedUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching suggested users:", error);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await signout();
      if (response) {
        console.log("Sign-out successful");
        router.push("/auth/login");
      } else {
        console.error("Sign-out failed");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const currentUser = useSelector(
    (state: RootState) => state.user.userData
  ) as UserData | null;

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <div className="flex flex-col items-center p-4">
        <Image
          src={currentUser.profilePic || "/images/profile-pic.png"}
          alt="Profile"
          className="rounded-full mb-4"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-bold text-black">{currentUser.name}</h1>
        <p className="text-gray-600">{currentUser.userName}</p>
        <button onClick={handleSignOut} className="mt-4">
          <span className="text-blue-500">Sign Out</span>
        </button>
        <h2 className="text-xl font-semibold mt-4 text-black">
          Suggested Users
        </h2>
        <ul className="flex flex-col text-black">
          {suggestedUsers &&
            suggestedUsers.map((user: UserData) => (
              <li
                key={user._id}
                className="flex justify-between gap-4 items-center py-2"
              >
                <Link
                  href={`/profile/${user.userName}`}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={user.profilePic || "/images/profile-pic.png"}
                    alt="Profile"
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                  <span>{user.userName}</span>
                </Link>
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => {
                    if (!currentUser.following.includes(user._id)) {
                      followUser(user._id)
                        .then(() => {
                          console.log("User followed successfully");
                        })
                        .catch((error) => {
                          console.error("Error following user:", error);
                        });
                    } else {
                      console.log("Already following this user");
                    }
                  }}
                >
                  {currentUser.following.includes(user._id)
                    ? "Following"
                    : "Follow"}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </Card>
  );
}
