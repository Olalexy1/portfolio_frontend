import '@/styles/globals.scss'
import { Container } from '@mui/material';
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(
    // localStorage.getItem('theme') || 'light'
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : ''
  );

  
  return (
    <Container className={`App ${theme}`}>
      <NavBar/>
      <Component {...pageProps} />
    </Container>
  );
}
