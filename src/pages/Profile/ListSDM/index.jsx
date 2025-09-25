import LogoSD from "../../../components/LogoSD";
import StatistikSDM from "./StatistikSDM";
import TableSDM from "./TableSDM";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import { useAppStore } from "../../../store/useAppStore";


export default function ListSdm() {
   const [value, setValue] = useState(0);
   const { loading } = useAppStore();
   

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
   <>
      { loading ? (
         <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
               <img className="w-32 md:w-auto h-auto" src="/assets/video/Rippletransparent.gif" alt="" />
            </div>
         </>
      ) : (
         <></>
      )}
      <LogoSD titlePage="Data Guru & Tenaga Kependidikan" isTitlePage />
      <div className="flex flex-col gap-8 px-4 xs:px-8 sm:px-14 md:px-28 font-jakarta mb-8">
         <Box sx={{ width: '100%', marginTop: '4px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} variant="scrollable" onChange={handleChange} aria-label="basic tabs example">
               <Tab label="Data dan Statistik" />
               <Tab label="Struktur Organisasi" />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
               <StatistikSDM />
               <TableSDM />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            Item Two
            </CustomTabPanel>
         </Box>
      </div>
   </>
  );
}