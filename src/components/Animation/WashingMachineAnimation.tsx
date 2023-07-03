import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef } from "react";
import animationData from "~/assets/laundry-animation.json";

type WashingMachineAnimationProps = {
  paused: boolean;
  finished: boolean;
  initialState: boolean;
};

const WashingMachineAnimation = ({
  paused,
  finished,
  initialState,
}: WashingMachineAnimationProps) => {
  const animationRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (finished || initialState) {
      animationRef.current?.goToAndStop(43, true);
    } else if (paused) {
      animationRef.current?.pause();
    } else {
      animationRef.current?.play();
    }
  }, [paused, finished, initialState]);

  return (
    <div className="flex items-center overflow-hidden lg:translate-y-8">
      <Lottie
        lottieRef={animationRef}
        animationData={animationData}
        className="scale-150"
        start={paused ? 0 : 43}
      />
    </div>
  );
};

export default WashingMachineAnimation;
