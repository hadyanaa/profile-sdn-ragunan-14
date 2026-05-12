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
      <div className="page-stack">
      <div className="panel-card-blue text-center">
         <h1 className="text-xl font-extrabold md:text-3xl mb-4">Tentang Sekolah Kami</h1>
         <p className="mx-auto max-w-4xl rounded-lg bg-white/10 p-5 text-sm leading-7 text-white/90 md:text-lg md:leading-8">
         SD Negeri Ragunan 14 Pagi merupakan salah satu sekolah dasar negeri
yang memiliki reputasi baik di lingkungan Kecamatan Pasar Minggu. Sekolah ini
dikenal aktif dalam mengikuti berbagai program peningkatan mutu pendidikan
yang diselenggarakan oleh Dinas Pendidikan Provinsi DKI Jakarta. murid
maupun pendidik kerap meraih prestasi baik di bidang akademik maupun nonakademik. Komitmen terhadap peningkatan kualitas pendidikan, pembentukan
karakter, dan penguatan profil pelajar Pancasila menjadi fokus utama dalam
pengelolaan satuan pendidikan.
         </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="space-y-6">
            <div className="panel-card content-start items-start">
               <h1 className="panel-title text-center mb-4">Identitas Sekolah</h1>
               <Table>
                  <TableBody>
                     {dataIdentitas.map((i) => (
                        <TableRow key={i.title}>
                           <TableCell sx={{ color: '#0a4ea0', width: 2/5, fontWeight: 800}}>
                              <p className="text-xs md:text-sm">
                                 {i.title}
                              </p>
                           </TableCell>
                           <TableCell sx={{ color: '#334155'}}>
                              <p className="text-xs md:text-sm leading-6">
                              : {i.nama}
                              </p>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
            <div className="panel-card content-start items-start">
               <h1 className="panel-title text-center mb-4">Kontak Sekolah</h1>
               <Table>
                  <TableBody>
                     {dataKontak.map((i) => (
                        <TableRow key={i.title}>
                           <TableCell sx={{ color: '#0a4ea0', width: 2/5, fontWeight: 800}}>
                           <p className="text-xs md:text-sm">
                              {i.title}
                           </p>
                           </TableCell>
                           <TableCell sx={{ color: '#334155'}}>
                              <div className="max-w-[300px] overflow-hidden">
                                 <p className="text-xs md:text-sm leading-6 line-clamp-2">
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
            <div className="panel-card text-center">
               <h1 className="panel-title mb-4">Data Pelengkap</h1>
               <Table>
                  <TableBody>
                     {dataPelengkap.map((i) => (
                        <TableRow key={i.title}>
                           <TableCell sx={{ color: '#0a4ea0', width: 2/5, fontWeight: 800}}>
                              <p className="text-xs md:text-sm">
                                 {i.title}
                              </p>
                           </TableCell>
                           <TableCell sx={{ color: '#334155'}}>
                           <p className="text-xs md:text-sm leading-6">
                              : {i.nama}
                           </p>
                           </TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </div>
            <div className="panel-card text-center">
               <h1 className="panel-title mb-4">Peta Lokasi</h1>
               <iframe
                  title="map"
                  src={src}
                  className="min-h-80 w-full rounded-lg border border-mainblue/10 transition-all duration-300 ease-in-out hover:scale-[1.01]"
                  allowFullScreen
                  loading="lazy"
               />
            </div>
         </div>
      </div>
      </div>
   </>
   )
}
