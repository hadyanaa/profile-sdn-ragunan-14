import LogoSD from "../../../components/LogoSD";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import VmtEkstrakurikuler from "./Ekstrakurikuler";
import TableEkstrakurikuler from "./TableEkstrakurikuler";

export default function Ekstrakurikuler() {
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
   <>
      <LogoSD titlePage="Ekstrakurikuler" isTitlePage />
      <div className="flex flex-col gap-8 px-28 font-jakarta mb-8">
         <Box sx={{ width: '100%', marginTop: '4px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
               <Tab label="Visi Misi Ekstrakurikuler" />
               <Tab label="Daftar Ekstrakurikuler" />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
               <VmtEkstrakurikuler />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
               <TableEkstrakurikuler />
            </CustomTabPanel>
         </Box>
      </div>
   </>
  );
}