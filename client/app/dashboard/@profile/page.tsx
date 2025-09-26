"use client";

import Card from "@/components/Card";
import { signout } from "@/lib/auth";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function UserProfile() {
  interface UserData {
    profilePic: string;
    name: string;
    userName: string;
  }

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const response = await signout();
      if (response) {
        console.log("Sign-out successful");
        router.push("/login");
      } else {
        console.error("Sign-out failed");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  const user = useSelector((state: RootState) => state.user.userData) as UserData | null;

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <div className="flex flex-col items-center p-4">
        <Image
          src={user.profilePic || "/images/profile-pic.png"}
          alt="Profile"
          className="rounded-full mb-4"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-bold text-black">{user.name}</h1>
        <p className="text-gray-600">{user.userName}</p>
        <button onClick={handleSignOut} className="mt-4">
          <span className="text-blue-500">Sign Out</span>
        </button>
        <h2 className="text-xl font-semibold mt-4 text-black">Suggested Users</h2>
        <ul className="flex flex-col text-black">
          <li className="flex justify-between items-center py-2 gap-2">
            <span >Suggested User 1</span>
            <button className="bg-blue-500 text-white px-4 py-1 rounded">
              Follow
            </button>
          </li>
          <li className="flex justify-between items-center py-2">
            <span>Suggested User 2</span>
            <button className="bg-blue-500 text-white px-4 py-1 rounded">
              Follow
            </button>
          </li>
        </ul>
      </div>
    </Card>
  );
};