import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const links = [
  { href: "/dashboard", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "messages", label: "Messages" },
];

interface userData {
  name: string;
  email: string;
  _id: string;
  userName: string;
}

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.userData as userData | null);
  return (
    <nav className="flex justify-center rounded-4xl max-w-[50%] items-center p-4 bg-white shadow-md">
      <div className="space-x-4 flex items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-700 hover:text-indigo-600"
          >
            {link.label}
          </Link>
        ))}
        <Link href={`/profile/${user?.userName}`} className="ml-4">
          <Image
            src="/images/profile-pic.png"
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
