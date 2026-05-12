import LogoSD from "../../../components/LogoSD";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import Prestasi from "./Prestasi";
import StatistikPrestasi from "./StatistikPrestasi";
import { useAppStore } from "../../../store/useAppStore";

export default function ListPrestasi() {
   const [value, setValue] = useState(0);
   const { loading } = useAppStore();

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
   <>
      { loading ? (
         <div className="loading-toast">
            <img className="h-8 w-8" src="/assets/video/Rippletransparent.gif" alt="" />
            <span>Memuat data terbaru...</span>
         </div>
      ) : (
         <></>
      )}
      <LogoSD titlePage="Prestasi Siswa" isTitlePage />
      <div className="page-shell page-stack">
         <StatistikPrestasi />
         <Prestasi />
      </div>
   </>
);
}
