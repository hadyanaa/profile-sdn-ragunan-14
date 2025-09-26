import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";

export default function Tentang(){
      
   const lat = -6.298173640926657;
   const lng = 106.82610639533858;
   const src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  const dataIdentitas = [
   {
      title: "Nama Satuan Pendidikan",
      nama: "SD Negeri Ragunan 14 Pagi"
   },
   {
      title: "NPSN",
      nama: "20106176"
   },
   {
      title: "Nomor Statistik Sekolah",
      nama: "101016304039"
   },
   {
      title: "Alamat",
      nama: "Jalan Kebagusan Raya RT.001/007"
   },
   {
      title: "Kelurahan",
      nama: "Ragunan"
   },
   {
      title: "Kecamatan",
      nama: "Pasar Minggu"
   },
   {
      title: "Kode Pos",
      nama: "12550"
   },
   {
      title: "Kota",
      nama: "Jakarta Selatan"
   },
   {
      title: "Provinsi",
      nama: "DKI Jakarta"
   },
  ]
  const dataKontak = [
   {
      title: "No. Telepon",
      nama: "021-22701828"
   },
   {
      title: "Email",
      nama: "sdnragunan14pagi@ gmail.com"
   },
   {
      title: "Instagram",
      nama: "@sdnragunan14"
   },
   {
      title: "Website",
      nama: "-"
   },
  ]
  const dataPelengkap = [
   {
      title: "Status Kepemilikan",
      nama: "Pemerintah Daerah"
   },
   {
      title: "SK Pendirian Sekolah",
      nama: "1"
   },
   {
      title: "Tanggal SK Pendirian",
      nama: "1974-01-01"
   },
   {
      title: "SK Izin Operasional",
      nama: "326/BAP-S/M/DKI/2015"
   },
   {
      title: "Tanggal SK Izin Operasional",
      nama: "2015-09-21"
   },
   {
      title: "Akreditasi",
      nama: "B (Baik)"
   },
  ]

   return (
   <>
      <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-8 w-full p-8 bg-[url(/assets/image/pattern.png)] mb-8">
         <h1 className="font-bold text-lg md:text-2xl mb-4">Tentang Sekolah Kami</h1>
         <p className="text-sm md:text-lg bg-mainblue/60 p-4 rounded-md">
         SD Negeri Ragunan 14 Pagi merupakan salah satu sekolah dasar negeri
yang memiliki reputasi baik di lingkungan Kecamatan Pasar Minggu. Sekolah ini
dikenal aktif dalam mengikuti berbagai program peningkatan mutu pendidikan
yang diselenggarakan oleh Dinas Pendidikan Provinsi DKI Jakarta. murid
maupun pendidik kerap meraih prestasi baik di bidang akademik maupun nonakademik. Komitmen terhadap peningkatan kualitas pendidikan, pembentukan
karakter, dan penguatan profil pelajar Pancasila menjadi fokus utama dalam
pengelolaan satuan pendidikan.
         </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
         <div className="space-y-6">
            <div className="bg-secondblue rounded-lg text-center content-start items-start text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
               <h1 className="font-bold text-lg md:text-2xl mb-4">Identitas Sekolah</h1>
               <Table>
                  <TableBody sx={{color: '#f9fafa' }}>
                     {dataIdentitas.map((i) => (
                        <TableRow>
                           <TableCell sx={{ color: '#f9fafa', width: 2/5, fontWeight: 700}}>
                              <p className="text-xs md:text-sm">
                                 {i.title}
                              </p>
                           </TableCell>
                           <TableCell sx={{ color: '#f9fafa'}}>
                              <p className="text-xs md:text-sm">
                              : {i.nama}
                              </p>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
            <div className="bg-secondblue rounded-lg text-center content-start items-start text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
               <h1 className="font-bold text-lg md:text-2xl mb-4">Kontak Sekolah</h1>
               <Table>
                  <TableBody>
                     {dataKontak.map((i) => (
                        <TableRow>
                           <TableCell sx={{ color: '#f9fafa', width: 2/5, fontWeight: 700}}>
                           <p className="text-xs md:text-sm">
                              {i.title}
                           </p>
                           </TableCell>
                           <TableCell sx={{ color: '#f9fafa'}}>
                              <div className="max-w-[300px] overflow-hidden">
                                 <p className="text-xs md:text-sm line-clamp-2">
                                    : {i.nama}
                                 </p>
                              </div>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
         </div>
         <div className="space-y-6">
            <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
               <h1 className="font-bold text-lg md:text-2xl mb-4">Data Pelengkap</h1>
               <Table>
                  <TableBody>
                     {dataPelengkap.map((i) => (
                        <TableRow>
                           <TableCell sx={{ color: '#f9fafa', width: 2/5, fontWeight: 700}}>
                              <p className="text-xs md:text-sm">
                                 {i.title}
                              </p>
                           </TableCell>
                           <TableCell sx={{ color: '#f9fafa'}}>
                           <p className="text-xs md:text-sm">
                              : {i.nama}
                           </p>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
            <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
               <h1 className="font-bold text-lg md:text-2xl mb-4">Peta Lokasi</h1>
               <iframe
                  title="map"
                  src={src}
                  className="w-full h-full hover:scale-105 transition-all duration-300 ease-in-out"
                  allowFullScreen
                  loading="lazy"
               />
            </div>
         </div>
      </div>
   </>
   )
}