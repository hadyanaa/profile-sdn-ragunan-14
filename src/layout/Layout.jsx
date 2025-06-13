import React from 'react';
import Header from './Header';
import Footer from './Footer';


export default function Layout({ children }) {
  return (
    <div className="flex flex-col bg-whiteprime min-h-screen">
      {/* Header */}
      <Header/>
        {/* Main content */}
        <main className='flex-1'>
          {children}
        </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
