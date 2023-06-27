import { type AppType } from "next/app";
import Head from "next/head";
import { Navbar, ThemeProvider } from "~/components";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Washing Machine UI App</title>
        <meta
          name="description"
          content="This UI simplifies interacting with your washing machine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="grid min-h-screen grid-rows-app-layout">
          <Navbar />
          <div className="container">
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
