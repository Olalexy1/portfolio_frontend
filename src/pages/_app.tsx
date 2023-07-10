import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import LoadingScreen from '@/components/Loader';

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(
    // localStorage.getItem('theme') || 'light'
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : ''
  );

  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {

    setTimeout(()=> {
      setAppLoaded(true);
    }, 6000);
  }, []);

  
  return (
    <Box className={`App ${theme}`}>
      { appLoaded ? <Component {...pageProps} />: <LoadingScreen/>}
    </Box>
  );
}
