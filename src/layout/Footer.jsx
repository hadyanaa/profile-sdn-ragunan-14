export default function Footer() {
   return(
      <>
      <footer className="w-full text-gray-300">
         <div className="flex flex-col sm:flex-row gap-16 scrolled-header px-8 md:px-28 py-4">
            <div className="flex flex-col gap-4">
               <div className='flex content-center items-center gap-2'>
                  <img src="/assets/image/logo-kawan-belajar-bged.png" alt="Logo Kawan Belajar" className='w-auto h-8' />
                  <h1 className="text-xs lg:text-xl font-medium font-jakarta text-whiteprime">
                     <span className='text-primaryoren font-bold'>SDN</span>
                     <span className='ml-1'>Ragunan 14 Pagi</span>
                  </h1>
               </div>
               <p>SD Negeri Ragunan 14 Pagi merupakan salah satu sekolah dasar negeri 
yang memiliki reputasi baik di lingkungan Kecamatan Pasar Minggu. Sekolah ini 
dikenal aktif dalam mengikuti berbagai program peningkatan mutu pendidikan 
yang diselenggarakan oleh Dinas Pendidikan Provinsi DKI Jakarta. murid 
maupun pendidik kerap meraih prestasi baik di bidang akademik maupun non-
akademik.</p>
            </div>
            <div>
               <h1>Menu Lainnya</h1>
               <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
               </ul>
            </div>
            <div>
               <h1>Alamat Kami</h1>
               <p className="max-w-40">
                  Jl. Kebagusan Raya RT.001/007 
                  Kelurahan Ragunan
                  Kecamatan Pasar Minggu
                  Suku Dinas Pendidikan Wilayah II 
                  Kota Administrasi Jakarta Selatan
               </p>
            </div>
         </div>

         <div className="color-main p-4 pt-12 text-center">
         © 2025 SDN Ragunan 14 Pagi. All rights reserved.
         </div>
      </footer>
      </>
   );
};