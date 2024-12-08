import Home from '@pages/Home/Home';
import Search from '@pages/search/Search';
import SearchResults from '@pages/search/SearchResult';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'search',
    element: <Search />,
  },
  {
    path: 'search/results',
    element: <SearchResults />,
  },
]);

export default router;
