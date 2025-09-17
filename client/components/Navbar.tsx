import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/dashboard", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "messages", label: "Messages" },
];

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600">ScalerGram</h1>
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
        <Link href="/profile">
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
