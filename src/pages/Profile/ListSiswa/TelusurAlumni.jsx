import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip, CustomTooltipDapa } from "../../../components/CustomTooltip";
import { useAppStore } from "../../../store/useAppStore";

export default function TelusurAlumni() {
   const { siswa,alumni, loading, error, fetchSiswa, fetchAlumni } = useAppStore();
   
   useEffect(() => {
      if (alumni.length === 0) {
         // hanya fetch kalau data belum ada
         fetchAlumni();
      }
   }, [alumni, fetchAlumni]);
   const styleStat = "border-2 rounded-lg p-4 flex flex-col items-center text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out"

   const dataRombel = siswa.filter(items => items.no < 13)
   const dayaTampung = dataRombel.length*32;
   const totalLk = dataRombel.reduce((sum, item) => sum + item.lk, 0);
   const totalPr = dataRombel.reduce((sum, item) => sum + item.pr, 0);
   const totalSiswa = totalLk + totalPr;
   // Visualisasi data
   const colors = ["#19AC4F", "#EF4444", "#10B981"];
   const dataGenderAlumni = [
      { name: 'Laki-laki', value: alumni.filter(item => item.jk === "L").length, fill: "#0A4EA0" },
      { name: 'Perempuan', value: alumni.filter(item => item.jk === "P").length, fill: "#EC4899" },
   ];

   const dataSebaranAlumni = [
      { name: 'Swasta', value: alumni.filter(item => item.status_sekolah_lulus === "Swasta").length, fill: "#34A853" },
      { name: 'Negeri', value: alumni.filter(item => item.status_sekolah_lulus === "Negeri").length, fill: "#f2df0c" },
   ];

   const dataUsiaApi = siswa.filter(items => items.no > 5 && items.no < 15)
   const dataUsia = dataUsiaApi.map((item, index) => ({
      name: String(item.no + ' Tahun'),   // "kode agama" pakai no
      value: item.usia,       // value dari field agama
      fill: colors[index % colors.length] // supaya warna beda-beda
   }));

   // keterangan: 1. Islam; 2. Kristen; 3. -
   const dataAgamaApi = siswa.filter(items => items.no > 0 && items.no < 3)
   const dataAgama = dataAgamaApi.map((item, index) => ({
      name: String(item.no === 1 ? 'Islam' : 'Kristen'),   // "kode agama" pakai no
      value: item.agama,       // value dari field agama
      fill: colors[index % colors.length] // supaya warna beda-beda
   }));

   // data siswa per rombel (dspr)
   const dspr = dataRombel.map((item, index) => ({
      name: item.nama,
      lk: item.lk,
      pr: item.pr
   }))

   // data alumni per gender
   const dapg = {};

   alumni.forEach(({ tahun_kelulusan, jk }) => {
   if (!dapg[tahun_kelulusan]) {
      dapg[tahun_kelulusan] = { name: tahun_kelulusan, l: 0, p: 0 };
   }
   if (jk.toLowerCase() === "l") {
      dapg[tahun_kelulusan].l += 1;
   } else if (jk.toLowerCase() === "p") {
      dapg[tahun_kelulusan].p += 1;
   }
   });

   // ubah ke array
   const resDapg = Object.values(dapg);

   // data alumni per angkatan
   const dapa = {};

   alumni.forEach(({ tahun_kelulusan, status_sekolah_lulus }) => {
   if (!dapa[tahun_kelulusan]) {
      dapa[tahun_kelulusan] = { name: tahun_kelulusan, swasta: 0, negeri: 0 };
   }
   if (status_sekolah_lulus.toLowerCase() === "swasta") {
      dapa[tahun_kelulusan].swasta += 1;
   } else if (status_sekolah_lulus.toLowerCase() === "negeri") {
      dapa[tahun_kelulusan].negeri += 1;
   }
   });

   // ubah ke array
   const resDapa = Object.values(dapa);
   return (
      <>
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-xl md:text-2xl">Statistik Umum</h1>
            <span className="font-medium text-sm md:text-md">Ringkasan data telusur alumni</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : alumni.length}
                  </p>
                  Total Alumni
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : alumni.filter(item => item.status_sekolah_lulus === "Negeri").length}
                  </p>
                  Jumlah Alumni Negeri
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : alumni.filter(item => item.status_sekolah_lulus === "Swasta").length }
                  </p>
                  Jumlah Alumni Swasta
               </div>
            </div>
         </div>
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-4 w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-xl md:text-2xl">Visualisasi Data</h1>
            <span className="font-medium text-sm md:text-md">Grafik dan diagram distribusi data telusur alumni</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
               <div className={styleStat + " h-64 md:h-80"}>
                  <div className="h-52 md:h-60">
                     <p className="font-extrabold text-lg md:text-xl text-center mb-0 sm:mb-1 md:mb-4">
                        Distribusi Gender
                     </p>
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : 
                     <ResponsiveContainer>
                        <PieChart width={700} height={200}>
                           <Legend iconType="square" wrapperStyle={{ fontWeight: 400 }} />
                           <Pie
                              data={dataGenderAlumni}
                              dataKey="value"
                           />
                           <Tooltip content={(props) => <CustomTooltip {...props} isPie />} wrapperStyle={{ outline: 'none' }}/>
                        </PieChart>
                     </ResponsiveContainer>
                     }
                  </div>
               </div>
               <div className={styleStat + " h-72 md:h-80"}>
                  <div className="h-52 md:h-60">
                     <p className="font-extrabold text-lg md:text-xl text-center mb-0 sm:mb-1 md:mb-4">
                        Distribusi Sebaran Alumni
                     </p>
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                     <ResponsiveContainer>
                        <PieChart width={700} height={200}>
                           <Legend iconType="square" wrapperStyle={{ fontWeight: 400 }} />
                           <Tooltip content={(props) => <CustomTooltip {...props} isPie />} wrapperStyle={{ outline: 'none' }}/>
                           <Pie
                              data={dataSebaranAlumni}
                              dataKey="value"
                              innerRadius={50}
                           />
                        </PieChart>
                     </ResponsiveContainer>}
                  </div>
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-lg md:text-xl text-center mb-0 sm:mb-1 md:mb-4">
                     Jumlah Alumni Per Gender
                  </p>
                  <div className="font-medium text-sm md:text-md w-full h-56 md:h-72 text-center rounded-2xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                     <ResponsiveContainer>
                        <LineChart 
                           margin={{
                              top: 15,
                              right: 10,
                              left: -30,
                              bottom: 5,
                           }}
                           width={10} height={300} data={resDapg}>
                           <XAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} height={20} dataKey="name" />
                           <YAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} />
                           <Tooltip content={(props) => <CustomTooltip {...props} isDapg />} wrapperStyle={{ outline: 'none' }}/>
                           <Line type="monotone" dataKey="l" stroke="#0A4EA0" strokeWidth={3} activeDot={{ r: 8 }} />
                           <Line type="monotone" dataKey="p" stroke="#EC4899" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                     </ResponsiveContainer>}
                  </div>
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-lg md:text-xl text-center mb-0 sm:mb-1 md:mb-4">
                     Jumlah Alumni Per Angkatan
                  </p>
                  <div className="font-medium text-sm md:text-md w-full h-56 md:h-72">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart
                              width={600}
                              height={300}
                              data={resDapa}
                              margin={{
                                 top: 15,
                                 right: 10,
                                 left: -30,
                                 bottom: 5,
                              }}
                           >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} height={20} dataKey="name" />
                              <YAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} />
                              <Tooltip content={CustomTooltipDapa} wrapperStyle={{ outline: 'none' }}/>
                              <Legend iconType="square" wrapperStyle={{ fontWeight: 400 }} />
                              <Bar radius={[5, 5, 0, 0]} dataKey="swasta" fill="#34A853" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                              <Bar radius={[5, 5, 0, 0]} dataKey="negeri" fill="#f2df0c" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                           </BarChart>
                        </ResponsiveContainer>
                     }
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}