import LogoSD from "../../../components/LogoSD";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import Prestasi from "./Prestasi";
import StatistikPrestasi from "./StatistikPrestasi";

export default function ListPrestasi() {
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
   <>
      <LogoSD titlePage="Prestasi Siswa" isTitlePage />
      <div className="flex flex-col gap-8 px-28 font-jakarta">
         <StatistikPrestasi />
         <Prestasi />
      </div>
   </>
  );
}