import LogoSD from "../../../components/LogoSD";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from "react";
import CustomTabPanel from "../../../components/CustomTabPanel";
import Agenda from "./AgendaSekolah";
import KalenderAkademik from "./KalenderAkademik";

export default function ListAgenda() {
   const [value, setValue] = useState(0);
   

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   return (
   <>
      <LogoSD titlePage="Agenda" isTitlePage />
      <div className="page-shell">
         <Box className="panel-card" sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'rgba(10, 78, 160, 0.12)' }}>
            <Tabs value={value} variant="scrollable" onChange={handleChange} aria-label="basic tabs example" textColor="primary" indicatorColor="primary">
               <Tab label="Agenda Sekolah" />
               <Tab label="Kalender Sekolah" />
            </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
               <Agenda />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
               <KalenderAkademik />
            </CustomTabPanel>
         </Box>
      </div>
   </>
  );
}
