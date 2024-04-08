import { PostList } from 'pages/components/PostList';
import { useEffect, type FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { fetchPosts } from 'store/posts';

const ROUTER = createBrowserRouter([
  {
    path: '/',
    element: <PostList />,
  },
]);

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // wait no location, pre-fetch data
    const promise = dispatch(fetchPosts());
    return () => promise.abort();
  }, [dispatch]);

  return <RouterProvider router={ROUTER} />;
};
