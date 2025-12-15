import Image from "next/image";

export function StoryAvatar({ story, onClick }: any) {
  return (
    <button onClick={onClick} className="text-center">
      <div
        className={`p-1 rounded-full ${
          story.is_seen
            ? "bg-gray-300"
            : "bg-linear-to-tr from-pink-500 to-yellow-500"
        }`}
      >
        <Image
          src={story.user.avatar}
          alt=""
          width={56}
          height={56}
          className="rounded-full border-2 border-white"
        />
      </div>
      <span className="text-xs">{story.user.username}</span>
    </button>
  );
}
