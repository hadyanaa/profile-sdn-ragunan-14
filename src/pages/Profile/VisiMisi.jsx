import { useEffect, useState } from "react";
import LogoSD from "../../components/LogoSD";
import { Skeleton } from "@mui/material";
import { useAppStore } from "../../store/useAppStore";

export default function VisiMisi() {
  const { visiMisi, loading, error, fetchVisiMisi } = useAppStore();

  console.log(visiMisi);
   
  useEffect(() => {
    if (visiMisi.length === 0) {
      // hanya fetch kalau data belum ada
      fetchVisiMisi();
    }
  }, [visiMisi, fetchVisiMisi]);
  return(
    <>
      { loading ? (
          <div className="loading-toast">
            <img className="h-8 w-8" src="/assets/video/Rippletransparent.gif" alt="" />
            <span>Memuat data terbaru...</span>
          </div>
        ) : (
          <></>
      )}
      <LogoSD titlePage="Visi Misi" isTitlePage />
      <div className="page-shell page-stack">
        <div className="panel-card-blue text-center">
          <h1 className="text-xl font-extrabold md:text-3xl mb-4">VISI</h1>
          <p className="mx-auto max-w-4xl text-lg italic leading-8 text-whiteprime/90 md:text-2xl md:leading-10">
            "{loading ? 
            <Skeleton animation="wave" variant="overlay">
            </Skeleton> :
            visiMisi[0]?.visi}"
          </p>
        </div>
        <div className="panel-card">
          <h1 className="panel-title text-center mb-6">MISI</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {loading ? 
            <>
            <Skeleton animation="wave" variant="overlay">
            </Skeleton>
            <Skeleton animation="wave" variant="overlay">
            </Skeleton>
            </> :
            visiMisi.filter(item => item.misi).map((item, index) => (
              <div className="stat-tile flex flex-col gap-3 text-left text-sm leading-7 md:flex-row md:text-base" 
              key={index}>
                <div className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mainblue text-sm font-black text-white md:ml-0">
                  {index+1}. 
                </div>
                <div className="w-full">
                  {item.misi}
                </div>
              </div>
            ))
            }
          </div>
        </div>
        <div className="panel-card mb-8">
          <h1 className="panel-title text-center mb-6">TUJUAN</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {loading ? 
            <>
            <Skeleton animation="wave" variant="overlay">
            </Skeleton>
            <Skeleton animation="wave" variant="overlay">
            </Skeleton>
            </> :
            visiMisi.map((item, index) => (
              <div className="stat-tile flex flex-col gap-3 text-left text-sm leading-7 md:flex-row md:text-base" 
              key={index}>
                <div className="mx-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mainblue text-sm font-black text-white md:ml-0">
                  {index+1}. 
                </div>
                {item.tujuan}
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </>

  ) 
}
