import Home from '@pages/Home/Home';
import ReviewPage from '@pages/reviews/ReviewPage';
import Search from '@pages/search/Search';
import SearchResults from '@pages/search/SearchResult';
import StudioMain from '@pages/Studio/StudioMain/StudioMain';
import StudioMenu from '@pages/Studio/StudioMenu/StudioMenu';
import StudioPortfolio from '@pages/Studio/StudioPorfolio/StudioPortfolio';
import StudioReview from '@pages/Studio/StudioReview/StudioReview';
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
  {
    path: 'studio/:_id',
    children: [
      { index: true, element: <StudioMain /> },
      { path: 'menu', element: <StudioMenu /> },
      { path: 'portfolio', element: <StudioPortfolio /> },
      { path: 'review', element: <StudioReview /> },
    ],
  },
]);

export default router;
