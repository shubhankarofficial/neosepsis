"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import VideoPlayer from "@components/VideoPlayer";

const ResourcesPage = () => {
  const { data: session } = useSession();
  const [videos] = useState([
    { src: "/assets/videos/video1.mp4", title: "Key Neonatal Conditions ", description: "In this educational video, Nurse Merish Shuwanger, BSN, RN, delves into critical neonatal conditions, including neonatal abstinence syndrome (NAS), hypoglycemia, macrosomia, sepsis neonatorum, and necrotizing enterocolitis. Gain valuable insights as she explains each condition’s implications and management strategies. Video credit to Level Up RN." },
    { src: "/assets/videos/video2.mp4", title: "Neonatal Sepsis: Nursing", description: "In this informative video by Nursing2Nurture, delve into the critical topic of neonatal sepsis. Discover the various factors that can place newborns at risk, explore the essential medical interventions, and learn about the specialized nursing care required to manage this serious condition effectively. Video credits to Nursing2Nurture."},
    { src: "/assets/videos/video3.mp4", title: "Classification of sepsis", description: "Can a healthy baby develop neonatal sepsis? Dr. Majd M. Dardas, a Neonatal Perinatal Physician at the Center for Women and Infants at South Miami Hospital, addresses this vital question. In this video, he explains the classifications of neonatal sepsis, including early-onset and late-onset sepsis, providing crucial insights for healthcare professionals and caregivers alike. Video credit to AllHealthGo YT" }
  ]);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 mb-10">Resources</h1>
      {videos.map((video, index) => (
        <VideoPlayer key={index} video={video} />
      ))}
    </div>
  );
};

export default ResourcesPage;
