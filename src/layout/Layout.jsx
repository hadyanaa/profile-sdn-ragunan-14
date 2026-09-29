import React from 'react';
import Header from './Header';
import Footer from './Footer';
import FloatingPengaduan from '../components/FloatingPengaduan';


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

      {/* Floating Pengaduan Button */}
      <FloatingPengaduan />
    </div>
  );
}
