import { type NextPage } from "next";
import Head from "next/head";
import ResourceTable from "~/components/ResourceTable";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  
  //const query = api.auditoryResource.getAll.useQuery();
  //console.log(query.data);

  return (
    <>
      <Head>
        <title>ATR</title>
        <meta name="description" content="University of Iowa Center for Auditory Training Resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>under construction</h1>
        <ResourceTable />
      </main>
    </>
  );
};

export default Home;
