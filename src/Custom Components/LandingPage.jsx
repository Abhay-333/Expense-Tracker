import React from 'react';
import SideNav from './SideNav';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className='min-h-screen w-full flex flex-col'>
      <div className='flex flex-1'>
        <SideNav />
        <main className='flex-1 flex flex-col'>
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default LandingPage
