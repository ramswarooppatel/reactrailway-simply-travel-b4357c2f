
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AnimatedTransition from './AnimatedTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatedTransition>
          {children}
        </AnimatedTransition>
      </main>
    </div>
  );
};

export default Layout;
