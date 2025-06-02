import React from 'react';
import { Outlet } from 'react-router';

const AppLayout = () => {
  return (
    <div>
      AppLayout
      sidebar
      <Outlet />
    </div>
  );
};

export default AppLayout;
