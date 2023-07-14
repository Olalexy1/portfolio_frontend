import Head from 'next/head'
import Image from 'next/image'
import Layout from './layout';
import { Header, About, Projects } from '@/container';

export default function Home() {
  return (
    <>
      <Head>
        <title>Olalekan Ajayi</title>
        <meta name="description" content="Ajayi Olalekan Bamidele Portfolio website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Header />
        <About />
        <Projects/>
      </Layout>
    </>
  )
}
