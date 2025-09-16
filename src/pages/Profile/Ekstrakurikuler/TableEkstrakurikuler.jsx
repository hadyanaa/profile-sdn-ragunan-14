import { Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useAppStore } from "../../../store/useAppStore";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function TableEkstrakurikuler() {
   const { ekskul, loading } = useAppStore();

   const [open, setOpen] = useState(false);
   const [selectedRow, setSelectedRow] = useState({
      nama: "ekskul sekolah",
      waktu: "nama hari",
      nama_pembina: "nama pembina",
      pj: "nama pj",
      sifat: "sifat ekskul",
      peserta: "peserta ekskul",
      tujuan: "tujuan ekskul",
      materi: "materi ekskul",
   });
   const columns = [
      { field: 'id', headerName: 'No', width: 50 },
      { field: 'nama', headerName: 'Nama Ekskul', width: 250, cellClassName: "font-bold" },
      { field: 'waktu', headerName: 'Hari',  width: 200 },
      { field: 'sifat', headerName: 'Sifat',  width: 200 },
      { field: 'peserta', headerName: 'Peserta',  width: 200 },
      // { field: 'jurusan', headerName: 'Jurusan', width: 180 },
      // { field: 'keaktifan', headerName: 'Status Aktif', width: 80,
      //    renderCell: (params) => (
      //       <span
      //          className={`font-bold px-2 py-1 rounded-xl border bg-[#58D58D] text-white`}
      //       >
      //          {params.value}
      //       </span>
      //    ),
      //  },
   ];

   const dataEkskul = ekskul.filter(item => item.nama !== "vmt")

   const paginationModel = { page: 0, pageSize: 10 };

   return (
   <>
      <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-4 w-full p-8 bg-[url(/assets/image/pattern.png)]">
         <h1 className="font-bold text-2xl ">Data Ekstrakurikuler</h1>
         <span className="font-medium text-md">Daftar lengkap data ekstrakurikuler sekolah</span>
         <Paper sx={{ height: 450, width: '100%', marginTop: '16px' }}>
            <DataGrid
               rows={dataEkskul}
               columns={columns}
               onRowClick={(params) => {
                  setSelectedRow(params.row);
                  setOpen(true);
               }}
               initialState={{ pagination: { paginationModel } }}
               pageSizeOptions={[10, 25, 50]}
               sx={{ "& .MuiDataGrid-row": { cursor: "pointer" }, border: 0, }}
            />
         </Paper>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
         <DialogTitle>Detail {selectedRow.nama}</DialogTitle>
         <DialogContent>
            {selectedRow && (
               <>
                  <div className="grid grid-cols-2 gap-4">
                     <p><b>Nama Pembina</b><br/>
                        {selectedRow.nama_pembina.includes(";") ? (
                           selectedRow.nama_pembina.split(";") // pecah jadi array
                           .map((np, i) => (
                           <li className="ml-4" key={i}>{np.trim()}</li> // trim untuk hapus spasi
                        ))
                        ) : (
                           selectedRow.nama_pembina
                        )
                     }
                     </p>
                     <p><b>Waktu</b> <br/>{selectedRow.waktu}</p>
                     <p><b>Penanggung Jawab</b> <br/> 
                        {selectedRow.pj.includes(";") ? (
                           selectedRow.pj
                              .split(";") // pecah jadi array
                              .map((pj, i) => (
                              <li className="ml-4" key={i}>{pj.trim()}</li> // trim untuk hapus spasi
                           ))) : (
                              selectedRow.pj
                           )
                        }
                     </p>
                     <p><b>Sifat</b> <br/> {selectedRow.sifat}</p>
                     <p><b>Peserta</b> <br/> {selectedRow.peserta}</p>
                     <p className="col-span-2"><b>Tujuan Ekstrakurikuler</b> <br/> 
                        {selectedRow.tujuan.includes(";") ? (
                           selectedRow.tujuan
                              .split(";") // pecah jadi array
                              .map((pj, i) => (
                              <li className="ml-4" key={i}>{pj.trim()}</li> // trim untuk hapus spasi
                           ))) : (
                              selectedRow.tujuan
                           )
                        }
                     </p>
                     <p className="col-span-2"><b>Materi Ekstrakurikuler</b> <br/> 
                        {selectedRow.materi.includes(";") ? (
                           selectedRow.materi
                              .split(";") // pecah jadi array
                              .map((pj, i) => (
                              <li className="ml-4" key={i}>{pj.trim()}</li> // trim untuk hapus spasi
                           ))) : (
                              selectedRow.materi
                           )
                        }
                     </p>
                  </div>
               </>
            )}
         </DialogContent>
         <DialogActions>
            <Button onClick={() => setOpen(false)}>Tutup</Button>
         </DialogActions>
      </Dialog>
   </>
  );
}