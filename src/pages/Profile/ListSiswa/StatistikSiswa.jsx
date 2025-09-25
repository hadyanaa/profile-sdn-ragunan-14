import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "../../../components/CustomTooltip";
import { useAppStore } from "../../../store/useAppStore";

export default function StatistikSiswa() {
   const { siswa, loading, error, fetchSiswa } = useAppStore();
   
   useEffect(() => {
      if (siswa.length === 0) {
         // hanya fetch kalau data belum ada
         fetchSiswa();
      }
   }, [siswa, fetchSiswa]);
   const styleStat = "border-2 rounded-lg p-4 flex flex-col items-center text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out"

   const dataRombel = siswa.filter(items => items.no < 13)
   const dayaTampung = dataRombel.length*32;
   const totalLk = dataRombel.reduce((sum, item) => sum + item.lk, 0);
   const totalPr = dataRombel.reduce((sum, item) => sum + item.pr, 0);
   const totalSiswa = totalLk + totalPr;

   // Visualisasi data
   const colors = ["#19AC4F", "#EF4444", "#10B981"];
   const dataGender = [
      { name: 'Laki-laki', value: totalLk, fill: "#0A4EA0" },
      { name: 'Perempuan', value: totalPr, fill: "#EC4899" },
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
   return (
      <>
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-xl md:text-2xl">Statistik Umum</h1>
            <span className="font-medium text-sm md:text-md">Ringkasan data siswa sekolah</span>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : dayaTampung}
                  </p>
                  Daya Tampung
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : totalSiswa}
                  </p>
                  Jumlah Siswa
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : totalLk }
                  </p>
                  Siswa Laki-laki
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : totalPr }
                  </p>
                  Siswa Perempuan
               </div>
            </div>
         </div>
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-4 w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-xl md:text-2xl">Visualisasi Data</h1>
            <span className="font-medium text-sm md:text-md">Grafik dan diagram distribusi data siswa sekolah</span>
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
                              data={dataGender}
                              dataKey="value"
                           />
                           <Tooltip content={(props) => <CustomTooltip {...props} isPie />} wrapperStyle={{ outline: 'none' }}/>
                        </PieChart>
                     </ResponsiveContainer>
                     }
                  </div>
               </div>
               <div className={styleStat + " h-64 md:h-80"}>
                  <div className="h-52 md:h-60">
                     <p className="font-extrabold text-lg md:text-xl text-center mb-0 sm:mb-1 md:mb-4">
                        Distribusi Agama
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
                              data={dataAgama}
                              dataKey="value"
                              innerRadius={50}
                           />
                        </PieChart>
                     </ResponsiveContainer>}
                  </div>
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-lg md:text-xl text-center mb-0 sm:mb-1 md:mb-4">
                     Distribusi Usia
                  </p>
                  <div className="font-medium text-sm md:text-md w-full h-56 md:h-72 text-center rounded-2xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                     <ResponsiveContainer>
                        <LineChart 
                           margin={{
                              top: 5,
                              right: 30,
                              left: -20,
                              bottom: 5,
                           }}
                           width={10} height={300} data={dataUsia}>
                           <XAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} height={20} dataKey="name" />
                           <YAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} />
                           <Tooltip content={CustomTooltip} wrapperStyle={{ outline: 'none' }}/>
                           <Line type="monotone" dataKey="value" stroke="#f2df0c " activeDot={{ r: 8 }} />
                        </LineChart>
                     </ResponsiveContainer>}
                  </div>
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-lg md:text-xl text-center mb-0 sm:mb-1 md:mb-4">
                     Jumlah Murid Per Kelas
                  </p>
                  <div className="font-medium text-md w-full h-56 md:h-72">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart
                              width={600}
                              height={300}
                              data={dspr}
                              margin={{
                                 top: 5,
                                 right:10,
                                 left: -30,
                                 bottom: 5,
                              }}
                           >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} height={20} dataKey="name" />
                              <YAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} />
                              <Tooltip content={CustomTooltip} wrapperStyle={{ outline: 'none' }}/>
                              <Legend iconType="square" wrapperStyle={{ fontWeight: 400 }} />
                              <Bar radius={[5, 5, 0, 0]} dataKey="lk" fill="#0a4ea0" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                              <Bar radius={[5, 5, 0, 0]} dataKey="pr" fill="#EC4899" activeBar={<Rectangle fill="pink" stroke="blue" />} />
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