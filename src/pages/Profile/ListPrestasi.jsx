import { useEffect, useState } from "react";
import { Card, CardActionArea, CardMedia, Chip } from "@mui/material";
import ImageViewer from "../../components/ImageViewer";
import LogoSD from "../../components/LogoSD";
import ModalDetail from "../../components/ModalDetail";

export default function ListPrestasi() {
   const [ListPrestasi, setListPrestasi] = useState([]);
   const [loading, setLoading] = useState(true);
   console.log(ListPrestasi);

  const [selectedPrestasi, setSelectedPrestasi] = useState(null);

   const openModal = (prestasi) => {
     setSelectedPrestasi(prestasi);
   };
   
  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycby_dTOVeJ0JYJgLY0Yv6_mX6uek2lEK1oyT9fQD_Rzz12vzX1UqnFAKQdGFeD7HvM3q/exec")
      .then((res) => res.json())
      .then((result) => {
        setListPrestasi(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
   return (
      <>
         <LogoSD titlePage="Prestasi" isTitlePage />
         <div className="px-28 py-8">
            <div className="grid grid-cols-4 gap-y-8 my-8">
               {
                  ListPrestasi.map((item, index) => (
                     <Card
                        key={index}
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
                           <div className="flex flex-row gap-2">
                              <Chip 
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
                  ))
               }
            </div>
            <ModalDetail 
               selectedItem={selectedPrestasi}
            />
         </div>
      </>
   )
}