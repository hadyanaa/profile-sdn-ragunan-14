import { useEffect, useState } from "react";
import { Card, CardMedia, Chip, Skeleton } from "@mui/material";
import { useAppStore } from "../../../store/useAppStore";

export default function Prestasi() {
   const { prestasi, loading, error, fetchPrestasi } = useAppStore();

   useEffect(() => {
      if (prestasi.length === 0) {
         // hanya fetch kalau data belum ada
         fetchPrestasi();
      }
   }, [prestasi, fetchPrestasi]);

   console.log(prestasi)

   const [kategoriFilter, setKategoriFilter] = useState("Semua");
   const [tingkatFilter, setTingkatFilter] = useState("Semua");

   const kategoriList = ["Semua", "Akademik", "Seni", "Agama", "Olahraga"];
   const tingkatList = ["Semua", "Lainnya", "Kecamatan", "Kota", "Provinsi", "Nasional", "Internasional"];

   // Filter data dari API
   const filteredData = prestasi.filter((item) => {
      const byKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
      const byTingkat = tingkatFilter === "Semua" || item.tingkat === tingkatFilter;
      return byKategori && byTingkat;
   });

   return (
      <>
         <div className="filter-panel">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div>
                  <h1 className="font-bold text-left text-lg mb-3 text-mainblue">Kategori Prestasi</h1>
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
               <div>
                  <h1 className="font-bold text-left text-lg mb-3 text-mainblue">Tingkat Prestasi</h1>
                  <div className="flex gap-2 flex-wrap">
                     {tingkatList.map((tingkat) => (
                        <button
                           key={tingkat}
                           onClick={() => setTingkatFilter(tingkat)}
                           className={`filter-chip ${
                              tingkatFilter === tingkat
                                 ? "filter-chip-active"
                                 : ""
                           }`}
                           >
                           {tingkat}
                        </button>
                     ))}
                  </div>
               </div>

            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            { prestasi.length > 0 ? 
               filteredData.map((item, index) => (
                  <div
                     key={index}
                     className="info-card transform opacity-0 animate-fadeIn"
                  >
                     <div className="relative overflow-hidden">
                        <img className="info-card-media" src={item.foto ? item.foto : '/assets/image/prestasi-no-image.png'} alt={item.peringkat} 
                           onError={(e) => {e.currentTarget.src = "/assets/image/prestasi-no-image.png";}}/>
                        <div className="absolute right-4 top-4 rounded-full bg-mainblue px-3 py-1 text-sm font-bold text-white">
                           {item.tahun}
                        </div>
                        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-mainblue">
                           {item.tingkat}
                        </div>
                     </div>
                     <div className="flex flex-col space-y-1.5 p-6 pb-3">
                        <div className="flex items-center justify-between">
                           <div className="soft-badge">
                              {item.kategori}
                           </div>
                        </div>
                        <h4 className="text-lg font-extrabold text-mainblue">{item.peringkat}</h4>
                     </div>
                     <div className="p-6 pt-0">
                        <div className="border-t border-mainblue/10 pt-4">
                           <div className="flex items-center justify-between text-sm">
                              <div className="text-left">
                                 <p className="font-bold text-slate-700">
                                    {item.nama}
                                 </p>
                                 <p className="mt-1 font-normal leading-6 text-slate-500">
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
