import { type NextPage } from "next";
import { Button } from "~/components/ui";
import { useLocaleStore } from "~/state/locale";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, refetch, isFetching } = api.example.getAll.useQuery(undefined, {
    enabled: false,
  });
  const locale = useLocaleStore((state) => state.locale);

  return (
    <>
      <main className="flex h-full flex-col items-center justify-center">
        <h1 className="mb-6 text-2xl font-bold lg:text-4xl">
          {locale === "en"
            ? "Washing Machine UI App"
            : "Διεπαφή Χρήστη για Πλυντήριο Ρούχων"}
        </h1>

        <div>
          <Button onClick={() => void refetch()}>
            {locale === "en"
              ? "Click me to fetch examples"
              : "Πατήστε με για να φέρετε παραδείγματα"}
          </Button>
        </div>

        {isFetching ? (
          <p className="mt-8 text-center">
            {locale === "en" ? "Loading..." : "Φόρτωση..."}
          </p>
        ) : (
          data && (
            <ul className="mt-8">
              {data.map((example) => (
                <li key={example.id}>{example.id}</li>
              ))}
            </ul>
          )
        )}
      </main>
    </>
  );
};

export default Home;
