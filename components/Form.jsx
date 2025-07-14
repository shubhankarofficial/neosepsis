"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import VideoPlayer from "@components/VideoPlayer";

const ResourcesPage = () => {
  const { data: session } = useSession();
  const [videos] = useState([
    { src: "/videos/video1.mp4", title: "Educational Video on NeoSepsis" },
    { src: "/videos/video2.mp4", title: "Understanding Sepsis" }
  ]);

  return (
    <div>
      {videos.map((video, index) => (
        <VideoPlayer key={index} video={video} />
      ))}
    </div>
  );
};

export default ResourcesPage;
