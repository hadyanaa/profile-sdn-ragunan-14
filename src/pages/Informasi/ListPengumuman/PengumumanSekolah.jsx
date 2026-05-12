import { useEffect, useState } from "react";
import { Card, CardMedia, Chip, Skeleton } from "@mui/material";
import { useAppStore } from "../../../store/useAppStore";
import convertDriveUrl from "../../../functions/DriveImage";
import { formatTanggal } from "../../../functions/FormatTanggal";
import PDFViewer, { DownloadPdf } from "../../../components/PdfPreview";

export default function Pengumuman() {
   const { pengumuman, loading, fetchPengumuman } = useAppStore();
   const [ pdfUrl, setPdfUrl ]= useState("");
   const handlePdfClick = (url) => {
      setPdfUrl(url);
   }

   useEffect(() => {
      if (!pengumuman || pengumuman?.length === 0) {
         // hanya fetch kalau data belum ada
         fetchPengumuman();
      }
   }, []);

   const [kategoriFilter, setKategoriFilter] = useState("Semua");
   // const [tingkatFilter, setTingkatFilter] = useState("Semua");

   const kategoriList = ["Semua", "Akademik", "Prestasi", "Kegiatan Sekolah", "SPMB/Mutasi", "Beasiswa", "Kebijakan", "Umum"];
   // const tingkatList = ["Semua", "Lainnya", "Kecamatan", "Kota", "Provinsi", "Nasional", "Internasional"];

   // Filter data dari API
   const filteredData = pengumuman?.filter((item) => {
      const byKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
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
                  <h1 className="mb-3 text-left text-lg font-bold text-mainblue">Kategori Informasi</h1>
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
                        {kategori === "Semua" ? pengumuman.length + " | " + kategori : pengumuman.filter((item) => item.kategori === kategori).length + " | " + kategori}
                        </button>
                     ))}
                  </div>
               </div>

            </div>
         </div>
         <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-4">
            <div>
               { pengumuman.length > 0 ? 
                  filteredData.length > 0 ? 
                     [...filteredData]
                     .sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal)) // Urutkan dari terbaru ke terlama
                     .map((item, index) => (
                        <div
                           key={index}
                           onClick={()=>handlePdfClick(item.url)}
                           className="info-card mb-4 flex min-h-28 cursor-pointer flex-col transform opacity-0 animate-fadeIn"
                        >
                           <div className="flex flex-row overflow-hidden">
                              <img className="my-auto h-14 w-auto p-2" src={'/assets/image/pdf.png'} alt={item.peringkat} />
                              <h4 className="w-full border-b border-mainblue/10 pt-2 pr-3 text-left text-lg font-extrabold text-mainblue line-clamp-2">
                                 {item.judul}
                              </h4>
                           </div>
                           <div className="p-4">
                              <div className="flex items-center justify-between text-sm">
                                 <p className="font-semibold text-mainblue">
                                    {item.kategori}
                                 </p>
                                 <div>
                                    <p className="text-slate-500">
                                       {formatTanggal(item.tanggal)}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )) 
                     :
                     (
                        <div className="info-card mb-4 flex min-h-28 flex-col transform opacity-0 animate-fadeIn">
                           <div className="flex flex-row overflow-hidden">
                              <h4 className="w-full border-b border-mainblue/10 pt-2 text-center text-lg font-bold text-mainblue line-clamp-2">
                                 Belum ada informasi
                              </h4>
                           </div>
                           <div className="p-4">
                              <div className="flex items-center justify-between text-sm">
                                 <p className="font-normal text-justify text-slate-500">
                                    -
                                 </p>
                                 <div>
                                    <p className="text-slate-500">
                                       -
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>) 
                  :
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
            <div className="lg:col-span-3">
               <PDFViewer fileId={pdfUrl} />
            </div>
         </div>
      </>
   )
}
