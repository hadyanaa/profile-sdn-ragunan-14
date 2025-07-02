import { Button, Card, CardActionArea, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState } from "react";
// import ImageViewer from "../../components/ImageViewer";
import LogoSD from "../../components/LogoSD";

export default function ListGuru() {
  const [ListGuru, setListGuru] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedGuru, setSelectedGuru] = useState(null);

  const handleOpen = (guru) => {
    setSelectedGuru(guru);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedGuru(null);
  };

  useEffect(() => {
    fetch('/api/data-guru.json')
      .then(res => res.json())
      .then(data => setListGuru(data))
      .catch(err => console.error("Gagal mengambil data:", err));
  }, []);

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div className="px-28 py-8">
      <div className="flex justify-center bg-secondblue bg-[url(/assets/image/pattern.png)] p-4 rounded-lg w-full">
        <LogoSD titlePage="Guru" />
      </div>
      <div className="grid grid-cols-4 gap-y-8 my-8">
        {ListGuru.map((item, index) => (
          <Card
            key={index}
            className="mx-auto"
            sx={{
              height: "auto", width: 250, padding: 2,
              backgroundImage: "url(/assets/image/pattern.png)",
              backgroundColor: "#098fd1",
              textAlign: "center"
            }}
          >
            <CardActionArea
              onClick={() => handleOpen(item)}
            >
               <div className="flex justify-center">
                  <img src={item.url_image} alt={item.url_image} />
               {/* <ImageViewer imageUrl={item.url_image} fullImageUrl={item.url_image} /> */}
               </div>
               <h4 className="font-semibold text-lg mt-4 text-secondary">{item.nama}</h4>
               <p className="text-sm text-whiteprime">{item.status}</p>
            </CardActionArea>
          </Card>
        ))}
      </div>

      {/* Modal hanya satu, datanya dari selectedGuru */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0,0,0,0.3)' }
        }}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{selectedGuru?.nama}</DialogTitle>
        <DialogContent dividers>
         <img src={selectedGuru?.url_image} alt={selectedGuru?.url_image} />
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {selectedGuru?.status}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
