import Head from "next/head";
import { VideoPlayer } from "~/components";
import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";

const HelpPage = () => {
  const locale = useLocaleStore((state) => state.locale);

  return (
    <>
      <Head>
        <title>{`${i18n[locale].app.title} | ${i18n[locale].helpPage.meta.title}`}</title>
      </Head>

      <main className="container flex items-start py-8">
        <div className="mx-auto mt-12 flex flex-wrap items-center lg:max-w-xl lg:gap-12">
          <div className="grow">
            <h1 className="text-2xl font-semibold">
              {i18n[locale].helpPage.title}
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              {i18n[locale].helpPage.description}
            </p>
          </div>

          <section className="grow py-8">
            <VideoPlayer />
          </section>
        </div>
      </main>
    </>
  );
};

export default HelpPage;
