import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import dayGridPlugin from "@fullcalendar/daygrid";
import idLocale from "@fullcalendar/core/locales/id";
import { useEffect, useState } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { formatTanggal } from "../../../functions/FormatTanggal";

export default function KalenderAkademik() {
   const { kalender, loading, error, fetchKalender } = useAppStore();
   const [selectedEvent, setSelectedEvent] = useState(null);

   useEffect(() => {
      if (kalender?.length === 0) {
         // hanya fetch kalau data belum ada
         fetchKalender();
      }
   }, [kalender, fetchKalender]);

   const handleEventClick = (info) => {
      setSelectedEvent({
         title: info.event.title,
         start: info.event.start,
         end: info.event.end,
         extendedProps: {
            deskripsi: info.event.deskripsi,
            kategori: info.event.kategori
         } 
      });
   };

   const closeModal = () => {
      setSelectedEvent(null);
   };

   const renderEventContent = (eventInfo) => {
      let bgColor = "bg-gray-400"; // default
      switch (eventInfo.event.extendedProps.kategori) {
         case "Libur":
         bgColor = "bg-red-500";
         break;
         case "Hari Besar":
         bgColor = "bg-green-500";
         break;
         case "Ujian":
         bgColor = "bg-blue-500";
         break;
         case "Event":
         bgColor = "bg-fuchsia-500";
         break;
         default:
         bgColor = "bg-gray-400";
      }
      return (
         <div className={`text-white px-1 py-0.5 rounded ${bgColor}`}>
            {eventInfo.event.title}
         </div>
      );
   }

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
         <div className="data-table-panel">
            <FullCalendar
               plugins={[multiMonthPlugin, dayGridPlugin]}
               initialView="multiMonthYear"
               locales={[idLocale]}
               locale="id" 
               headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "multiMonthYear,dayGridMonth",
               }}
               events={kalender}
               eventClick={handleEventClick}
               eventContent={renderEventContent}
            />
            {/* Modal */}
            {selectedEvent && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-mainblue/20 p-4 backdrop-blur-sm">
                  <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl shadow-blue-950/20">
                     <h2 className="text-xl font-extrabold mb-2 text-mainblue">{selectedEvent.title}</h2>
                     <p className="text-gray-600 text-sm mb-2">
                        {formatTanggal(selectedEvent.start)}
                        {selectedEvent.end
                           ? ` – ${formatTanggal(selectedEvent.end)}`
                           : ""}
                     </p>
                     {/* <p className="text-gray-600 mb-4">Deskripsi: {selectedEvent.extendedProps.deskripsi}</p> */}
                     <button
                     onClick={closeModal}
                     className="brand-button brand-button--compact"
                     >
                     Tutup
                     </button>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}
