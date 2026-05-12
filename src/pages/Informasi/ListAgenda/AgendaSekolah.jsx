import { useEffect, useState } from "react";
import { Card, CardMedia, Chip, Skeleton } from "@mui/material";
import { useAppStore } from "../../../store/useAppStore";
import convertDriveUrl from "../../../functions/DriveImage";

export default function Agenda() {
   const { agenda, loading, fetchAgenda } = useAppStore();

   useEffect(() => {
      if (!agenda || agenda?.length === 0) {
         // hanya fetch kalau data belum ada
         fetchAgenda();
      }
   }, []);

   const [kategoriFilter, setKategoriFilter] = useState("Semua");
   // const [tingkatFilter, setTingkatFilter] = useState("Semua");

   const kategoriList = ["Semua", "Akademik", "Kesiswaan", "Keagamaan", "Nasional", "Sekolah", "Sosial", "Khusus"];
   // const tingkatList = ["Semua", "Lainnya", "Kecamatan", "Kota", "Provinsi", "Nasional", "Internasional"];

   // Filter data dari API
   const filteredData = agenda?.filter((item) => {
      const byKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
      // const byTingkat = tingkatFilter === "Semua" || item.tingkat === tingkatFilter;
      return byKategori;
   }) ?? {};

   return (
      <>
         { loading ? (
            <div className="loading-toast">
               <img className="h-8 w-8" src="/assets/video/Rippletransparent.gif" alt="" />
               <span>Memuat data terbaru...</span>
            </div>
         ) : (
            <></>
         )}
         <div className="filter-panel mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div className="col-span-2">
                  <h1 className="mb-3 text-left text-lg font-bold text-mainblue">Kategori Agenda</h1>
                  <div className="flex gap-2 flex-wrap">
                     {kategoriList.map((kategori) => (
                        <button
                        key={kategori}
                        onClick={() => setKategoriFilter(kategori)}
                        className={`filter-chip ${
                           kategoriFilter === kategori
                              ? "filter-chip-active"
                              : ""
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
            { agenda.length > 0 ? 
               filteredData.map((item, index) => (
                  <div
                     key={index}
                     className="info-card transform opacity-0 animate-fadeIn"
                  >
                     <div className="relative overflow-hidden">
                        <img className="info-card-media" src={item.url_image ? convertDriveUrl(item.url_image, "thumbnail") : '/assets/image/agenda-no-image.png'} alt={item.peringkat} 
                           onError={(e) => {e.currentTarget.src = "/assets/image/agenda-no-image.png";}}/>
                        <div className="absolute right-4 top-4 rounded-full bg-mainblue px-3 py-1 text-sm font-bold text-white">
                           {item.tahun}
                        </div>
                        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-mainblue">
                           {item.kategori}
                        </div>
                     </div>
                     <div className="p-6 pt-0">
                        <div className="pt-4">
                           <div className="flex items-center justify-between text-sm">
                              <div className="text-justify w-full">
                                 <h4 className="mb-4 border-b border-mainblue/10 pb-3 text-center text-lg font-extrabold text-mainblue line-clamp-2">
                                    {item.judul}
                                 </h4>
                                 <p className="font-normal leading-6 text-slate-500 line-clamp-3">
                                    {item.deskripsi}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <p className="px-6 pb-6 text-sm font-semibold text-mainblue">{item.status}</p>
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
