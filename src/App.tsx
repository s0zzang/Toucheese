import { Global, ThemeProvider } from '@emotion/react';
import GlobalStyles from '@styles/GlobalStyles';
import variables from '@styles/Variables';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={variables}>
      <Global styles={GlobalStyles} />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
