import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>ATR</title>
        <meta name="description" content="University of Iowa Center for Auditory Training Resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="p-2">
          <h1 className="mx-auto text-center font-extrabold text-4xl max-w-lg text-neutral-600">Welcome to the Resource Center for Auditory Training!</h1>
        </div>
      </main>
    </>
  );
};

export default Home;
