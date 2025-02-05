import { Global, ThemeProvider } from '@emotion/react';
import GlobalStyles from '@styles/GlobalStyles';
import variables from '@styles/Variables';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '@components/Error/ErrorBoundary.tsx';
import { Suspense, useDeferredValue, useEffect, useState } from 'react';
import Toast from '@components/Toast/Toast.tsx';
import Loading from '@components/Loading/Loading.tsx';

const queryClient = new QueryClient();

function App() {
  const [isReady, setIsReady] = useState(false);
  const deferredReady = useDeferredValue(isReady);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <ThemeProvider theme={variables}>
        <Global styles={GlobalStyles} />
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<div>문제가 발생했습니다.</div>}>
            <Suspense fallback={<Loading />}>
              {!deferredReady ? (
                <Loading size="big" phrase="세상의 모든 사진관, 터치즈" />
              ) : (
                <RouterProvider router={router} />
              )}
              <Toast />
            </Suspense>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
