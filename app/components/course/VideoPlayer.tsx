import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const player = new Plyr(videoRef.current);

    return () => {
      player.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full rounded-2xl"
    >
      <source
        src="/videos/Untitled - Made with FlexClip.mp4"
        type="video/mp4"
      />
    </video>
  );
}