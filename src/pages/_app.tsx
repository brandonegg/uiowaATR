import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Head from "next/head";
import { env } from "~/env.mjs";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>ATR</title>
        <meta
          name="description"
          content="University of Iowa Center for Auditory Training Resources"
        />
        <link rel="icon" href="/favicon.ico" />
        {env.NEXT_PUBLIC_ENVIRONMENT === "production" ? (
          <>
            <script
              defer
              data-domain="auditorytraining.info"
              src="https://analytics.brandonegger.com/js/script.js"
            ></script>
          </>
        ) : null}
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
