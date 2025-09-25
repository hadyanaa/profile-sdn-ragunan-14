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
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div>
                  <h1 className="font-bold text-left text-lg mb-2">Kategori Prestasi</h1>
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
               <div>
                  <h1 className="font-bold text-left text-lg mb-2">Tingkat Prestasi</h1>
                  <div className="flex gap-2 flex-wrap">
                     {tingkatList.map((tingkat) => (
                        <button
                           key={tingkat}
                           onClick={() => setTingkatFilter(tingkat)}
                           className={`px-3 py-1 rounded-full text-sm hover:scale-105 cursor-pointer ${
                              tingkatFilter === tingkat
                                 ? "bg-gray-700 text-white hover:bg-gray-900"
                                 : "bg-gray-100 text-gray-700 hover:bg-gray-300"
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
                     className="rounded-lg w-full h-auto min-h-44 hover:scale-105 transition-all duration-500 ease-in-out transform opacity-0 animate-fadeIn bg-[url(/assets/image/pattern.png)] bg-secondblue text-center"
                  >
                     <div className="relative h-64 overflow-hidden">
                        <img className="rounded-lg border h-full w-full" src={item.foto ? item.foto : '/assets/image/prestasi-no-image.png'} alt={item.peringkat} 
                           onError={(e) => {e.currentTarget.src = "/assets/image/prestasi-no-image.png";}}/>
                        <div className="absolute right-4 top-4 px-3 py-1 rounded-full text-sm hover:scale-105 bg-gray-700 text-white font-bold">
                           {item.tahun}
                        </div>
                        <div className="absolute left-4 top-4 px-3 py-1 rounded-full text-sm hover:scale-105 bg-gray-100 text-gray-700 font-bold">
                           {item.tingkat}
                        </div>
                     </div>
                     <div className="flex flex-col space-y-1.5 p-6 pb-3">
                        <div className="flex items-center justify-between">
                           <div className="px-3 py-1 rounded-full text-sm hover:scale-105 bg-gray-100 text-gray-700 font-bold">
                              {item.kategori}
                           </div>
                        </div>
                        <h4 className={`font-semibold text-lg text-secondary`}>{item.peringkat}</h4>
                     </div>
                     <div className="p-6 pt-0">
                        <div className="border-t border-slate-50 pt-4">
                           <div className="flex items-center justify-between text-sm">
                              <div className="text-left">
                                 <p className="font-bold text-slate-700">
                                    {item.nama}
                                 </p>
                                 <p className="font-normal text-white/80">
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