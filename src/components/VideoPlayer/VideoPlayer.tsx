import { memo, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Button } from "../ui";

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="relative aspect-video h-full w-full">
      <video
        className="rounded-md object-cover"
        src="/media/washing-machine-ui-app-tutorial.mp4"
        autoPlay={true}
        loop={true}
        controls={false}
        muted={muted}
        ref={videoRef}
      ></video>

      {/* Play/Pause button */}
      <Button
        className="absolute bottom-4 left-4 rounded-full bg-primary-foreground hover:bg-secondary"
        size="icon"
        onClick={() =>
          setIsPlaying((prevState) => {
            if (prevState) {
              videoRef.current?.pause();
            } else {
              void videoRef.current?.play();
            }
            return !prevState;
          })
        }
      >
        {isPlaying ? (
          <Pause className="h-4 w-4 text-primary" />
        ) : (
          <Play className="h-4 w-4 translate-x-[1.5px] text-primary" />
        )}
      </Button>

      <Button
        className="absolute bottom-4 right-4 rounded-full bg-primary-foreground hover:bg-secondary"
        size="icon"
        onClick={() => setMuted((prevState) => !prevState)}
      >
        {muted ? (
          <VolumeX className="h-4 w-4 text-primary" />
        ) : (
          <Volume2 className="h-4 w-4 text-primary" />
        )}
      </Button>
    </div>
  );
};

export default memo(VideoPlayer);
export { VideoPlayer as VideoPlayerNotMemoized };
