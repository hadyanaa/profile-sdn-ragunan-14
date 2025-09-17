import { useEffect, useRef, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';


export default function Header() {
   const location = useLocation();
   const homePath = "/";
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
         setIsScrolled(window.scrollY > 800);
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
   }, []);

   const styleMenu = "hover:text-primaryoren hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
   const styleSubMenu = "block px-4 py-2 hover:bg-mainblue rounded-md cursor-pointer z-50 hover:text-primaryoren hover:scale-105 hover:shadow-lg transition-all duration-300"
   const styleSubMenuActive = "bg-mainblue rounded-md cursor-pointer z-50 text-primaryoren scale-105shadow-lg transition-all duration-300"

   return(
      <>
         <header className={`fixed top-0 z-50 w-full flex flex-row justify-between text-whiteprime py-4 px-10 lg:px-28 
            ${location.pathname === homePath ? isScrolled ?  'scrolled-header' : 'backdrop-blur-2xl' : 'scrolled-header' }
            `}>
            <div className='flex content-center items-center my-auto gap-2'>
               {/* <img src="/assets/image/dki-jakarta-logo.jpg" alt="Logo Jaya Raya" className='w-auto h-8' /> */}
               <img src="/assets/image/logo-kawan-belajar-bged.png" alt="Logo Kawan Belajar" className='w-auto h-8' />
               <h1 className="text-xl font-medium font-jakarta">
                  <span className='text-primaryoren font-bold'>SDN</span>
                  <span className='ml-1'>Ragunan 14 Pagi</span>
               </h1>
            </div>
            <nav className='hidden lg:block'>
               <ul className="flex flex-row space-y-2 gap-6">
               <li className={`${styleMenu} ${location.pathname === '/' ? 'text-primaryoren' : ''}`}>
                  <Link to="/">Beranda</Link>
               </li>
               {/* <li className='hover:text-primaryoren'>
                  <Link to="/artikel">Artikel</Link>
               </li> */}
               <li>
                  <div className='relative' ref={dropdownRefProfile}>
                     <button
                        onClick={toggleDropdownProfile}
                        className={`${styleMenu} ${location.pathname.startsWith('/profile'+'/') ? 'text-primaryoren' : ''} focus:outline-none cursor-pointer`}
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
                           <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded-md z-50">
                              <Link to="/profile/tentang-sekolah" className={`${styleSubMenu} ${location.pathname === "/profile/tentang-sekolah" ? styleSubMenuActive : "" }`}>Tentang Sekolah</Link>
                              <Link to="/profile/visi-misi-tujuan" className={`${styleSubMenu} ${location.pathname === "/profile/visi-misi-tujuan" ? styleSubMenuActive : "" }`}>Visi, Misi dan Tujuan</Link>
                              <Link to="/profile/sdm-sekolah" className={`${styleSubMenu} ${location.pathname === "/profile/sdm-sekolah" ? styleSubMenuActive : "" }`}>SDM Sekolah</Link>
                              <Link to="/profile/statistik-siswa" className={`${styleSubMenu} ${location.pathname === "/profile/statistik-siswa" ? styleSubMenuActive : "" }`}>Statistik Siswa</Link>
                              <Link to="/profile/prestasi-sekolah" className={`${styleSubMenu} ${location.pathname === "/profile/prestasi-sekolah" ? styleSubMenuActive : "" }`}>Prestasi Sekolah</Link>
                              <Link to="/profile/ekstrakurikuler" className={`${styleSubMenu} ${location.pathname === "/profile/ekstrakurikuler" ? styleSubMenuActive : "" }`}>Ekstrakurikuler</Link>
                           </div>
                        )
                     }

                  </div>
               </li>
               <li>
                  <div className='relative' ref={dropdownRefInformasi}>
                  <button
                        onClick={toggleDropdownInformasi}
                        className={`${styleMenu} ${location.pathname.startsWith('/informasi'+'/') ? 'text-primaryoren' : ''} focus:outline-none cursor-pointer`}
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
                              <Link to="/informasi/agenda" className={`${styleSubMenu} ${location.pathname === "/informasi/agenda" ? styleSubMenuActive : "" }`}>Agenda</Link>
                              <Link to="/informasi/pengumuman" className={`${styleSubMenu} ${location.pathname === "/informasi/pengumuman" ? styleSubMenuActive : "" }`}>Pengumuman</Link>
                           </div>
                        )
                     }
                  </div>
               </li>
               <li className={`${styleMenu}`}>
                  <Link to="/contact">Contact</Link>
               </li>
               </ul>
            </nav>
         </header>
      </>
   );
};
