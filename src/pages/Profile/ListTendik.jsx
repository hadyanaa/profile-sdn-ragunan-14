import { useEffect, useState } from "react";
import { Card, CardActionArea } from "@mui/material";
import LogoSD from "../../components/LogoSD";
import ModalDetail from "../../components/ModalDetail";

export default function ListTendik() {
   const [ListTendik, setListTendik] = useState([]);
   const [selectedTendik, setSelectedTendik] = useState(null);

   const openModal = (tendik) => {
      setSelectedTendik(tendik);
   };

   console.log(selectedTendik);
   
   useEffect(() => {
         fetch('/api/data-tendik.json')
         .then(res => res.json())
         .then(data => setListTendik(data))
         .catch(err => console.error("Gagal mengambil data:", err));
   }, []);
   return (
      <>
         <LogoSD titlePage="Tenaga Kependidikan" isTitlePage />
         <div className="px-28 py-8">
            <div className="grid grid-cols-4 gap-y-8 my-8">
               {
                  ListTendik.map((item, index) => (
                     <Card
                        className="mx-auto"
                        sx={{height: "auto", width: 250, padding: 2, 
                           backgroundImage: "url(/assets/image/pattern.png)", 
                           backgroundColor: "#098fd1",
                           textAlign: "center"
                        }}
                     >
                        <CardActionArea
                           onClick={() => openModal(item)}
                        >
                           <div className="flex justify-center">
                              <img src={item.url_image} alt={item.url_image} />
                           </div>
                           <h4 className={`font-semibold text-lg mt-4 text-secondary`}>{item.nama}</h4>
                           <p className={`text-sm text-whiteprime`}>{item.status}</p>
                        </CardActionArea>
                     </Card>
                  ))
               }
            </div>
            <ModalDetail
               selectedItem={selectedTendik}
            />
         </div>
      </>
   )
}