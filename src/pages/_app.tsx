import '@/styles/globals.scss';
import '@/styles/app.scss';
import '@/styles/header.scss';
import '@/styles/about.scss';
import '@/styles/projects.scss';
import '@/styles/skills.scss';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import LoadingScreen from '@/components/Loader';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : ''
  );

  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {

    setTimeout(() => {
      setAppLoaded(true);
    }, 6000);
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <Box className={`App ${theme}`}>
        {appLoaded ? <Component {...pageProps} /> : <LoadingScreen />}
      </Box>
    </QueryClientProvider>

  );
}
