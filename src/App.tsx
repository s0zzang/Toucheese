import { Global, ThemeProvider } from '@emotion/react';
import GlobalStyles from '@styles/GlobalStyles';
import variables from '@styles/Variables';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

function App() {
  return (
    // SEO 최적화를 위해 HelmetProvider 적용
    <HelmetProvider>
      <ThemeProvider theme={variables}>
        <Global styles={GlobalStyles} />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
