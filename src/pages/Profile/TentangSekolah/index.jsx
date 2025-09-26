import { useState } from "react";
import LogoSD from "../../../components/LogoSD";
import { useAppStore } from "../../../store/useAppStore";
import Tentang from "./Tentang";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CustomTabPanel from "../../../components/CustomTabPanel";

export default function TentangSekolah() {
   const [value, setValue] = useState(0);
   const { loading } = useAppStore();
   
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

  return(
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
      <LogoSD titlePage="Profil" isTitlePage />
      <div className="flex flex-col gap-8 px-8 sm:px-14 md:px-28 font-jakarta">
         <Box sx={{ width: '100%', marginTop: '4px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} variant="scrollable" onChange={handleChange} aria-label="basic tabs example">
               <Tab label="Tentang Sekolah" />
               <Tab label="Fasilitas Sekolah" />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
               <Tentang />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
               Ini Fasilitas Sekolah
            </CustomTabPanel>
         </Box>
      </div>
    </>

  ) 
}