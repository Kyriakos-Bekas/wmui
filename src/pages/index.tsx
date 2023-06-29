import { type NextPage } from "next";
import { ListItem, Loader } from "~/components";
import { i18n } from "~/i18n";
import { useLocaleStore } from "~/state/locale";
import { api } from "~/utils/api";

type SectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Section = ({ title, description, children }: SectionProps) => (
  <section className="mb-8 max-w-md lg:mb-0">
    <h2 className="text-2xl font-semibold">{title}</h2>
    <p className="mt-3 text-slate-600 dark:text-slate-400">{description}</p>
    <div className="mt-6">{children}</div>
  </section>
);

const Home: NextPage = () => {
  const locale = useLocaleStore((state) => state.locale);
  const { data: favorites, isLoading: isLoadingFavorites } =
    api.program.getAll.useQuery({
      type: "CUSTOM",
    });
  const { data: defaults, isLoading: isLoadingDefaults } =
    api.program.getAll.useQuery({
      type: "DEFAULT",
    });

  return (
    <div className="container">
      <main>
        <h1 className="mt-8 text-2xl font-bold lg:text-4xl">
          {locale === "en"
            ? "Washing Machine UI App"
            : "Διεπαφή Χρήστη για Πλυντήριο Ρούχων"}
        </h1>

        <div className="my-8 flex w-full flex-wrap items-start justify-between gap-8">
          <Section
            title={i18n[locale].homepage.favorites.title}
            description={i18n[locale].homepage.favorites.description}
          >
            {!!favorites?.length ? (
              <ul className="mt-8">
                {favorites.map((program) => (
                  <ListItem key={program.id} program={program} />
                ))}
              </ul>
            ) : isLoadingFavorites ? (
              <Loader />
            ) : (
              <p className="mt-12 text-center text-sm text-slate-600 dark:text-slate-400 lg:mt-28">
                {i18n[locale].homepage.favorites.empty}
              </p>
            )}
          </Section>

          <Section
            title={i18n[locale].homepage.presets.title}
            description={i18n[locale].homepage.presets.description}
          >
            {!!defaults?.length ? (
              <ul className="mt-8">
                {defaults.map((program) => (
                  <ListItem key={program.id} program={program} />
                ))}
              </ul>
            ) : isLoadingDefaults ? (
              <Loader />
            ) : (
              <p className="mt-12 text-center text-sm text-red-600 dark:text-red-400 lg:mt-28">
                {i18n[locale].homepage.presets.empty}
              </p>
            )}
          </Section>
        </div>
      </main>
    </div>
  );
};

export default Home;
