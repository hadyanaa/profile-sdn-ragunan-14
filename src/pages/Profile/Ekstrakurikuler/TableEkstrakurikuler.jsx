import { Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useAppStore } from "../../../store/useAppStore";

export default function TableEkstrakurikuler() {
   const { ekskul, loading } = useAppStore();
   
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
               initialState={{ pagination: { paginationModel } }}
               pageSizeOptions={[10, 25, 50]}
               sx={{ border: 0 }}
            />
         </Paper>
      </div>
   </>
  );
}