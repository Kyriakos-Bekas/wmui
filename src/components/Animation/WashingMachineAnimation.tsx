import Lottie from "lottie-react";
import animationData from "~/assets/laundry-animation.json";

const WashingMachineAnimation = () => {
  return (
    <div className="flex items-center overflow-hidden lg:translate-y-8">
      <Lottie animationData={animationData} className="scale-150" />
    </div>
  );
};

export default WashingMachineAnimation;
