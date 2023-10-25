import Head from 'next/head'
import Layout from './layout';
import { Header, About, Projects, Skills, Contact, Footer } from '@/container';
import NavBar from '@/components/NavBar';

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
        <NavBar/>
        <Header />
        <About />
        <Projects/>
        <Skills/>
        <Contact/>
        <Footer/>
      </Layout>
    </>
  )
}
