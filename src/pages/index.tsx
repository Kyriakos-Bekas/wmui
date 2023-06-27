import { type NextPage } from "next";
import { Button } from "~/components/ui";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, refetch, isFetching } = api.example.getAll.useQuery(undefined, {
    enabled: false,
  });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-6 text-4xl font-bold">Washing Machine UI App</h1>

        <div>
          <Button onClick={() => void refetch()}>
            Click me to fetch examples
          </Button>
        </div>

        {isFetching ? (
          <p className="mt-8 text-center">Loading...</p>
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
