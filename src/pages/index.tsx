import Head from 'next/head'
import Layout from './layout';
import { Header, About, Projects, Skills, Contact, Footer } from '@/container';
import NavBar from '@/components/NavBar';
import { StarsCanvas } from "@/components/canvas";
import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Olalekan Ajayi',
//   description: 'Ajayi Olalekan Bamidele Portfolio website',
//   icons: {
//     icon: "/favicon.ico"
//   }
// }

export default function Home() {
  return (
    <section style={{ position: 'relative', zIndex: 0, minHeight: '100vh', padding: '0px' }}>
      <Head>
        <title>Ajayi Olalekan Bamidele</title>
        <meta name="description" content="A passionate Frontend React Developer, Building the Frontend of Web and Mobile Applications that leads to the success of the overall product." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ajayi Olalekan Bamidele" />
        <meta name="keywords" content="Frontend Developer, React Developer, React Native Developer, Web Developer, Fullstack Developer, Mobile Developer, Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StarsCanvas />
      <Layout>
        <NavBar />
        <Header />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </Layout>
    </section>
  )
}
