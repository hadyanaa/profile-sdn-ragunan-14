import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";
import { formatTanggal } from "../../../functions/FormatTanggal";
import { FaFilePdf } from "react-icons/fa";

export default function Pengumuman() {
   const { pengumuman, loading, fetchPengumuman } = useAppStore();
   const navigate = useNavigate();
   const [kategoriFilter, setKategoriFilter] = useState("Semua");

   useEffect(() => {
      if (!pengumuman || pengumuman?.length === 0) {
         // Hanya fetch kalau data belum ada
         fetchPengumuman();
      }
   }, []);

   const kategoriList = ["Semua", "Akademik", "Prestasi", "Kegiatan Sekolah", "SPMB/Mutasi", "Beasiswa", "Kebijakan", "Umum"];

   // Filter data dari API
   const filteredData = pengumuman?.filter((item) => {
      const byKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
      return byKategori;
   }) ?? [];

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

         {/* Filter Panel Kategori */}
         <div className="filter-panel mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div className="col-span-2">
                  <h1 className="mb-3 text-left text-lg font-bold text-mainblue font-jakarta">Kategori Informasi</h1>
                  <div className="flex gap-2 flex-wrap">
                     {kategoriList.map((kategori) => (
                        <button
                           key={kategori}
                           onClick={() => setKategoriFilter(kategori)}
                           className={`filter-chip font-jakarta ${
                              kategoriFilter === kategori
                                 ? "filter-chip-active"
                                 : ""
                           }`}
                        >
                           {kategori === "Semua" 
                              ? pengumuman.length + " | " + kategori 
                              : pengumuman.filter((item) => item.kategori === kategori).length + " | " + kategori
                           }
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         {/* Grid Layout Pengumuman (Sama seperti Agenda) */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
            { pengumuman.length > 0 ? 
               (filteredData.length > 0 ? 
                  [...filteredData]
                     .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)) // Urutkan dari terbaru ke terlama
                     .map((item, index) => (
                        <div
                           key={index}
                           onClick={() => navigate(`/informasi/pengumuman/${item.no}`)}
                           className="info-card transform opacity-0 animate-fadeIn cursor-pointer transition-all hover:scale-[1.02] duration-200 flex flex-col h-full justify-between"
                        >
                           {/* Media Header Kartu: Gradient & Ikon Dokumen */}
                           <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-mainblue to-secondblue flex flex-col items-center justify-center p-4 text-white">
                              <FaFilePdf className="text-5xl mb-2 opacity-90 text-white animate-pulse" />
                              <span className="text-[10px] font-bold tracking-widest uppercase opacity-75 font-jakarta">SDN RAGUNAN 14</span>
                              <span className="text-sm font-extrabold tracking-wide mt-1 uppercase text-primaryoren font-jakarta">PENGUMUMAN</span>
                              
                              <div className="absolute right-4 top-4 rounded-full bg-mainblue px-3 py-1 text-xs font-bold text-white shadow-sm font-jakarta">
                                 {item.tanggal ? new Date(item.tanggal).getFullYear() : '-'}
                              </div>
                              <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-mainblue shadow-sm font-jakarta">
                                 {item.kategori}
                              </div>
                           </div>

                           {/* Konten Kartu */}
                           <div className="p-6 flex-1 flex flex-col justify-between">
                              <div>
                                 <h4 
                                    className="mb-3 border-b border-mainblue/10 pb-3 text-center text-lg font-extrabold text-mainblue min-h-[56px] font-jakarta"
                                    style={{
                                       display: '-webkit-box',
                                       WebkitLineClamp: 2,
                                       WebkitBoxOrient: 'vertical',
                                       overflow: 'hidden',
                                       textOverflow: 'ellipsis'
                                    }}
                                 >
                                    {item.judul}
                                 </h4>
                                 <p className="text-xs text-slate-400 text-center mb-4 font-jakarta">
                                    Dipublikasikan: {formatTanggal(item.tanggal)}
                                 </p>
                              </div>
                              <div className="text-center pt-2">
                                 <span className="text-sm font-bold text-secondblue hover:text-mainblue transition-colors font-jakarta">
                                    Baca Selengkapnya →
                                 </span>
                              </div>
                           </div>
                        </div>
                     ))
                  : (
                     <div className="col-span-full py-12 text-center bg-white rounded-2xl shadow-sm border border-slate-100 font-jakarta">
                        <h4 className="text-lg font-bold text-mainblue">Belum ada pengumuman untuk kategori ini</h4>
                        <p className="text-slate-500 mt-2 text-sm">Silakan pilih kategori informasi lainnya di atas.</p>
                     </div>
                  )
               ) : (
                  Array.from({ length: 4 }).map((_, index) => (
                     <div
                        key={index}
                        className="flex flex-col p-4 items-center bg-white rounded-xl shadow-sm"
                     >
                        <Skeleton animation="wave" variant="rectangular" width="100%" height={160} className="rounded-lg mb-4" />
                        <Skeleton animation="wave" height={24} width="80%" className="mb-2" />
                        <Skeleton animation="wave" height={20} width="60%" />
                     </div>
                  ))
               )
            }
         </div>
      </>
   );
}
