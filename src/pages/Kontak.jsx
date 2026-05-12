import InstagramFeed from "../components/InstagramFeed";
import LogoSD from "../components/LogoSD";

export default function Kontak() {
   return(
      <>
         <LogoSD titlePage="Kontak" isTitlePage />
         <div className="page-shell page-stack">
         <div className="section-heading !mb-0">
            <div>
               <p className="section-eyebrow">Platform sekolah</p>
               <h2>Cek juga platform sekolah kami yang lain</h2>
            </div>
         </div>
         <div className="grid grid-cols-1 gap-4 text-white sm:grid-cols-2">
            <div className="info-card flex min-h-44 flex-row gap-4 p-5 opacity-0 animate-fadeIn">
               <img src="/assets/image/instagram.png" alt="Logo Instagram" className="my-auto h-auto w-20 rounded-lg bg-white p-2 shadow-sm" />
               <div className="flex flex-col justify-center gap-2 text-left">
                  <h2 className="w-full text-xl font-extrabold text-mainblue">Instagram</h2>
                  <p className="w-full text-lg font-semibold text-slate-600">@sdnragunan14</p>
                  <button
                     onClick={()=>window.open("https://instagram.com/sdnragunan14", "_blank")}
                     className="brand-button brand-button--compact w-fit cursor-pointer"
                     >
                     Kunjungi
                  </button>
               </div>
            </div>
            <div className="info-card flex min-h-44 flex-row gap-4 p-5 opacity-0 animate-fadeIn">
               <img src="/assets/image/youtube.png" alt="Logo Youtube" className="my-auto h-auto w-20 rounded-lg bg-white p-2 shadow-sm" />
               <div className="flex flex-col justify-center gap-2 text-left">
                  <h2 className="w-full text-xl font-extrabold text-mainblue">YouTube</h2>
                  <p className="w-full text-lg font-semibold text-slate-600">@sdnragunan14pagi</p>
                  <button
                     onClick={()=>window.open("https://www.youtube.com/@sdnragunan14pagi", "_blank")}
                     className="brand-button brand-button--compact w-fit cursor-pointer"
                     >
                     Kunjungi
                  </button>
               </div>
            </div>
         </div>
         <div className="section-heading !mb-0">
            <div>
               <p className="section-eyebrow">Bantuan</p>
               <h2>Butuh bantuan? Hubungi Operator Sekolah kami</h2>
            </div>
         </div>
         <div className="panel-card-blue flex min-h-44 text-center opacity-0 animate-fadeIn">
            <h2 className="m-auto text-lg font-semibold">Future Development</h2>
         </div>
         </div>
      </>
   ) 
}
