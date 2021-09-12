import Head from "next/head";

import Landing from "../components/Landing";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wave Portal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Landing />
    </div>
  );
}
