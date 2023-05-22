import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Error from './pages/Error/Error';
import Room, { RoomLoader } from './pages/Room/Room';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: '/room/:roomId',
      element: <Room />,
      loader: RoomLoader,
    },
  ]);
  return (
    <div className="h-screen">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
