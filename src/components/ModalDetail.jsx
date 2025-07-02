import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function ModalDetail({selectedItem}){
   const [open, setOpen] = useState(false);
   const handleClose = () => {
      setOpen(false);
      setselectedItem(null);
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
         scroll="paper"
         BackdropProps={{
            style: { backgroundColor: 'rgba(0,0,0,0.3)' }
         }}
         aria-labelledby="scroll-dialog-title"
         aria-describedby="scroll-dialog-description"
      >
         <DialogTitle id="scroll-dialog-title">{selectedItem?.nama}</DialogTitle>
         <DialogContent dividers>
            <img src={selectedItem?.url_image} alt={selectedItem?.url_image} />
            <DialogContentText
               id="scroll-dialog-description"
               ref={descriptionElementRef}
               tabIndex={-1}
            >
               {selectedItem?.status}
            </DialogContentText>
         </DialogContent>
      </Dialog>
   )
}