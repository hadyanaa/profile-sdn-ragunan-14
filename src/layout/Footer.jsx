export default function Footer() {
   return(
      <>
      <footer className="w-full text-gray-300">
         <div className="flex flex-row gap-16 scrolled-header px-28 py-4">
            <div>
               <div className='flex content-center items-center gap-2'>
                  <img src="/assets/image/logo-kawan-belajar-bged.png" alt="Logo Kawan Belajar" className='w-auto h-8' />
                  <h1 className="text-xs lg:text-xl font-medium font-jakarta text-whiteprime">
                     <span className='text-primaryoren font-bold'>SDN</span>
                     <span className='ml-1'>Ragunan 14 Pagi</span>
                  </h1>
               </div>
               <p>SDN Ragunan 14 Pagi berkomitmen untuk memberikan pendidikan terbaik bagi anak-anak Ragunan dan sekitarnya.</p>
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
         © 2025 My Website. All rights reserved.
         </div>
      </footer>
      </>
   );
};