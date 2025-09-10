import { Card, CardActionArea, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import LogoSD from "../../components/LogoSD";
import ModalDetail from "../../components/ModalDetail";
import { Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const CustomTooltip = ({ active, payload, label, isPie }) => {
  const isVisible = active && payload && payload.length;
  return (
    <div className="text-mainblue rounded-lg p-4 border bg-whiteprime/80" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
        <>
          <p className="font-bold text-xl">{`${isPie ? payload[0].name : label}`}</p>
          <p className="font-medium text-sm">{`Jumlah: ${payload[0].value}`}</p></>
      )}
    </div>
  );
};

export default function ListSdm() {
  const [ListSdm, setListSdm] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbw_-N7YydFlgBTNA7oBVnfl-zgHyo8vivk-IEYL-OPdBvpyqOfgFYAeXv-EKfnY3to/exec")
      .then((res) => res.json())
      .then((result) => {
      setListSdm(result);
      setLoading(false);
      })
      .catch((error) => {
      console.error("Error fetching data:", error);
      setLoading(false);
      });
  }, []);

  console.log(ListSdm);
   const styleStat = "border-2 rounded-lg p-4 flex flex-col items-center text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out"

   // type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;

   const dataGender = [
      { name: 'Laki-laki', value: ListSdm.filter(items => items.gender === "L").length, fill: "#0A4EA0" },
      { name: 'Perempuan', value: ListSdm.filter(items => items.gender === "P").length, fill: "#EC4899" },
   ];

   const dataPendidikan = [
      { name: 'SMA/Sederajat', value: ListSdm.filter(items => items.pendidikan === "SMA/Sederajat").length, fill: "#F59E0B" },
      { name: 'D-3', value: ListSdm.filter(items => items.pendidikan === "D-3").length, fill: "#EF4444" },
      { name: 'S1', value: ListSdm.filter(items => items.pendidikan === "S1").length, fill: "#10B981" },
   ];

   const dataUsia = [
      { name: '<30 Tahun', value: ListSdm.filter(items => items.usia < 30).length, fill: "#F59E0B" },
      { name: '30-39 Tahun', value: ListSdm.filter(items => items.usia >= 30 && items.usia < 40).length, fill: "#EF4444" },
      { name: '40-49 Tahun', value: ListSdm.filter(items => items.usia >= 40 && items.usia < 50).length, fill: "#EF4444" },
      { name: '50-59 Tahun', value: ListSdm.filter(items => items.usia >= 50 && items.usia < 60).length, fill: "#EF4444" },
      { name: '60+ Tahun', value: ListSdm.filter(items => items.usia > 60).length, fill: "#EF4444" },
   ];

   return (
   <>
      <LogoSD titlePage="Data Guru & Tenaga Kependidikan" isTitlePage />
      <div className="flex flex-col gap-8 px-28 font-jakarta">
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-8 w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-2xl ">Statistik Umum</h1>
            <span className="font-medium text-md">Ringkasan data guru dan tenaga kependidikan sekolah</span>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : ListSdm.length}
                  </p>
                  Total
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : ListSdm.filter(items => items.status === "PNS" || items.status === "CPNS" || items.status === "PPPK").length}
                  </p>
                  ASN
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : ListSdm.filter(items => items.status === "KKI").length}
                  </p>
                  KKI
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-4xl">
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     : ListSdm.filter(items => items.status === "Honor Murni").length}
                  </p>
                  Honor Murni
               </div>
            </div>
         </div>
         <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-8 w-full p-8 bg-[url(/assets/image/pattern.png)]">
            <h1 className="font-bold text-2xl ">Visualisasi Data</h1>
            <span className="font-medium text-md">Grafik dan diagram distribusi data sekolah</span>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
               <div className={styleStat + " h-80"}>
                  <p className="font-extrabold text-xl h-60">
                     Distribusi Gender
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
                  </p>
               </div>
               <div className={styleStat + " h-80"}>
                  <p className="font-extrabold text-xl h-60">
                     Distribusi Pendidikan
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                     <ResponsiveContainer>
                        <PieChart width={700} height={200}>
                           <Legend iconType="square" wrapperStyle={{ fontWeight: 400 }} />
                           <Tooltip content={(props) => <CustomTooltip {...props} isPie />} wrapperStyle={{ outline: 'none' }}/>
                           <Pie
                              data={dataPendidikan}
                              dataKey="value"
                              innerRadius={50}
                           />
                        </PieChart>
                     </ResponsiveContainer>}
                  </p>
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-xl text-center">
                     Distribusi Usia
                  </p>
                  <p className="font-medium text-md w-full h-72 text-center rounded-2xl">
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
                           width={800} height={300} data={dataUsia}>
                           <XAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} height={20} dataKey="name" />
                           <YAxis tick={{ fill: 'white', fontSize: 12 }} axisLine={{ stroke: 'white' }} />
                           <Tooltip content={CustomTooltip} wrapperStyle={{ outline: 'none' }}/>
                           <Line type="monotone" dataKey="value" stroke="#f2df0c " activeDot={{ r: 8 }} />
                        </LineChart>
                     </ResponsiveContainer>}
                  </p>
               </div>
               <div className={styleStat}>
                  <p className="font-extrabold text-xl h-80">
                     Masa Kerja
                     {loading ?
                        <Skeleton animation="wave" variant="overlay">
                        </Skeleton>
                     :
                     <ResponsiveContainer>
                        <PieChart width={700} height={200}>
                           <Legend iconType="square" wrapperStyle={{ fontWeight: 400 }} />
                           <Tooltip wrapperStyle={{ fontWeight: 400, fontSize: "15px"}} />
                           <Pie
                              data={dataPendidikan}
                              dataKey="value"
                              innerRadius={50}
                           />
                        </PieChart>
                     </ResponsiveContainer>}
                  </p>
               </div>
            </div>
         </div>
      </div>
   </>
  );
}
