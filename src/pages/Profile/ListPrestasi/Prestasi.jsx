import { useEffect, useState } from "react";
import { Card, CardActionArea, CardMedia, Chip, Skeleton } from "@mui/material";
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
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            { prestasi.length > 0 ? 
               filteredData.map((item, index) => (
                  <Card
                     key={index}
                     className="w-full h-auto min-h-44 hover:scale-105 transition-all duration-500 ease-in-out transform opacity-0 animate-fadeIn"
                     sx={{ 
                        backgroundImage: "url(/assets/image/pattern.png)", 
                        backgroundColor: "#098fd1",
                        textAlign: "center"
                     }}
                  >
                     <CardActionArea
                     >
                        <div className="flex justify-center">
                           <img src={item.url_image} alt={item.url_image} />
                        </div>
                        <h4 className={`font-semibold text-lg mt-4 text-secondary`}>{item.nama}</h4>
                        <div className="flex flex-row gap-2">
                           <Chip
                              className="text-white" 
                              variant="outlined"
                              label={item.jenis}   
                           />
                           <Chip 
                              variant="outlined"
                              label={item.deskripsi}   
                           />
                        </div>
                        <p className={`text-sm text-whiteprime`}>{item.status}</p>
                     </CardActionArea>
                  </Card>
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