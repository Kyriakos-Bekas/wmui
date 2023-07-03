import { type Program } from "@prisma/client";
import { Lock, Unlock } from "lucide-react";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { useCallback, useEffect, useState } from "react";
import {
  AbortDialog,
  PauseDialog,
  Stages,
  WashingMachineAnimation,
} from "~/components";
import { Button, Checkbox, Label, useToast } from "~/components/ui";
import { i18n } from "~/i18n";
import { prisma } from "~/server/db";
import { useLocaleStore } from "~/state/locale";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  useCountdown,
  useLocalStorage,
  useReadLocalStorage,
} from "usehooks-ts";
import { api } from "~/utils/api";
import clsx from "clsx";
import { useRouter } from "next/router";

dayjs.extend(duration);

const formatDuration = (duration: number) =>
  dayjs
    .duration(duration)
    .format("H[h] m[m] s[s]")
    .replace(/\b0y\b/, "")
    .replace(/\b0m\b/, "")
    .replace(/\b0d\b/, "")
    .replace(/\b0h\b/, "")
    .replace(/\b0s\b/, "");

const InProgress = ({
  id,
  name,
  duration,
  stage,
  inProgress: inProgressOriginal,
  durationLeft: durationLeftOriginal,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const locale = useLocaleStore((state) => state.locale);
  const { toast } = useToast();

  const { data: fetchedProgram, refetch } = api.program.getOne.useQuery({ id });

  const [notifyOnFinish, setNotifyOnFinish] = useState(false);
  const [uiLocked, setUiLocked] = useState(false);
  const [durationLeft, setDurationLeft] = useState(
    fetchedProgram?.durationLeft ?? durationLeftOriginal
  );
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: durationLeft,
  });
  const [timer, setTimer] = useState(formatDuration((count * 1000) / 60));
  const [activeStage, setActiveStage] = useState(
    fetchedProgram?.stage ?? stage
  );
  const [inProgress, setInProgress] = useState(inProgressOriginal);
  const programPaused: boolean =
    useReadLocalStorage("program-paused") ?? inProgress;
  const [, setProgramPaused] = useLocalStorage("program-paused", inProgress);
  const [timePassed, setTimePassed] = useState(0);
  const { mutate: setProgramProgress } = api.program.setProgress.useMutation({
    onSuccess: ({ inProgress, stage, durationLeft }) => {
      setInProgress(inProgress);
      setActiveStage(stage);
      setDurationLeft(durationLeft);
      setProgramPaused(inProgress);
    },
  });
  const [progressAsPercent, setProgressAsPercent] = useState(0);
  const router = useRouter();

  const handlePause = () => {
    stopCountdown();
    setProgramPaused(true);
    setProgramProgress({
      id,
      inProgress: false,
      durationLeft: (timePassed * 60) / duration,
    });
  };

  const handleContinue = () => {
    startCountdown();
    setProgramPaused(false);
    setProgramProgress({
      id,
      inProgress: true,
      durationLeft: (timePassed * 60) / duration,
    });
  };

  const handleProgramAbort = () => {
    stopCountdown();
    setProgramProgress({
      id,
      inProgress: false,
      durationLeft: duration,
    });
    void router.push("/");
  };

  const handleProgramFinish = useCallback(() => {
    stopCountdown();
    setProgramPaused(false);
    setProgramProgress({
      id,
      inProgress: false,
      durationLeft: duration,
    });
    if (notifyOnFinish) {
      toast({
        title: i18n[locale].inProgressPage.finish.toast.title,
        description: i18n[locale].inProgressPage.finish.toast.description,
      });
    }
    setTimeout(() => void router.push("/"), 2000);
  }, [
    stopCountdown,
    setProgramPaused,
    setProgramProgress,
    id,
    duration,
    toast,
    locale,
    router,
    notifyOnFinish,
  ]);

  useEffect(() => {
    if (count === 0) {
      handleProgramFinish();
      return;
    }

    setTimer(formatDuration(count * 1000));
    setTimePassed(duration - count);
    setProgressAsPercent((timePassed / duration) * 100);
  }, [count, duration, handleProgramFinish, timePassed]);

  useEffect(() => {
    if (progressAsPercent <= 50) {
      setActiveStage("WASH");
    } else if (progressAsPercent > 50 && progressAsPercent <= 70) {
      setActiveStage("RINSE");
    } else if (progressAsPercent > 70 && progressAsPercent <= 90) {
      setActiveStage("SPIN");
    } else if (progressAsPercent > 90 && progressAsPercent < 100) {
      setActiveStage("FINISH");
    } else {
      setActiveStage("IDLE");
    }
  }, [progressAsPercent]);

  const handleStageUpdate = useCallback(async () => {
    const { data: updatedProject } = await refetch();

    if (!updatedProject) return;

    const { inProgress, durationLeft } = updatedProject;
    setInProgress(inProgress);
    setDurationLeft(durationLeft);
  }, [refetch]);

  useEffect(() => {
    void handleStageUpdate();
  }, [activeStage, handleStageUpdate]);

  return (
    <main className="container grid grid-cols-1 grid-rows-progress-layout gap-8 pb-8 pt-6">
      <div>
        {/* Header */}
        <div
          className={clsx(
            "flex flex-wrap items-start justify-start gap-8 lg:gap-4",
            {
              "my-auto mb-24 text-center": count === 0,
            }
          )}
        >
          <div className="grow">
            <h1 className="text-2xl font-semibold">
              {locale === "gr" && "Το πρόγραμμα"}{" "}
              <span className="text-blue-700">{name}</span>{" "}
              {
                i18n[locale].inProgressPage.title[
                  count !== 0
                    ? inProgress
                      ? "inProgress"
                      : "paused"
                    : "finished"
                ]
              }
            </h1>

            {count !== 0 && (
              <div className="mt-4 flex items-center gap-3">
                <Checkbox
                  id="notify-on-finish"
                  checked={notifyOnFinish}
                  onCheckedChange={(checked) =>
                    setNotifyOnFinish(Boolean(checked))
                  }
                  disabled={uiLocked}
                />
                <Label htmlFor="notify-on-finish">
                  {i18n[locale].inProgressPage.notify}
                </Label>
              </div>
            )}
          </div>

          {count !== 0 && (
            <div className="flex grow items-center gap-2 lg:grow-0 lg:basis-1/4">
              <div className="basis-1/2">
                <PauseDialog
                  id={id}
                  disabled={uiLocked}
                  onPause={handlePause}
                  onContinue={handleContinue}
                  showWarning={timePassed >= 20}
                />
              </div>
              <div className="basis-1/2">
                <AbortDialog
                  id={id}
                  disabled={uiLocked}
                  onAbort={handleProgramAbort}
                />
              </div>
            </div>
          )}
        </div>

        {/* UI Lock */}
        {count !== 0 && (
          <div className="my-8">
            <Button
              className="flex items-center gap-2"
              variant="ghost"
              onClick={() => setUiLocked((prev) => !prev)}
            >
              {uiLocked ? (
                <Lock className="mr-2" size={16} />
              ) : (
                <Unlock className="mr-2" size={16} />
              )}
              <span>
                {
                  i18n[locale].inProgressPage.uiLock[
                    uiLocked ? "locked" : "unlocked"
                  ]
                }
              </span>
            </Button>
          </div>
        )}

        <section className="grid grow grid-cols-1 gap-2 lg:grid-cols-2">
          <div>
            <WashingMachineAnimation
              paused={programPaused}
              finished={count === 0}
            />
          </div>

          <div className="flex flex-col items-center gap-4 text-center lg:self-center">
            {count !== 0 && (
              <span className="text-sm text-muted-foreground">
                Time remaining
              </span>
            )}
            <span className="text-5xl font-medium">
              {count !== 0 ? timer : i18n[locale].inProgressPage.finish.message}
            </span>
          </div>
        </section>
      </div>

      {/* Stages */}
      {count !== 0 && <Stages progress={progressAsPercent} />}
    </main>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps<
  Omit<Program, "createdAt">
> = async (req) => {
  // Get slug from the URL
  const { slug: programSlug } = req.query;
  // Fetch program from API
  const program = await prisma.program.findFirst({
    where: { slug: programSlug as string },
  });

  if (!program) return { notFound: true };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...rest } = program;

  // Pass data to the page via props
  return { props: { ...rest } };
};

export default InProgress;
