import { PostsPage } from 'pages/PostsPage/PostsPage';
import { useEffect, type FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { fetchPosts, fetchUsers, useAppDispatch } from 'store';

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <PostsPage />,
  },
]);

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // wait no location, pre-fetch data
    const postsPromise = dispatch(fetchPosts());
    const usersPromise = dispatch(fetchUsers());
    return () => {
      postsPromise.abort();
      usersPromise.abort();
    };
  }, [dispatch]);

  return <RouterProvider router={ROUTER} />;
};
