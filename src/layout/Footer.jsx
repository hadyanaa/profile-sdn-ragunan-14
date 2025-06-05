export default function Footer() {
   return(
      <>
      <footer className="text-gray-300">
         <div className="flex flex-row gap-16 bg-gray-700 px-28 py-4">
            <div>
               <h1 className="flex content-center my-auto text-xl font-medium font-jakarta text-whiteprime">
                  <span className='text-[#FF9100] font-bold'>SDN</span>
                  <span className='ml-1'>Ragunan 14 Pagi</span>
               </h1>
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
               <p>Jalan Ragunan Raya</p>
            </div>
         </div>

         <div className="bg-gray-800 p-4 text-center">
         © 2025 My Website. All rights reserved.
         </div>
      </footer>
      </>
   );
};