import { useEffect, useState } from "react";
import LogoSD from "../../../components/LogoSD";
import { Skeleton } from "@mui/material";
import { useAppStore } from "../../../store/useAppStore";

export default function VmtEkstrakurikuler() {
  const { ekskul, loading, error, fetchEkskul } = useAppStore();
   
  useEffect(() => {
    if (ekskul.length === 0) {
      // hanya fetch kalau data belum ada
      fetchEkskul();
    }
  }, [ekskul, fetchEkskul]);
  console.log(ekskul)
  return(
    <>
      <div className="flex flex-col gap-4">
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-lg md:text-2xl mb-4">VISI</h1>
            <p className="text-lg md:text-2xl italic">
               "{loading ? 
               <Skeleton animation="wave" variant="overlay">
               </Skeleton> :
               ekskul[0]?.visi}"
            </p>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full h-full p-8 bg-[url(/assets/image/pattern.png)]">
               <h1 className="font-bold text-lg md:text-2xl mb-4">MISI</h1>
               <div className="grid grid-cols-1 gap-4">
                  {loading ? 
                  <>
                  <Skeleton animation="wave" variant="overlay">
                  </Skeleton>
                  <Skeleton animation="wave" variant="overlay">
                  </Skeleton>
                  </> :
                  ekskul.filter(item => item.misi).map((item, index) => (
                  <div className="border-2 rounded-lg p-4 flex flex-col md:flex-row text-justify text-sm md:text-base gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out" 
                  key={index}>
                     <div className="border-2 rounded-full mx-auto md:ml-0 w-fit h-fit p-0.5 text-center">
                        {index+1}. 
                     </div>
                     {item.misi}
                  </div>
                  ))
                  }
               </div>
            </div>
            <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mb-8 w-full h-full p-8 bg-[url(/assets/image/pattern.png)]">
               <h1 className="font-bold text-lg md:text-2xl mb-4">TUJUAN</h1>
               <div className="grid grid-cols-1 gap-4">
                  {loading ? 
                  <>
                  <Skeleton animation="wave" variant="overlay">
                  </Skeleton>
                  <Skeleton animation="wave" variant="overlay">
                  </Skeleton>
                  </> :
                  ekskul.filter(item => item.tujuan_ekskul).map((item, index) => (
                  <div className="border-2 rounded-lg p-4 flex flex-col md:flex-row text-sm md:text-base text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out" 
                  key={index}>
                     <div className="border-2 rounded-full mx-auto md:ml-0 w-fit h-fit p-0.5 text-center ">
                        {index+1}. 
                     </div>
                     {item.tujuan_ekskul}
                  </div>
                  ))
                  }
               </div>
            </div>
         </div>
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mb-8 w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-lg md:text-2xl mb-4">FUNGSI</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {loading ? 
               <>
               <Skeleton animation="wave" variant="overlay">
               </Skeleton>
               <Skeleton animation="wave" variant="overlay">
               </Skeleton>
               </> :
               ekskul.filter(item => item.fungsi_ekskul).map((item, index) => (
               <div className="border-2 rounded-lg p-4 flex flex-col md:flex-row text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out" 
               key={index}>
                  <div className="border-2 rounded-full mx-auto md:ml-0 w-fit h-fit p-0.5 text-center ">
                     {index+1}. 
                  </div>
                  {item.fungsi_ekskul}
               </div>
               ))
               }
            </div>
         </div>
      </div>
    </>

  ) 
}