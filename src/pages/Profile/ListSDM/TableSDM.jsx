import { Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useAppStore } from "../../../store/useAppStore";

export default function TableSDM() {
   const { sdm, loading } = useAppStore();
   
   const columns = [
      { field: 'id', headerName: 'No', width: 50 },
      { field: 'nama', headerName: 'Nama Lengkap', width: 250, cellClassName: "font-bold" },
      { field: 'nip_nikki', headerName: 'NIP/NIKKI',  width: 200 },
      { field: 'gender', headerName: 'Gender', width: 70,
         renderCell: (params) => (
            <span
               className={`font-bold
                  ${params.value === "P" ? "text-[#EC4899]" : "text-mainblue"}
                  `}
            >
               {params.value === "P" ? "P" : "L"}
            </span>
         ),
       },
      { field: 'status', headerName: 'Status', width: 90,
         renderCell: (params) => (
            <span
               className={`font-bold px-2 py-1 rounded-lg
                  ${params.value === "PNS" || params.value === "CPNS" ? "bg-[#828793] text-white" : "bg-primaryoren/20"}
                  `}
            >
               {params.value}
            </span>
         ),
       },
      { field: 'jabatan', headerName: 'Jabatan', width: 180 },
      { field: 'pendidikan', headerName: 'Pendidikan', width: 100,
         renderCell: (params) => (
            <span
               className={`font-medium px-2 py-1 rounded-xl border`}
            >
               {params.value}
            </span>
         ),
       },
      { field: 'jurusan', headerName: 'Jurusan', width: 180 },
      { field: 'keaktifan', headerName: 'Status Aktif', width: 80,
         renderCell: (params) => (
            <span
               className={`font-bold px-2 py-1 rounded-xl border bg-[#58D58D] text-white`}
            >
               {params.value}
            </span>
         ),
       },
   ];

   const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
      { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
      { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
      { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
      { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
      { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
      { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
      { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
      { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
   ];

   console.log(sdm);
   const paginationModel = { page: 0, pageSize: 10 };

   return (
   <>
      <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-4 w-full p-8 bg-[url(/assets/image/pattern.png)]">
         <h1 className="font-bold text-2xl ">Data Guru & Tenaga Kependidikan</h1>
         <span className="font-medium text-md">Daftar lengkap data guru dan tenaga kependidikan sekolah</span>
         <Paper sx={{ height: 600, width: '100%', marginTop: '16px' }}>
            <DataGrid
               rows={sdm}
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