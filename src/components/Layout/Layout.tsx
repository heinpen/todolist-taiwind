import React, { FC, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout, selectUser } from '../../redux/auth/auth-slice';

interface LayoutProps {
  name?: string;
  children?: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ name, children }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogout = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {name || 'Workplace'}
          </h1>
          {/*    user name and logout button */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-500 mr-2">{user.username}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
