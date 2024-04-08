import type { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const ROUTER = createBrowserRouter([]);

export const App: FC = () => {
  return <RouterProvider router={ROUTER} />;
};
