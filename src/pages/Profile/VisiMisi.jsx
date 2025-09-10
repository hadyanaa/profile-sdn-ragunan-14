import { useEffect, useState } from "react";
import LogoSD from "../../components/LogoSD";
import { Skeleton } from "@mui/material";

export default function VisiMisi() {
  const [VisiMisi, setVisiMisi] = useState([]);
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbymbySyX9CBn74tgENUNc8bPXNXNFTTsokzBlay9Pys6Umg5SntwvXKTh5es1cLOiim/exec")
      .then((res) => res.json())
      .then((result) => {
        setVisiMisi(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  console.log(VisiMisi);
  return(
    <>
      <LogoSD titlePage="Visi Misi" isTitlePage />
      <div className="flex flex-col gap-8 px-28 font-jakarta">
        <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-8 w-full p-8 bg-[url(/assets/image/pattern.png)]">
          <h1 className="font-bold text-2xl mb-4">VISI</h1>
          <p className="text-2xl italic">
            "{loading ? 
            <Skeleton animation="wave" variant="overlay">
            </Skeleton> :
            VisiMisi[0]?.visi}"
          </p>
        </div>
        <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
          <h1 className="font-bold text-2xl mb-4">MISI</h1>
          <div className="grid grid-cols-2 gap-4">
            {loading ? 
            <>
            <Skeleton animation="wave" variant="overlay">
            </Skeleton>
            <Skeleton animation="wave" variant="overlay">
            </Skeleton>
            </> :
            VisiMisi.filter(item => item.misi).map((item, index) => (
              <div className="border-2 rounded-lg p-4 flex text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out" 
              key={index}>
                <div className="border-2 rounded-full w-fit h-fit p-1 text-center">
                  {index+1}. 
                </div>
                {item.misi}
              </div>
            ))
            }
          </div>
        </div>
        <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mb-8 w-full p-8 bg-[url(/assets/image/pattern.png)]">
          <h1 className="font-bold text-2xl mb-4">TUJUAN</h1>
          <div className="grid grid-cols-2 gap-4">
            {loading ? 
            <>
            <Skeleton animation="wave" variant="overlay">
            </Skeleton>
            <Skeleton animation="wave" variant="overlay">
            </Skeleton>
            </> :
            VisiMisi.map((item, index) => (
              <div className="border-2 rounded-lg p-4 flex text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out" 
              key={index}>
                <div className="border-2 rounded-full w-fit h-fit p-1 text-center ">
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