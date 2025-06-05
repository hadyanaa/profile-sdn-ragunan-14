import React from 'react';
import Header from './Header';
import Footer from './Footer';


export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header/>

      {/* Body: sidebar + main content */}
      <div className="flex flex-1">
        {/* Main content */}
        <main className="flex-1 p-6 bg-whiteprime">
          {children}
        </main>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
