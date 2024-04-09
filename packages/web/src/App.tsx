import { CommentariesPage } from 'pages/CommentariesPage';
import { PostsPage, PostsPageMobile } from 'pages/PostsPage';
import { PageLayout } from 'pages/components/PageLayout';
import { useEffect, type FC } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { fetchPosts, fetchUsers, useAppDispatch } from 'store';

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        path: '/posts',
        element: <PostsPage />,
        children: [
          {
            path: '/posts/:id/commentaries',
            element: <CommentariesPage />,
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/posts" />,
      },
    ],
  },
]);

const ROUTER_MOBILE = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        path: '/posts',
        element: <PostsPageMobile />,
      },
      {
        path: '/posts/:id/commentaries',
        element: <CommentariesPage />,
      },
      {
        path: '*',
        element: <Navigate to="/posts" />,
      },
    ],
  },
]);

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // wait no location, pre-fetch data
    const postsPromise = dispatch(fetchPosts());
    const usersPromise = dispatch(fetchUsers());
    return () => {
      postsPromise.abort();
      usersPromise.abort();
    };
  }, [dispatch]);

  return <RouterProvider router={isMobile ? ROUTER_MOBILE : ROUTER} />;
};
