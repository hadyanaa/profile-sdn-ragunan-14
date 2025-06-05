import { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';


export default function Header() {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef(null);

   const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
         setIsDropdownOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   return(
      <>
         <header className="flex flex-row justify-between bg-main text-whiteprime py-4 px-28">
            <h1 className="flex content-center my-auto text-xl font-medium font-jakarta">
               <span className='text-[#FF9100] font-bold'>SDN</span>
               <span className='ml-1'>Ragunan 14 Pagi</span>
            </h1>
            <nav>
               <ul className="flex flex-row space-y-2 gap-4">
               <li className='hover:opacity-60'>
                  <Link to="/">Beranda</Link>
               </li>
               <li>
                  <div className='relative' ref={dropdownRef}>
                     <button
                        onClick={toggleDropdown}
                        className='hover:opacity-60 focus:outline-none cursor-pointer'
                     >
                        Profil

                     </button>
                     {
                        isDropdownOpen && (
                           <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md z-50">
                              <Link to="/about" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Visi Misi</Link>
                              <Link to="/about" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Prestasi</Link>
                              <Link to="/about" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Ekstrakurikuler</Link>
                              <Link to="/about" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Guru dan Staf</Link>
                              <Link to="/about" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Fasilitas</Link>
                           </div>
                        )
                     }

                  </div>
               </li>
               <li className='hover:opacity-60'>
                  <Link to="/services">Services</Link>
               </li>
               <li className='hover:opacity-60'>
                  <Link to="/contact">Contact</Link>
               </li>
               </ul>
            </nav>
         </header>
      </>
   );
};
