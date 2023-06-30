import { HeaderMemoized } from "../programs/[slug]";
import { type Program } from "@prisma/client";
import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import {
  Button,
  useToast,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Input,
} from "~/components/ui";
import {
  type AllowedSpin,
  type AllowedTemperatures,
  ALLOWED_SPINS,
  ALLOWED_TEMPERATURES,
} from "~/utils/types";
import { useRouter } from "next/router";
import { RefreshCw, Thermometer } from "lucide-react";
import { type AvailableLocales, useLocaleStore } from "~/state/locale";
import { i18n } from "~/i18n";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveAsFavoriteNameformSchema } from "~/utils/schemas";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

const EditCustomProgramPage = ({
  id,
  name,
  spin: defaultSpin,
  temperature: defaultTemperature,
}: Program) => {
  const locale = useLocaleStore((state) => state.locale);
  const [values, setValues] = useState({
    name,
    spin: defaultSpin as AllowedSpin,
    temperature: defaultTemperature as AllowedTemperatures,
  });
  const { toast } = useToast();
  const { mutate: updateProgram } = api.program.update.useMutation({
    onSuccess: ({ name }) => {
      toast({
        title: i18n[locale].editProgramPage.toast.title,
        description: i18n[locale].editProgramPage.toast.description(name),
        className:
          "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
      });
      void router.push("/");
    },
    onError: (error) => {
      toast({
        title: locale === "en" ? "An error occurred" : "Προέκυψε σφάλμα",
        description: (
          JSON.parse(error.message) as Record<AvailableLocales, string>
        )[locale],
        className: "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200",
      });
    },
  });
  const router = useRouter();

  const localizedSchema = saveAsFavoriteNameformSchema[locale];
  const form = useForm<z.infer<typeof localizedSchema>>({
    resolver: zodResolver(localizedSchema),
    defaultValues: { name },
  });

  function onSubmit(formValues: z.infer<typeof localizedSchema>) {
    setValues((prev) => ({
      ...prev,
      name: formValues.name,
    }));
    handleSaveProgram();
  }

  const handleSaveProgram = () => {
    if (
      defaultSpin === values.spin &&
      defaultTemperature === values.temperature &&
      name === values.name
    ) {
      void router.push("/");
      return;
    }

    updateProgram({ id, ...values });
  };

  return (
    <>
      <Head>
        <title>{`${name} | ${i18n[locale].editProgramPage.meta.title}`}</title>
      </Head>

      <div className="bg-primary-foreground">
        <main className="container">
          <HeaderMemoized name={values.name} />

          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="col-span-1">
              <section className="py-8 lg:pr-6">
                <h2 className="text-2xl font-medium">
                  {i18n[locale].editProgramPage.title}
                </h2>
                {i18n[locale].editProgramPage.description.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-5 text-slate-600 dark:text-slate-400"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            </div>

            <div className="col-span-2 py-6 lg:pl-6">
              <div className="ml-auto max-w-lg rounded-md bg-white p-4 shadow-md dark:bg-slate-950">
                <Form {...form}>
                  <form
                    /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="mb-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="leading-4 ">
                              {
                                i18n[locale].programPage.saveAsFavorite
                                  .textField.label
                              }
                            </FormLabel>
                            <FormControl>
                              <Input
                                id="name-input"
                                placeholder={
                                  i18n[locale].programPage.saveAsFavorite
                                    .textField.placeholder
                                }
                                {...field}
                                onChange={({ target: { value } }) => {
                                  setValues((prev) => ({
                                    ...prev,
                                    name: value,
                                  }));
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

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
                        value={`${values.spin}`}
                        onValueChange={(value) =>
                          setValues((prev) => ({
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
                              {spin}
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
                        value={`${values.temperature}`}
                        onValueChange={(value) =>
                          setValues((prev) => ({
                            ...prev,
                            temperature: Number(value) as AllowedTemperatures,
                          }))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={
                              i18n[locale].programPage.form.temperature
                                .placeholder
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {ALLOWED_TEMPERATURES.map((temp) => (
                            <SelectItem key={temp} value={`${temp}`}>
                              {temp}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {values.temperature >= 70 && (
                        <p className="mt-2 px-1 text-sm text-orange-600">
                          <span className="font-semibold">
                            {locale === "en" ? "Warning" : "Προσοχή"}
                          </span>
                          {`: ${i18n[locale].programPage.form.temperature.warning}`}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-1">
                        {(defaultSpin !== values.spin ||
                          defaultTemperature !== values.temperature ||
                          name !== values.name) && (
                          <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => {
                              setValues(() => ({
                                name,
                                spin: defaultSpin as AllowedSpin,
                                temperature:
                                  defaultTemperature as AllowedTemperatures,
                              }));
                              form.reset();
                            }}
                          >
                            {i18n[locale].programPage.form.undo}
                          </Button>
                        )}
                      </div>
                      <Button
                        className="col-span-1 bg-green-700 text-white hover:bg-green-600"
                        type="submit"
                      >
                        {i18n[locale].editProgramPage.submit}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const programs = await prisma.program.findMany({
    select: { slug: true },
    where: { type: "CUSTOM" },
  });

  return {
    paths: programs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const program = await prisma.program.findUnique({
    where: { slug: params?.slug as string },
  });

  if (!program) return { notFound: true };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...rest } = program;

  return { props: { ...rest } };
};

export default EditCustomProgramPage;
