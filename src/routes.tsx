import Home from '@pages/Home/Home';
import Search from '@pages/search/Search';
import SearchResults from '@pages/search/SearchResult';
import StudioDimTest from '@pages/Studio/StudioDimTest';
import StudioMain from '@pages/Studio/StudioMain/StudioMain';
import StudioMenu from '@pages/Studio/StudioMenu/StudioMenu';
import StudioMenuDetail from '@pages/Studio/StudioMenu/StudioMenuDetail';
import StudioPortfolio from '@pages/Studio/StudioPortfolio/StudioPortfolio';
import StudioReview from '@pages/Studio/StudioReview/StudioReview';
import StudioReviewPhotos from '@pages/Studio/StudioReview/StudioReviewPhotos';
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
      {
        path: 'menu',
        children: [
          { index: true, element: <StudioMenu /> },
          { path: ':_menuId', element: <StudioMenuDetail /> },
        ],
      },
      { path: 'portfolio', element: <StudioPortfolio /> },
      // 추후 삭제 예정
      { path: 'dimtest', element: <StudioDimTest /> },
      {
        path: 'review',
        children: [
          {
            index: true,
            element: <StudioReview />,
          },
          { path: 'photos', element: <StudioReviewPhotos /> },
        ],
      },
    ],
  },
]);

export default router;
