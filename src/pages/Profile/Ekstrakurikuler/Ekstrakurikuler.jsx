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
         <div className="panel-card-blue text-center">
            <h1 className="text-xl font-extrabold md:text-3xl mb-4">VISI</h1>
            <p className="mx-auto max-w-4xl text-lg italic leading-8 text-white/90 md:text-2xl md:leading-10">
               "{loading ? 
               <Skeleton animation="wave" variant="overlay">
               </Skeleton> :
               ekskul[0]?.visi}"
            </p>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="panel-card h-full text-center">
               <h1 className="panel-title mb-6">MISI</h1>
               <div className="grid grid-cols-1 gap-4">
                  {loading ? 
                  <>
                  <Skeleton animation="wave" variant="overlay">
                  </Skeleton>
                  <Skeleton animation="wave" variant="overlay">
                  </Skeleton>
                  </> :
                  ekskul.filter(item => item.misi).map((item, index) => (
                  <div className="stat-tile flex flex-col gap-3 text-left text-sm leading-7 md:flex-row md:text-base" 
                  key={index}>
                     <div className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mainblue text-sm font-black text-white md:ml-0">
                        {index+1}. 
                     </div>
                     {item.misi}
                  </div>
                  ))
                  }
               </div>
            </div>
            <div className="panel-card h-full text-center">
               <h1 className="panel-title mb-6">TUJUAN</h1>
               <div className="grid grid-cols-1 gap-4">
                  {loading ? 
                  <>
                  <Skeleton animation="wave" variant="overlay">
                  </Skeleton>
                  <Skeleton animation="wave" variant="overlay">
                  </Skeleton>
                  </> :
                  ekskul.filter(item => item.tujuan_ekskul).map((item, index) => (
                  <div className="stat-tile flex flex-col gap-3 text-left text-sm leading-7 md:flex-row md:text-base" 
                  key={index}>
                     <div className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mainblue text-sm font-black text-white md:ml-0">
                        {index+1}. 
                     </div>
                     {item.tujuan_ekskul}
                  </div>
                  ))
                  }
               </div>
            </div>
         </div>
         <div className="panel-card mb-8 text-center">
            <h1 className="panel-title mb-6">FUNGSI</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {loading ? 
               <>
               <Skeleton animation="wave" variant="overlay">
               </Skeleton>
               <Skeleton animation="wave" variant="overlay">
               </Skeleton>
               </> :
               ekskul.filter(item => item.fungsi_ekskul).map((item, index) => (
               <div className="stat-tile flex flex-col gap-3 text-left text-sm leading-7 md:flex-row md:text-base" 
               key={index}>
                  <div className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mainblue text-sm font-black text-white md:ml-0">
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
