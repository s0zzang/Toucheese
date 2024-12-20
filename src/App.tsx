import { Global, ThemeProvider } from '@emotion/react';
import GlobalStyles from '@styles/GlobalStyles';
import variables from '@styles/Variables';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '@components/Error/ErrorBoundary.tsx';
import { Suspense } from 'react';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={variables}>
        <Global styles={GlobalStyles} />
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<div>문제가 발생했습니다.</div>}>
            <Suspense fallback={<div>로딩 중.. 서스펜스 버전</div>}>
              <RouterProvider router={router} />
            </Suspense>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
