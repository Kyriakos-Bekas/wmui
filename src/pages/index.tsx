import { type NextPage } from "next";
import { Button } from "~/components/ui";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Washing Machine UI App</h1>

        <div>
          <Button>{hello.data?.greeting ?? "Loading..."}</Button>
        </div>
      </main>
    </>
  );
};

export default Home;
