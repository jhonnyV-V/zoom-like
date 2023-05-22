import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Header from '@/components/Header/Header';

const Error: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-3/4 items-center justify-center">
        <div className="mt-12 flex flex-col items-center justify-center text-white">
          <h1 className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-4xl font-black text-transparent">
            Oops!
          </h1>
          <p className="mt-3 text-center text-2xl text-white">
            Sorry, an unexpected error has occurred.
          </p>
          {isRouteErrorResponse(error) && (
            <p className="mt-3 text-center text-xl text-white">
              <i>{error?.statusText || error?.data.message}</i>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Error;
