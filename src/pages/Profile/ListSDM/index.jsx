import LogoSD from "../../../components/LogoSD";
import StatistikSDM from "./StatistikSDM";
import TableSDM from "./TableSDM";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import { useAppStore } from "../../../store/useAppStore";
import StrukturOrganisasi from "./StrukturSekolah";


export default function ListSdm() {
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
      <LogoSD titlePage="Data Guru & Tenaga Kependidikan" isTitlePage />
      <div className="page-shell">
         <Box className="panel-card" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'rgba(10, 78, 160, 0.12)' }}>
            <Tabs value={value} variant="scrollable" onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
               <Tab label="Data dan Statistik" />
               <Tab label="Struktur Organisasi" />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
               <StatistikSDM />
               <TableSDM />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
               <StrukturOrganisasi />
            </CustomTabPanel>
         </Box>
      </div>
   </>
  );
}
