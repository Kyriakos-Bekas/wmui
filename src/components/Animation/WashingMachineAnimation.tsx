import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef } from "react";
import animationData from "~/assets/laundry-animation.json";

type WashingMachineAnimationProps = {
  paused: boolean;
  finished: boolean;
};

const WashingMachineAnimation = ({
  paused,
  finished,
}: WashingMachineAnimationProps) => {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (paused) {
      animationRef.current?.pause();
    } else {
      animationRef.current?.play();
    }
  }, [paused]);

  useEffect(() => {
    if (finished) {
      animationRef.current?.goToAndStop(43, true);
    }
  }, [finished]);

  return (
    <div className="flex items-center overflow-hidden lg:translate-y-8">
      <Lottie
        lottieRef={animationRef}
        animationData={animationData}
        className="scale-150"
      />
    </div>
  );
};

export default WashingMachineAnimation;
