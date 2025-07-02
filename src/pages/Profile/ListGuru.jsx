import { Card, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import ImageViewer from "../../components/ImageViewer";
import LogoSD from "../../components/LogoSD";

export default function ListGuru() {
  const [ListGuru, setListGuru] = useState([]);

   useEffect(() => {
      fetch('/api/data-guru.json')
      .then(res => res.json())
      .then(data => setListGuru(data))
      .catch(err => console.error("Gagal mengambil data:", err));
   }, []);
   return (
      <div className="px-28 py-8">
         <div className="flex justify-center bg-secondblue bg-[url(/assets/image/pattern.png)] p-4 rounded-lg w-full">
            <LogoSD titlePage="Guru" />
         </div>
         <div className="grid grid-cols-4 gap-y-8 my-8">
            {
               ListGuru.map((item, index) => (
                  <Card
                     className="mx-auto"
                     sx={{height: "auto", width: 250, padding: 2, 
                        backgroundImage: "url(/assets/image/pattern.png)", 
                        backgroundColor: "#098fd1",
                        textAlign: "center"
                     }}
                  >
                     <div className="flex justify-center">
                        <ImageViewer imageUrl={item.url_image} fullImageUrl={item.url_image} />
                     </div>
                     <h4 className={`font-semibold text-lg mt-4 text-secondary`}>{item.nama}</h4>
                     <p className={`text-sm text-whiteprime`}>{item.status}</p>
                  </Card>
               ))
            }
         </div>
      </div>
   )
}