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

   return (
      <>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            { prestasi.length > 0 ? 
               prestasi.map((item, index) => (
                  <Card
                     key={index}
                     className="w-full h-auto min-h-44 hover:scale-105 transition-all duration-300 ease-in-out"
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