import Card from "@/components/Card";
import Image from "next/image";

interface Post {
  image: string;
  name: string;
  content_image: string;
  content: string;
}

export default function FeedPage() {
  const posts: Post[] = [
    {
      image: "/images/profile-pic.png",
      name: "John Doe",
      content_image: "/images/blank.png",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      image: "/images/profile-pic.png",
      name: "Jane Smith",
      content_image: "/images/blank.png",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      image: "/images/profile-pic.png",
      name: "Alice Johnson",
      content_image: "/images/blank.png",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
  ];

  return (
    // take full height of layout column
    <div className="flex flex-col h-full">
      {/* feed content with scroll */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-150px)] p-6"
        style={{
          scrollbarWidth: "none"
        }}>
        <div className="flex flex-col gap-4">
          {posts.map((post, index) => (
            <Card key={index}>
              <div className="flex flex-col p-4">
                <div className="flex items-center mb-2">
                  <Image
                    src={post.image}
                    alt="Profile"
                    className="rounded-full mr-2"
                    width={40}
                    height={40}
                  />
                  <h2 className="text-lg text-black font-semibold">
                    {post.name}
                  </h2>
                </div>
                <Image
                  src={post.content_image}
                  alt="Post Content"
                  className="mb-2"
                  width={400}
                  height={400}
                />
                <p className="text-gray-600">{post.content}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
