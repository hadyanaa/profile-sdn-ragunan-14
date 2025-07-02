import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import convertDriveUrl from "../functions/DriveImage";

export default function ModalDetail({selectedItem, artikel}){
   const [open, setOpen] = useState(false);
   const handleClose = () => {
      setOpen(false);
   };
   const descriptionElementRef = useRef(null);
   useEffect(() => {
      if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
         descriptionElement.focus();
      }
      }
   }, [open]);

   useEffect(()=>{
      if (selectedItem) {
         setOpen(true);
      }
   }, [selectedItem])
   return (
      <Dialog
         open={open}
         onClose={handleClose}
         scroll="body"
         BackdropProps={{
            style: { backgroundColor: 'rgba(0,0,0,0.3)' }
         }}
         aria-labelledby="scroll-dialog-title"
         aria-describedby="scroll-dialog-description"
      >
         {artikel ? 
         <DialogTitle id="scroll-dialog-title">{selectedItem?.judul}</DialogTitle>
         : ''}
         <DialogContent
            dividers
            sx={{
               backgroundImage: "url(/assets/image/pattern.png)",
               backgroundColor: "var(--color-secondblue)"
            }}
         >
            <img 
               src={artikel ? convertDriveUrl(selectedItem?.url_image) : selectedItem?.url_image} 
               alt={selectedItem?.url_image} 
            />
            <DialogContentText
               id="scroll-dialog-description"
               ref={descriptionElementRef}
               tabIndex={-1}
            >
               <div className="flex flex-col items-center my-4">
                  {artikel ? 
                     <p>{selectedItem?.content}</p>
                  :
                  <>
                     <h1 className="text-whiteprime font-bold text-2xl">
                        {selectedItem?.nama}
                     </h1>
                     <p className="text-whiteprime">
                        {selectedItem?.status}
                     </p>
                  </>
                  }
               </div>
            </DialogContentText>
         </DialogContent>
      </Dialog>
   )
}