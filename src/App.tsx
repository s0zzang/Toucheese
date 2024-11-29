import { Global, ThemeProvider } from '@emotion/react';
import GlobalStyles from '@styles/GlobalStyles';
import variables from '@styles/Variables';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';

function App() {
  return (
    <ThemeProvider theme={variables}>
      <Global styles={GlobalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
