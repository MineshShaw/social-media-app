import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AiFillHome } from "react-icons/ai";
import { FaCompass } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const links = [
  { href: "/dashboard", label: "Home", icon: <AiFillHome size={32} /> },
  { href: "/explore", label: "Explore", icon: <FaCompass size={32} /> },
  { href: "/messages", label: "Messages", icon: <FaRegCommentDots size={32} /> },
  { href: "/upload", label: "Upload", icon: <FiUpload size={32} /> },
];


interface userData {
  name: string;
  email: string;
  _id: string;
  userName: string;
  profilePic: string;
}

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.userData as userData | null);
  return (
    <nav className="flex justify-center rounded-4xl max-w-[50%] items-center p-4 bg-white shadow-md">
      <div className="space-x-4 flex items-center">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-gray-700 font-bold hover:text-indigo-600 text-2xl"
          >
            {link.icon}
          </Link>
        ))}
        <Link href={`/profile/${user?.userName}`} className="ml-4">
          <Image
            src={user?.profilePic || "/images/profile-pic.png"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
      </div>
    </nav>
  );
}
