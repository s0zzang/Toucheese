import ReservationCheck from '@pages/Reservation/ReservationCheck';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('@pages/Home/Home'));
const Search = lazy(() => import('@pages/search/Search'));
const SearchResults = lazy(() => import('@pages/search/SearchResult'));
const StudioMain = lazy(() => import('@pages/Studio/StudioMain/StudioMain'));
const StudioMenu = lazy(() => import('@pages/Studio/StudioMenu/StudioMenu'));
const StudioMenuDetail = lazy(() => import('@pages/Studio/StudioMenu/StudioMenuDetail'));
const StudioPortfolio = lazy(() => import('@pages/Studio/StudioPortfolio/StudioPortfolio'));
const StudioReview = lazy(() => import('@pages/Studio/StudioReview/StudioReview'));
const StudioReviewPhotos = lazy(() => import('@pages/Studio/StudioReview/StudioReviewPhotos'));
const Login = lazy(() => import('@pages/User/Login'));
const SignUp = lazy(() => import('@pages/User/SignUp'));
const MyPage = lazy(() => import('@pages/User/MyPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: 'user',
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ],
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
      {
        path: 'reserve',
        element: <ReservationCheck />,
      },
    ],
  },
]);

export default router;
