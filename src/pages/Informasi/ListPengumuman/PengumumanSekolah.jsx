import { useEffect, useState } from "react";
import { Card, CardMedia, Chip, Skeleton } from "@mui/material";
import { useAppStore } from "../../../store/useAppStore";
import convertDriveUrl from "../../../functions/DriveImage";

export default function Pengumuman() {
   const { pengumuman, loading, fetchPengumuman } = useAppStore();

   useEffect(() => {
      if (!pengumuman || pengumuman?.length === 0) {
         // hanya fetch kalau data belum ada
         fetchPengumuman();
      }
   }, []);

   console.log(pengumuman)


   const [kategoriFilter, setKategoriFilter] = useState("Semua");
   // const [tingkatFilter, setTingkatFilter] = useState("Semua");

   const kategoriList = ["Semua", "Akademik", "Kesiswaan", "Keagamaan", "Nasional", "Sekolah", "Sosial", "Khusus"];
   // const tingkatList = ["Semua", "Lainnya", "Kecamatan", "Kota", "Provinsi", "Nasional", "Internasional"];

   // Filter data dari API
   const filteredData = pengumuman?.filter((item) => {
      const byKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
      // const byTingkat = tingkatFilter === "Semua" || item.tingkat === tingkatFilter;
      return byKategori;
   }) ?? {};

   return (
      <>
         { loading ? (
            <>
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <img className="w-32 md:w-auto h-auto" src="/assets/video/Rippletransparent.gif" alt="" />
               </div>
            </>
         ) : (
            <></>
         )}
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 mb-4 bg-[url(/assets/image/pattern.png)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div className="col-span-2">
                  <h1 className="font-bold text-left text-lg mb-2">Kategori pengumuman</h1>
                  <div className="flex gap-2 flex-wrap">
                     {kategoriList.map((kategori) => (
                        <button
                        key={kategori}
                        onClick={() => setKategoriFilter(kategori)}
                        className={`px-3 py-1 rounded-full text-sm hover:scale-105 cursor-pointer ${
                           kategoriFilter === kategori
                              ? "bg-gray-700 text-white hover:bg-gray-900"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                        }`}
                        >
                        {kategori}
                        </button>
                     ))}
                  </div>
               </div>

            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            { pengumuman.length > 0 ? 
               filteredData.map((item, index) => (
                  <div
                     key={index}
                     className="rounded-lg w-full h-auto min-h-44 hover:scale-105 transition-all duration-500 ease-in-out transform opacity-0 animate-fadeIn bg-[url(/assets/image/pattern.png)] bg-secondblue text-center"
                  >
                     <div className="relative h-64 overflow-hidden">
                        <img className="rounded-lg border h-full w-full" src={item.foto ? convertDriveUrl(item.foto) : '/assets/image/agenda-no-image.png'} alt={item.peringkat} 
                           onError={(e) => {e.currentTarget.src = "/assets/image/pengumuman-no-image.png";}}/>
                        <div className="absolute right-4 top-4 px-3 py-1 rounded-full text-sm hover:scale-105 bg-gray-700 text-white font-bold">
                           {item.tahun}
                        </div>
                        <div className="absolute left-4 top-4 px-3 py-1 rounded-full text-sm hover:scale-105 bg-gray-100 text-gray-700 font-bold">
                           {item.kategori}
                        </div>
                     </div>
                     <div className="p-6 pt-0">
                        <div className="pt-4">
                           <div className="flex items-center justify-between text-sm">
                              <div className="text-justify w-full">
                                 <h4 className="text-center mb-4 border-b text-lg font-bold text-secondary line-clamp-2">
                                    {item.judul}
                                 </h4>
                                 <p className="font-normal text-white line-clamp-3">
                                    {item.deskripsi}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <p className={`text-sm text-whiteprime`}>{item.status}</p>
                  </div>
               )) :
               Array.from({ length: 4 }).map((_, index) => (
                  <div
                     key={index}
                     className="flex flex-col p-4 items-center"
                     >
                     <Skeleton animation="wave" variant="overlay">
                        <img
                           className="rounded-lg w-auto h-40"
                           alt=""
                           src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                        />
                     </Skeleton>
                  </div>
               ))
            }
         </div>
      </>
   )
}