import React, { useState } from 'react';
import '@/styles/globals.scss';
import '@/styles/app.scss';
import '@/styles/header.scss';
import '@/styles/about.scss';
import '@/styles/projects.scss';
import '@/styles/skills.scss';
import '@/styles/contact.scss';
import '@/styles/footer.scss';
import '@/styles/project.scss';
import type { AppProps } from 'next/app';
import LoadingScreen from '@/components/Loader';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      setLoading(true)
    }

    const handleRouteChangeComplete = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router.events])

  return <> {loading ? <LoadingScreen /> :
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>} </>
}
