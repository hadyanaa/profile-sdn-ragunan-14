import { Skeleton } from "@mui/material";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CustomTooltip } from "../../../components/CustomTooltip";
import { useAppStore } from "../../../store/useAppStore";

export default function StatistikPrestasi() {
   const { prestasi, loading, error, fetchPrestasi } = useAppStore();

   useEffect(() => {
      if (prestasi.length === 0) {
         // hanya fetch kalau data belum ada
         fetchPrestasi();
      }
   }, [prestasi, fetchPrestasi]);
   const styleStat = "border-2 rounded-lg p-4 flex flex-col items-center text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out"
   console.log(prestasi);
   const jumlahPrestasiInternasional = prestasi.filter(items => items.tingkat === "Internasional").length
   const jumlahPrestasiNasional = prestasi.filter(items => items.tingkat === "Nasional").length
   const jumlahPrestasiProvinsi = prestasi.filter(items => items.tingkat === "Provinsi").length
   const jumlahPrestasiKota = prestasi.filter(items => items.tingkat === "Kota").length

   // distribusi tingkat prestasi
   const colors = ["#19AC4F", "#EF4444", "#0a4ea0", "#f2df0c"];

   const dataTingkatPrestasi = [
      { name: 'Internasional', value:prestasi.filter(items => items.tingkat === "Internasional").length, fill: colors[1 % colors.length] },
      { name: 'Nasional', value: prestasi.filter(items => items.tingkat === "Nasional").length, fill: colors[2 % colors.length]},
      { name: 'Provinsi', value: prestasi.filter(items => items.tingkat === "Provinsi").length, fill: colors[3 % colors.length]},
      { name: 'Kota', value: prestasi.filter(items => items.tingkat === "Kota").length, fill: colors[4 % colors.length]},
      { name: 'Kecamatan', value: prestasi.filter(items => items.tingkat === "Kecamatan").length, fill: colors[5 % colors.length]},
      { name: 'Lainnya', value: prestasi.filter(items => items.tingkat === "Lainnya").length, fill: colors[6 % colors.length]},
   ]

   const dataTahunPrestasi = [
      { name: '2021', value:prestasi.filter(items => items.tahun === 2021).length, fill: colors[1 % colors.length] },
      { name: '2022', value:prestasi.filter(items => items.tahun === 2022).length, fill: colors[2 % colors.length] },
      { name: '2023', value:prestasi.filter(items => items.tahun === 2023).length, fill: colors[3 % colors.length] },
      { name: '2024', value:prestasi.filter(items => items.tahun === 2024).length, fill: colors[4 % colors.length] },
      { name: '2025', value:prestasi.filter(items => items.tahun === 2025).length, fill: colors[5 % colors.length] },
   ]

   const dataKategoriPrestasi = [
      { name: 'Akademik', value:prestasi.filter(items => items.kategori === "Akademik").length, fill: colors[1 % colors.length] },
      { name: 'Seni', value:prestasi.filter(items => items.kategori === "Seni").length, fill: colors[2 % colors.length] },
      { name: 'Agama', value:prestasi.filter(items => items.kategori === "Agama").length, fill: colors[3 % colors.length] },
      { name: 'Olahraga', value:prestasi.filter(items => items.kategori === "Olahraga").length, fill: colors[4 % colors.length] },
   ]
   return (
      <>
         <div className="mt-8 bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-2xl ">Statistik Umum</h1>
            <span className="font-medium text-md">Ringkasan data prestasi sekolah</span>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : prestasi.length}
                  </p>
                  Jumlah Prestasi
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : jumlahPrestasiInternasional}
                  </p>
                  Tingkat Internasional
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : jumlahPrestasiNasional}
                  </p>
                  Tingkat Nasional
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : jumlahPrestasiProvinsi }
                  </p>
                  Tingkat Provinsi
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : jumlahPrestasiKota }
                  </p>
                  Tingkat Kota
               </div>
            </div>
         </div>
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-2xl ">Visualisasi Data</h1>
            <span className="font-medium text-md">Grafik dan diagram distribusi data siswa sekolah</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
               <div className={styleStat + " h-80"}>
                  <div className="h-60">
                     <p className="font-extrabold text-xl text-center mb-4">
                        Distribusi Tingkat Prestasi
                     </p>
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : 
                     <ResponsiveContainer>
                        <PieChart width={700} height={200}>
                           <Legend iconType="square" wrapperStyle={{ fontWeight: 400 }} />
                           <Pie
                              data={dataTingkatPrestasi}
                              dataKey="value"
                           />
                           <Tooltip content={(props) => <CustomTooltip {...props} isPie />} wrapperStyle={{ outline: 'none' }}/>
                        </PieChart>
                     </ResponsiveContainer>
                     }
                  </div>
               </div>
               {/* <div className={styleStat + " h-80"}>
                  <div className="h-60">
                     <p className="font-extrabold text-xl text-center mb-4">
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
               </div> */}
               <div className={styleStat + " h-80"}>
                  <p className="font-extrabold text-xl text-center mb-4">
                     Distribusi Kategori Prestasi
                  </p>
                  <div className="font-medium text-md w-full h-72">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart
                              width={600}
                              height={300}
                              data={dataKategoriPrestasi}
                              margin={{
                                 top: 5,
                                 right: 30,
                                 left: 20,
                                 bottom: 5,
                              }}
                           >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} height={20} dataKey="name" />
                              <YAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} />
                              <Tooltip content={CustomTooltip} wrapperStyle={{ outline: 'none' }}/>
                              <Bar radius={[5, 5, 0, 0]} dataKey="value" fill="#0a4ea0" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                           </BarChart>
                        </ResponsiveContainer>
                     }
                  </div>
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-xl text-center mb-4">
                     Distribusi Tahun Prestasi
                  </p>
                  <div className="font-medium text-md w-full h-72 text-center rounded-2xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                     <ResponsiveContainer>
                        <LineChart 
                           margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                           }}
                           width={10} height={300} data={dataTahunPrestasi}>
                           <XAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} height={20} dataKey="name" />
                           <YAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} />
                           <Tooltip content={CustomTooltip} wrapperStyle={{ outline: 'none' }}/>
                           <Line type="monotone" dataKey="value" stroke="#f2df0c " activeDot={{ r: 8 }} />
                        </LineChart>
                     </ResponsiveContainer>}
                  </div>
               </div>
               
            </div>
         </div>
      </>
   )

}