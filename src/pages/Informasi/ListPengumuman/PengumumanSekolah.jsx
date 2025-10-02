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

   const kategoriList = ["Semua", "Akademik", "Prestasi", "Kegiatan Sekolah", "SPMB", "Beasiswa", "Kebijakan", "Umum"];
   // const tingkatList = ["Semua", "Lainnya", "Kecamatan", "Kota", "Provinsi", "Nasional", "Internasional"];

   // Filter data dari API
   const filteredData = pengumuman?.filter((item) => {
      const byKategori = kategoriFilter === "Semua" || item.kategori === kategoriFilter;
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
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 mb-4 mt-8 bg-[url(/assets/image/pattern.png)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div className="col-span-2">
                  <h1 className="font-bold text-left text-lg mb-2">Kategori Informasi</h1>
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
                        {kategori === "Semua" ? pengumuman.length + " | " + kategori : pengumuman.filter((item) => item.kategori === kategori).length + " | " + kategori}
                        </button>
                     ))}
                  </div>
               </div>

            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <div>
               { pengumuman.length > 0 ? 
                  filteredData.length > 0 ? 
                     filteredData.map((item, index) => (
                        <div
                           key={index}
                           onClick={()=>handlePdfClick(item.url)}
                           className="rounded-lg flex flex-col mb-4 w-full h-auto min-h-28 hover:scale-105 transition-all duration-500 ease-in-out transform opacity-0 animate-fadeIn bg-[url(/assets/image/pattern.png)] bg-secondblue text-center"
                        >
                           <div className="flex flex-row overflow-hidden">
                              <img className="rounded-lg h-14 w-auto p-2 my-auto" src={'/assets/image/pdf.png'} alt={item.peringkat} />
                              <h4 className="text-left pt-2 border-b text-lg font-bold text-secondary line-clamp-2 w-full">
                                 {item.judul}
                              </h4>
                           </div>
                           <div className="p-4">
                              <div className="flex items-center justify-between text-sm">
                                 <p className="font-normal text-justify text-white">
                                    {item.kategori}
                                 </p>
                                 <div>
                                    <p className="text-white">
                                       {formatTanggal(item.tanggal)}
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )) :
                     (
                        <div className="rounded-lg flex flex-col mb-4 w-full h-auto min-h-28 hover:scale-105 transition-all duration-500 ease-in-out transform opacity-0 animate-fadeIn bg-[url(/assets/image/pattern.png)] bg-secondblue text-center">
                           <div className="flex flex-row overflow-hidden">
                              <h4 className="text-center pt-2 border-b text-lg font-bold text-secondary line-clamp-2 w-full">
                                 Belum ada informasi
                              </h4>
                           </div>
                           <div className="p-4">
                              <div className="flex items-center justify-between text-sm">
                                 <p className="font-normal text-justify text-white">
                                    -
                                 </p>
                                 <div>
                                    <p className="text-white">
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
            <div className="col-span-3">
               <PDFViewer fileId={pdfUrl} />
            </div>
         </div>
      </>
   )
}