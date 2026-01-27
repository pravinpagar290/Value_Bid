import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import SideBar from './sideBar';
import { useState } from 'react';
const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
      </div>
      <SideBar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
