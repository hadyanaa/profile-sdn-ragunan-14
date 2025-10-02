import InstagramFeed from "../components/InstagramFeed";
import LogoSD from "../components/LogoSD";

export default function Kontak() {
   return(
      <>
         <LogoSD titlePage="Kontak" isTitlePage />
         <div className="my-8 text-center font-bold text-3xl text-mainblue">
            <h1>Cek juga platform sekolah kami yang lain</h1>
         </div>
         <div className="px-4 xs:px-8 sm:px-14 md:px-28 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-white">
            {/* Instagram */}
            <div className="flex flex-row gap-2 rounded-lg w-full h-auto min-h-44  transform opacity-0 animate-fadeIn bg-[url(/assets/image/pattern.png)] bg-secondblue text-center">
               <img src="/assets/image/instagram.png" alt="Logo Instagram" className="mx-1 my-auto w-20 h-auto bg-white rounded-xl" />
               <div className="flex flex-col gap-2 text-left">
                  <h2 className="w-full text-xl font-semibold pt-4 px-4">Instagram</h2>
                  <p className="w-full text-lg font-semibold px-4">@sdnragunan14</p>
                  <button
                     onClick={()=>window.open("https://instagram.com/sdnragunan14", "_blank")}
                     className={`px-3 py-1 rounded-full text-sm hover:scale-105 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-500 ease-in-out`}
                     >
                     Kunjungi
                  </button>
               </div>
            </div>
            {/* YouTube */}
            <div className="flex flex-row gap-2 rounded-lg w-full h-auto min-h-44  transform opacity-0 animate-fadeIn bg-[url(/assets/image/pattern.png)] bg-secondblue text-center">
               <img src="/assets/image/youtube.png" alt="Logo Youtube" className="mx-1 my-auto w-20 h-auto bg-white rounded-xl" />
               <div className="flex flex-col gap-2 text-left">
                  <h2 className="w-full text-xl font-semibold pt-4 px-4">YouTube</h2>
                  <p className="w-full text-lg font-semibold px-4">@sdnragunan14pagi</p>
                  <button
                     onClick={()=>window.open("https://www.youtube.com/@sdnragunan14pagi", "_blank")}
                     className={`px-3 py-1 rounded-full text-sm hover:scale-105 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-500 ease-in-out`}
                     >
                     Kunjungi
                  </button>
               </div>
            </div>
         </div>
         <div className="my-8 text-center font-bold text-3xl text-mainblue">
            <h1>Butuh bantuan? Hubungi Operator Sekolah kami</h1>
         </div>
         <div className="flex mx-4 xs:mx-8 sm:mx-14 md:mx-28 mb-8 rounded-lg  h-auto min-h-44 transition-all duration-500 ease-in-out transform opacity-0 animate-fadeIn bg-[url(/assets/image/pattern.png)] bg-secondblue text-center text-white">
            <h2 className="text-lg font-semibold m-auto">Future Development</h2>
         </div>
      </>
   ) 
}