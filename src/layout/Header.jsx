import { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';


export default function Header() {
   const [isDropdownProfileOpen, setIsDropdownProfileOpen] = useState(false);
   const [isDropdownInformasiOpen, setIsDropdownInformasiOpen] = useState(false);
   const dropdownRefProfile = useRef(null);
   const dropdownRefInformasi = useRef(null);

   const toggleDropdownProfile = () => setIsDropdownProfileOpen(prev => !prev);
   const toggleDropdownInformasi = () => setIsDropdownInformasiOpen(prev => !prev);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRefProfile.current && !dropdownRefProfile.current.contains(event.target)) {
         setIsDropdownProfileOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRefInformasi.current && !dropdownRefInformasi.current.contains(event.target)) {
         setIsDropdownInformasiOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
      const onScroll = () => {
         console.log("ScrollY:", window.scrollY)
         setIsScrolled(window.scrollY > 800);
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   return(
      <>
         <header className={`fixed top-0 z-50 w-full flex flex-row justify-between text-whiteprime py-4 px-28 ${isScrolled ? 'scrolled' : 'backdrop-blur-2xl' }`}>
            <div className='flex content-center items-center my-auto gap-2'>
               {/* <img src="/assets/image/dki-jakarta-logo.jpg" alt="Logo Jaya Raya" className='w-auto h-8' /> */}
               <img src="/assets/image/logo-kawan-belajar-bged.png" alt="Logo Kawan Belajar" className='w-auto h-8' />
               <h1 className="text-xl font-medium font-jakarta">
                  <span className='text-primaryoren font-bold'>SDN</span>
                  <span className='ml-1'>Ragunan 14 Pagi</span>
               </h1>
            </div>
            <nav>
               <ul className="flex flex-row space-y-2 gap-6">
               <li className='hover:opacity-60'>
                  <Link to="/">Beranda</Link>
               </li>
               <li className='hover:opacity-60'>
                  <Link to="/artikel">Artikel</Link>
               </li>
               <li>
                  <div className='relative' ref={dropdownRefProfile}>
                     <button
                        onClick={toggleDropdownProfile}
                        className='hover:opacity-60 focus:outline-none cursor-pointer'
                     >
                        <div className='flex flex-row items-center gap-2'>
                           <p>
                              Profil
                           </p>
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"
                              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                           </svg>
                        </div>

                     </button>
                     {
                        isDropdownProfileOpen && (
                           <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md z-50">
                              <Link to="/profile/visi-misi" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Visi Misi</Link>
                              <Link to="/profile/tentang" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Tentang Sekolah</Link>
                              <Link to="/profile/staf-guru" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Staf Guru</Link>
                              <Link to="/profile/staf-tendik" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Staf Tenaga Kependidikan</Link>
                              <Link to="/profile/prestasi" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Prestasi</Link>
                              <Link to="/profile/ekskul" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Ekstrakurikuler</Link>
                              <Link to="/profile/fasilitas" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Fasilitas</Link>
                           </div>
                        )
                     }

                  </div>
               </li>
               <li>
                  <div className='relative' ref={dropdownRefInformasi}>
                  <button
                        onClick={toggleDropdownInformasi}
                        className='hover:opacity-60 focus:outline-none cursor-pointer'
                     >
                        <div className='flex flex-row items-center gap-2'>
                           <p>
                              Informasi
                           </p>
                           <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
                              viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                           </svg>
                        </div>

                     </button>
                     {
                        isDropdownInformasiOpen && (
                           <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md z-50">
                              <Link to="/informasi/agenda" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Agenda</Link>
                              <Link to="/informasi/pengumuman" className='block px-4 py-2 hover:bg-secondary rounded-md cursor-pointer z-50'>Pengumuman</Link>
                           </div>
                        )
                     }
                  </div>
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
