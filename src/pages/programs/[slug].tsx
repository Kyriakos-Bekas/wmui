import { type Program } from "@prisma/client";
import { type GetStaticPaths, type GetStaticProps } from "next";
import Head from "next/head";
import { memo, useEffect, useState } from "react";
import { Button, Checkbox, Input, Label, useToast } from "~/components/ui";
import { i18n } from "~/i18n";
import { prisma } from "~/server/db";
import { useLocaleStore } from "~/state/locale";
import {
  type AllowedSpin,
  type AllowedTemperatures,
  DEFAULT_WASHING_PROGRAMS,
} from "~/utils/types";
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
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useActiveProgramStore } from "~/state/activeProgram";

const Header = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-between border-b border-b-slate-200 py-4 dark:border-b-slate-800">
      <h1 className="text-3xl font-semibold">{name}</h1>
    </div>
  );
};

const HeaderMemoized = memo(Header);

const SaveAsFavoriteForm = () => {
  const locale = useLocaleStore((state) => state.locale);
  const localizedSchema = saveAsFavoriteNameformSchema[locale];
  const form = useForm<z.infer<typeof localizedSchema>>({
    resolver: zodResolver(localizedSchema),
    defaultValues: { name: "" },
  });
  const router = useRouter();
  const { temperature } = useActiveProgramStore();
  const { spin } = useActiveProgramStore();
  const { toast } = useToast();
  const { mutate } = api.program.createCustom.useMutation({
    onSuccess: ({ name }) => {
      toast({
        title: i18n[locale].programPage.saveAsFavorite.textField.toast.title,
        description:
          i18n[locale].programPage.saveAsFavorite.textField.toast.description(
            name
          ),
        className:
          "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200",
      });
      void router.push("/");
    },
  });

  function onSubmit(values: z.infer<typeof localizedSchema>) {
    console.log(values);
    mutate({
      name: values.name,
      spin,
      temperature,
    });
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-rows-2 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="leading-4">
                  {i18n[locale].programPage.saveAsFavorite.textField.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={
                      i18n[locale].programPage.saveAsFavorite.textField
                        .placeholder
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="justify-self-end bg-green-700 text-white hover:bg-green-600"
          >
            {i18n[locale].programPage.saveAsFavorite.textField.button}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const SaveAsFavorite = () => {
  const locale = useLocaleStore((state) => state.locale);
  const [saveAsFavorite, setSaveAsFavorite] = useState(false);

  return (
    <section className="border-t border-t-slate-200 py-8 dark:border-slate-800 lg:pr-6">
      <p className="text-slate-600 dark:text-slate-400">
        {i18n[locale].programPage.saveAsFavorite.prompt}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Checkbox
          id="save-as-favorite"
          checked={saveAsFavorite}
          onCheckedChange={(checked) => setSaveAsFavorite(Boolean(checked))}
        />
        <Label htmlFor="save-as-favorite">
          {i18n[locale].programPage.saveAsFavorite.checkbox}
        </Label>
      </div>

      {saveAsFavorite && (
        <div className="mt-6 border-t border-t-slate-200 pt-4 dark:border-slate-800">
          <SaveAsFavoriteForm />
        </div>
      )}
    </section>
  );
};

const ProgramPage = ({
  name: nameOriginal,
  type,
  slug,
  spin: defaultSpin,
  temperature: defaultTemperature,
}: Program) => {
  const locale = useLocaleStore((state) => state.locale);
  const name =
    type === "DEFAULT"
      ? DEFAULT_WASHING_PROGRAMS.find((p) => p.slug === slug)?.name[locale] ||
        nameOriginal
      : nameOriginal;
  const [defaultValues, setDefaultValues] = useState({
    spin: defaultSpin as AllowedSpin,
    temperature: defaultTemperature as AllowedTemperatures,
  });
  const { setActiveProgram, ...rest } = useActiveProgramStore();

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
    setActiveProgram({ ...rest, ...defaultValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

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
              {(defaultSpin !== defaultValues.spin ||
                defaultTemperature !== defaultValues.temperature) && (
                <SaveAsFavorite />
              )}
            </div>

            <div className="col-span-2 py-6 lg:pl-6">
              <form className="ml-auto max-w-lg rounded-md bg-white p-4 shadow-md dark:bg-slate-800">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() =>
                      setDefaultValues((prev) => ({
                        ...prev,
                        spin: (prev.spin - 100) as AllowedSpin,
                      }))
                    }
                  >
                    Click to modify
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      setDefaultValues(() => ({
                        spin: defaultSpin as AllowedSpin,
                        temperature: defaultTemperature as AllowedTemperatures,
                      }))
                    }
                  >
                    Click to revert
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="mt-4 w-full bg-green-700 text-white hover:bg-green-600"
                  size="lg"
                >
                  {i18n[locale].programPage.form.submit}
                </Button>
              </form>
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
  });

  return {
    paths: programs.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const program = await prisma.program.findUnique({
    where: {
      slug: params?.slug as string,
    },
  });

  if (!program) return { notFound: true };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...rest } = program;

  return { props: { ...rest } };
};

export default ProgramPage;
