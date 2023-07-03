import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from "next";
import { type Program } from "@prisma/client";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
} from "~/components/ui";
import { i18n } from "~/i18n";
import { prisma } from "~/server/db";
import { useLocaleStore } from "~/state/locale";
import {
  type AllowedSpin,
  type AllowedTemperatures,
  DEFAULT_WASHING_PROGRAMS,
  ALLOWED_SPINS,
  ALLOWED_TEMPERATURES,
  ALLOWED_RELATIVE_TIME,
  type AllowedRelativeTime,
} from "~/utils/types";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useActiveProgramStore } from "~/state/activeProgram";
import { Clock, RefreshCw, Thermometer } from "lucide-react";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { ExactTimeSelect } from "~/components";
import { HeaderMemoized } from "../programs/[slug]";

dayjs.extend(duration);

const FavoriteProgramPage = ({
  program,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    id,
    name: nameOriginal,
    slug,
    spin: defaultSpin,
    temperature: defaultTemperature,
    duration: programDuration,
  } = program;

  const locale = useLocaleStore((state) => state.locale);
  const name =
    DEFAULT_WASHING_PROGRAMS.find((p) => p.slug === slug)?.name[locale] ||
    nameOriginal;
  const [defaultValues, setDefaultValues] = useState({
    spin: defaultSpin as AllowedSpin,
    temperature: defaultTemperature as AllowedTemperatures,
    start: 0,
  });
  const { setActiveProgram } = useActiveProgramStore();
  const router = useRouter();
  const { mutate: startProgram } = api.program.start.useMutation({
    onSuccess: () => void router.push(`/in-progress/${slug}`),
  });
  const [showExactTimeSelect, setShowExactTimeSelect] = useState(false);

  const handleExactTimeChange = useCallback((value: number) => {
    setDefaultValues((prev) => ({ ...prev, start: value }));
  }, []);

  useEffect(() => {
    // Set default values for the active program
    setActiveProgram({
      slug,
      spin: defaultSpin as AllowedSpin,
      temperature: defaultTemperature as AllowedTemperatures,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set active program values in case they are modified
    setActiveProgram({ slug, ...defaultValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const handleStartProgram = () => {
    startProgram({ id, start: defaultValues.start });
  };

  return (
    <>
      <Head>
        <title>{`${name} | ${i18n[locale].programPage.meta.title}`}</title>
      </Head>

      <div className="bg-primary-foreground">
        <main className="container">
          <HeaderMemoized name={name} />

          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="col-span-1">
              <section className="py-8 lg:pr-6">
                <h2 className="text-2xl font-medium">
                  {i18n[locale].programPage.title}
                </h2>
                <p className="mt-5 text-slate-600 dark:text-slate-400">
                  {i18n[locale].programPage.description}
                </p>
              </section>
            </div>

            <div className="col-span-2 py-6 lg:pl-6">
              <div className="ml-auto max-w-lg rounded-md bg-white p-4 shadow-md dark:bg-slate-950">
                <div className="mb-6 grid">
                  <Label
                    htmlFor="spin"
                    className="mb-3 flex items-center gap-3"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>{i18n[locale].programPage.form.spin.label}</span>
                  </Label>
                  <Select
                    name="spin"
                    value={`${defaultValues.spin}`}
                    onValueChange={(value) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        spin: Number(value) as AllowedSpin,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          i18n[locale].programPage.form.spin.placeholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {ALLOWED_SPINS.map((spin) => (
                        <SelectItem key={spin} value={`${spin}`}>
                          {spin === 300
                            ? i18n[locale].programPage.form.spin.noSpin
                            : spin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6 grid">
                  <Label
                    htmlFor="temperature"
                    className="mb-3 flex items-center gap-3"
                  >
                    <Thermometer className="h-4 w-4" />
                    <span>
                      {i18n[locale].programPage.form.temperature.label}
                    </span>
                  </Label>
                  <Select
                    name="temperature"
                    value={`${defaultValues.temperature}`}
                    onValueChange={(value) =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        temperature: Number(value) as AllowedTemperatures,
                      }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          i18n[locale].programPage.form.temperature.placeholder
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {ALLOWED_TEMPERATURES.map((temp) => (
                        <SelectItem key={temp} value={`${temp}`}>
                          {temp === 20
                            ? locale === "en"
                              ? "Cold"
                              : "Κρύο"
                            : temp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {defaultValues.temperature >= 70 && (
                    <p className="mt-2 px-1 text-sm text-orange-600">
                      <span className="font-semibold">
                        {locale === "en" ? "Warning" : "Προσοχή"}
                      </span>
                      {`: ${i18n[locale].programPage.form.temperature.warning}`}
                    </p>
                  )}
                </div>

                <div className="mb-6 grid">
                  <Label
                    htmlFor="time"
                    className="mb-3 flex items-center gap-3"
                  >
                    <Clock className="h-4 w-4" />
                    <span>{i18n[locale].programPage.form.time.label}</span>
                  </Label>
                  {showExactTimeSelect ? (
                    <ExactTimeSelect onChange={handleExactTimeChange} />
                  ) : (
                    <Select
                      name="time"
                      value={`${defaultValues.start}`}
                      onValueChange={(value) =>
                        setDefaultValues((prev) => ({
                          ...prev,
                          start: Number(value) as AllowedRelativeTime,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            i18n[locale].programPage.form.time.placeholder
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {ALLOWED_RELATIVE_TIME.map((time) => (
                          <SelectItem key={time} value={`${time}`}>
                            {i18n[
                              locale
                            ].programPage.form.time.relativeTimeLabel(time)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <div className="mt-2 flex items-center gap-3 pl-2">
                    <Checkbox
                      id="exact-time"
                      checked={showExactTimeSelect}
                      onCheckedChange={(checked) =>
                        setShowExactTimeSelect(Boolean(checked))
                      }
                    />
                    <Label htmlFor="exact-time">
                      {i18n[locale].programPage.form.time.exact}
                    </Label>
                  </div>
                </div>

                <section className="mb-4 border-t border-t-slate-200 px-6 py-4 text-sm dark:border-t-slate-800">
                  <div className="max-w-[8rem]">
                    <div className="my-2 flex items-center justify-between">
                      <span className="font-medium">
                        {i18n[locale].programPage.form.duration}
                      </span>
                      <span className="shrink-0 text-slate-600 dark:text-slate-400">
                        {dayjs
                          .duration(programDuration * 60 * 1000)
                          .format("H[h] m[m]")
                          .replace(/\b0y\b/, "")
                          .replace(/\b0m\b/, "")
                          .replace(/\b0d\b/, "")
                          .replace(/\b0h\b/, "")}
                      </span>
                    </div>
                    <div className="my-2 flex items-center justify-between">
                      <span className="font-medium">
                        {i18n[locale].programPage.form.load}
                      </span>
                      <span className="shrink-0 text-slate-600 dark:text-slate-400">
                        {`${programDuration} (kg)`}
                      </span>
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    {(defaultSpin !== defaultValues.spin ||
                      defaultTemperature !== defaultValues.temperature ||
                      defaultValues.start !== 0) && (
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => {
                          setDefaultValues(() => ({
                            spin: defaultSpin as AllowedSpin,
                            temperature:
                              defaultTemperature as AllowedTemperatures,
                            start: 0,
                          }));
                        }}
                      >
                        {i18n[locale].programPage.form.undo}
                      </Button>
                    )}
                  </div>
                  <Button
                    className="col-span-1 bg-green-700 text-white hover:bg-green-600"
                    onClick={handleStartProgram}
                  >
                    {i18n[locale].programPage.form.submit}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// This gets called on every request
export const getServerSideProps: GetServerSideProps<{
  program: Omit<Program, "createdAt">;
}> = async (req) => {
  // Get slug from the URL
  const { slug: programSlug } = req.query;
  // Fetch program from API
  const program = await prisma.program.findFirst({
    where: { type: "CUSTOM", slug: programSlug as string },
  });

  if (!program) return { notFound: true };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...rest } = program;

  // Pass data to the page via props
  return { props: { program: rest } };
};

export default FavoriteProgramPage;
