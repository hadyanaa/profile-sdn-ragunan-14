import LogoSD from "../../../components/LogoSD";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import Pengumuman from "./PengumumanSekolah";

export default function ListPengumuman() {
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
   <>
      <LogoSD titlePage="Informasi" isTitlePage />
      <div className="flex flex-col gap-8 px-4 sm:px-8 md:px-28 font-jakarta mb-8">
         <Pengumuman />
         {/* <Box sx={{ width: '100%', marginTop: '4px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} variant="scrollable" onChange={handleChange} aria-label="basic tabs example">
               <Tab label="Pengumuman Sekolah" />
               <Tab label="Informasi Sekolah" />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
               Ini Informasi
            </CustomTabPanel>
         </Box> */}
      </div>
   </>
  );
}