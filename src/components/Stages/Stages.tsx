import { type ProgramStage } from "@prisma/client";
import clsx from "clsx";
import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";

const stages = ["WASH", "RINSE", "SPIN", "FINISH"];

type StageProps = {
  id: "wash" | "rinse" | "spin" | "finish";
  progress: number;
};

const Stage = ({ id, progress }: StageProps) => {
  const locale = useLocaleStore((state) => state.locale);

  let gridPosition = "col-start-1 col-end-3";

  switch (id) {
    case "rinse":
      gridPosition = "col-start-2 col-end-5";
      break;
    case "spin":
      gridPosition = "col-start-4 col-end-7";
      break;
    case "finish":
      gridPosition = "col-start-6 col-end-9";
      break;
  }

  return (
    <div
      id={`${id}-stage`}
      className={clsx(
        "row-start-1 row-end-2 flex items-center justify-center px-8 py-4",
        gridPosition,
        {
          "bg-green-500 text-white before:bg-transparent": progress >= 100,
        }
      )}
    >
      <style>
        {`#${id}-stage::before {
            width: ${progress}%;
          }`}
      </style>
      <span className="font-medium">
        {i18n[locale].inProgressPage.stages[id]}
      </span>
    </div>
  );
};

const Stages = ({ progress }: { progress: number }) => {
  return (
    <section className="self-baseline">
      <div className="relative grid grid-cols-stats-layout overflow-hidden rounded-md border border-slate-200 dark:border-slate-600">
        {stages.map((stage) => (
          <Stage
            key={stage}
            id={stage.toLowerCase() as "wash" | "rinse" | "spin" | "finish"}
            progress={getStageProgress(stage as ProgramStage, progress)}
          />
        ))}
      </div>
    </section>
  );
};

function getStageProgress(stage: ProgramStage, generalProgress: number) {
  switch (stage) {
    case "WASH":
      return generalProgress <= 50 ? generalProgress * 2 : 100;
    case "RINSE":
      return generalProgress > 50
        ? generalProgress <= 70
          ? (generalProgress - 50) * 5
          : 100
        : 0;
    case "SPIN":
      return generalProgress > 70
        ? generalProgress <= 90
          ? (generalProgress - 70) * 5
          : 100
        : 0;
    case "FINISH":
      return generalProgress > 90 && generalProgress < 100
        ? (generalProgress - 90) * 10
        : 0;
  }

  return 0;
}

export default Stages;
