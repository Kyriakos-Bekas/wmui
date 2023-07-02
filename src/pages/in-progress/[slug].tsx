import { type Program } from "@prisma/client";
import { Lock, Unlock } from "lucide-react";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import { useEffect, useState } from "react";
import {
  AbortDialog,
  PauseDialog,
  WashingMachineAnimation,
} from "~/components";
import { Button, Checkbox, Label } from "~/components/ui";
import { i18n } from "~/i18n";
import { prisma } from "~/server/db";
import { useLocaleStore } from "~/state/locale";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useCountdown } from "usehooks-ts";

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
  start,
  duration,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const locale = useLocaleStore((state) => state.locale);
  const [notifyOnFinish, setNotifyOnFinish] = useState(false);
  const [uiLocked, setUiLocked] = useState(false);
  const [count, { startCountdown, stopCountdown }] = useCountdown({
    countStart: duration * 60,
  });
  const [timer, setTimer] = useState(formatDuration(count * 1000));

  useEffect(() => {
    setTimer(formatDuration(count * 1000));
  }, [count]);

  return (
    <main className="container grid grid-cols-1 grid-rows-progress-layout gap-8 pb-8 pt-6">
      <div>
        {/* Header */}
        <div className="flex flex-wrap items-start justify-start gap-8 lg:gap-4">
          <div className="grow">
            <h1 className="text-2xl font-semibold">
              {locale === "gr" && "Το πρόγραμμα"}{" "}
              <span className="text-blue-700">{name}</span>{" "}
              {i18n[locale].inProgressPage.titleInProgress}
            </h1>

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
          </div>

          <div className="flex grow items-center gap-2 lg:grow-0 lg:basis-1/4">
            <div className="basis-1/2">
              <PauseDialog
                id={id}
                disabled={uiLocked}
                onPause={stopCountdown}
                onContinue={startCountdown}
              />
            </div>
            <div className="basis-1/2">
              <AbortDialog id={id} disabled={uiLocked} />
            </div>
          </div>
        </div>

        {/* UI Lock */}
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

        <section className="grid grow grid-cols-1 gap-2 lg:grid-cols-2">
          <div>
            <WashingMachineAnimation />
          </div>

          <div className="flex flex-col items-center gap-4 text-center lg:self-center">
            <span className="text-sm text-muted-foreground">
              Time remaining
            </span>
            <span className="text-5xl font-medium">{timer}</span>
          </div>
        </section>
      </div>

      {/* Stages */}
      <section className="self-baseline">
        <div className="relative grid grid-cols-stats-layout overflow-hidden">
          <div
            id="washing-stage"
            className="col-start-1 col-end-3 row-start-1 row-end-2 flex items-center justify-center px-8 py-4"
          >
            <span className="font-medium">
              {i18n[locale].inProgressPage.stages.washing}
            </span>
          </div>
          <div
            id="draining-stage"
            className="col-start-2 col-end-5 row-start-1 row-end-2 flex items-center justify-center px-8 py-4"
          >
            <span className="font-medium">
              {i18n[locale].inProgressPage.stages.draining}
            </span>
          </div>
          <div
            id="rinsing-stage"
            className="col-start-4 col-end-7 row-start-1 row-end-2 flex items-center justify-center px-8 py-4"
          >
            <span className="font-medium">
              {i18n[locale].inProgressPage.stages.rinsing}
            </span>
          </div>
          <div
            id="finish-stage"
            className="col-start-6 col-end-9 row-start-1 row-end-2 flex items-center justify-center px-8 py-4"
          >
            <span className="font-medium">
              {i18n[locale].inProgressPage.stages.finish}
            </span>
          </div>
        </div>
      </section>
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
