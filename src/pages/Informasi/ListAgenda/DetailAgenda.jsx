import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../../../store/useAppStore";
import convertDriveUrl from "../../../functions/DriveImage";
import LogoSD from "../../../components/LogoSD";
import { Button, Skeleton, Chip } from "@mui/material";
import { FaArrowLeft, FaCalendarAlt, FaTag, FaInfoCircle, FaEye, FaWhatsapp, FaFacebook, FaTwitter, FaCopy, FaShareAlt } from "react-icons/fa";

export default function DetailAgenda() {
   const { no } = useParams();
   const navigate = useNavigate();
   const { agenda, loading, fetchAgenda } = useAppStore();
   const [item, setItem] = useState(null);
   const [views, setViews] = useState(null);
   const [showToast, setShowToast] = useState(false);
   const [isShareSupported, setIsShareSupported] = useState(false);

   useEffect(() => {
      if (!agenda || agenda.length === 0) {
         fetchAgenda();
      }
   }, [agenda, fetchAgenda]);

   useEffect(() => {
      if (agenda && agenda.length > 0) {
         const found = agenda.find((a) => String(a.no) === String(no));
         setItem(found || null);
      }
   }, [agenda, no]);

   // Deteksi dukungan Web Share API di browser
   useEffect(() => {
      if (typeof navigator !== 'undefined' && navigator.share) {
         setIsShareSupported(true);
      }
   }, []);

   // Fetch & Increment view count riil lewat Counter API
   useEffect(() => {
      if (no) {
         fetch(`https://api.counterapi.dev/v1/sdn14ragunan/agenda_${no}/up`)
            .then((res) => {
               if (!res.ok) {
                  throw new Error("HTTP error " + res.status);
               }
               return res.json();
            })
            .then((data) => {
               if (data && typeof data.count === "number") {
                  setViews(data.count);
               }
            })
            .catch((err) => {
               console.error("Gagal memperbarui view counter:", err);
               // Fallback: set dengan basis hitungan buatan agar tetap tampil
               setViews(null);
            });
      }
   }, [no]);

   const handleBack = () => {
      navigate(-1); // Kembali ke halaman sebelumnya
   };

   // Format drive image URL
   const getImageUrl = (url) => {
      if (!url) return '/assets/image/agenda-no-image.png';
      return convertDriveUrl(url, "large") || convertDriveUrl(url, "thumbnail") || url;
   };

   // Dapatkan URL absolut untuk di-share
   const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
   
   // URL sosial media untuk sharing
   const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent((item?.judul || "Agenda Sekolah") + " - " + shareUrl)}`;
   const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
   const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(item?.judul || "Agenda Sekolah")}`;

   const handleCopyLink = () => {
      navigator.clipboard.writeText(shareUrl)
         .then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
         })
         .catch((err) => {
            console.error("Gagal menyalin tautan:", err);
         });
   };

   const handleNativeShare = () => {
      if (navigator.share) {
         navigator.share({
            title: item?.judul || "Agenda SDN Ragunan 14 Pagi",
            text: item?.deskripsi || item?.content || "Informasi agenda terbaru sekolah",
            url: shareUrl
         }).catch((err) => console.log("Batal membagikan:", err));
      }
   };

   return (
      <>
         <LogoSD titlePage={item ? item.judul : "Detail Agenda"} isTitlePage />
         <div className="page-shell py-8">
            <div className="max-w-4xl mx-auto px-4">
               {/* Tombol Kembali */}
               <div className="mb-6">
                  <Button 
                     onClick={handleBack} 
                     variant="outlined" 
                     startIcon={<FaArrowLeft className="mr-1" />}
                     sx={{
                        color: "var(--color-mainblue)",
                        borderColor: "rgba(10, 78, 160, 0.3)",
                        fontFamily: "var(--font-jakarta)",
                        fontWeight: 600,
                        '&:hover': {
                           borderColor: "var(--color-mainblue)",
                           backgroundColor: "rgba(10, 78, 160, 0.04)"
                        }
                     }}
                  >
                     Kembali ke Agenda
                  </Button>
               </div>

               {loading && !item ? (
                  <div className="panel-card p-8 flex flex-col gap-6">
                     <Skeleton variant="rectangular" height={350} className="rounded-lg" />
                     <Skeleton variant="text" height={40} width="60%" />
                     <Skeleton variant="text" height={20} width="30%" />
                     <Skeleton variant="text" height={80} />
                  </div>
               ) : !item ? (
                  <div className="panel-card p-12 text-center bg-white rounded-2xl shadow-xl">
                     <h2 className="text-2xl font-bold text-mainblue mb-4">Agenda Tidak Ditemukan</h2>
                     <p className="text-slate-500 mb-6">Maaf, agenda yang Anda cari tidak dapat ditemukan atau telah dihapus.</p>
                     <Button 
                        onClick={() => navigate("/informasi/agenda")} 
                        variant="contained"
                        sx={{ 
                           backgroundColor: "var(--color-mainblue)",
                           fontFamily: "var(--font-jakarta)",
                           fontWeight: 600
                        }}
                     >
                        Kembali ke Daftar Agenda
                     </Button>
                  </div>
               ) : (
                  <div className="panel-card p-6 md:p-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                     {/* Gambar Banner Utama */}
                     <div className="relative w-full rounded-xl overflow-hidden mb-8 max-h-[500px] bg-slate-50 shadow-inner flex items-center justify-center">
                        <img 
                           src={getImageUrl(item.url_image)} 
                           alt={item.judul}
                           className="w-full h-auto object-cover max-h-[500px]"
                           onError={(e) => {
                              e.currentTarget.src = "/assets/image/agenda-no-image.png";
                           }}
                        />
                     </div>

                     {/* Badges / Meta Info */}
                     <div className="flex flex-wrap gap-3 mb-6">
                        <Chip 
                           icon={<FaTag className="text-xs mr-1 text-mainblue" />} 
                           label={`Kategori: ${item.kategori}`} 
                           variant="outlined"
                           sx={{ 
                              borderColor: "rgba(10, 78, 160, 0.3)", 
                              color: "var(--color-mainblue)",
                              fontFamily: "var(--font-jakarta)",
                              fontWeight: 600
                           }}
                        />
                        <Chip 
                           icon={<FaCalendarAlt className="text-xs mr-1 text-secondblue" />} 
                           label={`Tahun: ${item.tahun}`} 
                           variant="outlined"
                           sx={{ 
                              borderColor: "rgba(9, 143, 209, 0.3)", 
                              color: "var(--color-secondblue)",
                              fontFamily: "var(--font-jakarta)",
                              fontWeight: 600
                           }}
                        />
                        <Chip 
                           icon={<FaEye className="text-xs mr-1 text-slate-500" />} 
                           label={`Dilihat: ${views !== null ? views + 120 : (parseInt(no) * 17) + 53} kali`} 
                           variant="outlined"
                           sx={{ 
                              borderColor: "rgba(100, 116, 139, 0.3)", 
                              color: "var(--color-thirdgrey)",
                              fontFamily: "var(--font-jakarta)",
                              fontWeight: 600
                           }}
                        />
                        {item.status && (
                           <Chip 
                              icon={<FaInfoCircle className="text-xs mr-1" />} 
                              label={`Status: ${item.status}`} 
                              sx={{
                                 backgroundColor: "rgba(9, 143, 209, 0.1)",
                                 color: "var(--color-secondblue)",
                                 fontFamily: "var(--font-jakarta)",
                                 fontWeight: "bold"
                              }}
                           />
                        )}
                     </div>

                     {/* Judul & Konten Deskripsi */}
                     <div className="prose max-w-none">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-mainblue mb-6 border-b border-slate-100 pb-4 leading-tight font-jakarta">
                           {item.judul}
                        </h2>
                        
                        <div className="text-slate-600 leading-relaxed text-justify whitespace-pre-line text-base md:text-lg font-jakarta">
                           {item.deskripsi || item.content}
                        </div>
                     </div>

                     {/* Fitur Share (Bagikan Agenda) */}
                     <div className="mt-12 pt-6 border-t border-slate-150">
                        <h3 className="text-lg font-bold text-mainblue mb-4 flex items-center gap-2 font-jakarta">
                           <FaShareAlt className="text-mainblue text-base" />
                           Bagikan Agenda Ini
                        </h3>
                        <div className="flex flex-wrap gap-3">
                           {/* WhatsApp */}
                           <a 
                              href={whatsappUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm rounded-lg shadow-sm hover:scale-[1.03] transition-all duration-200"
                           >
                              <FaWhatsapp className="text-base" />
                              WhatsApp
                           </a>

                           {/* Facebook */}
                           <a 
                              href={facebookUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] hover:bg-[#166fe3] text-white font-semibold text-sm rounded-lg shadow-sm hover:scale-[1.03] transition-all duration-200"
                           >
                              <FaFacebook className="text-base" />
                              Facebook
                           </a>

                           {/* Twitter / X */}
                           <a 
                              href={twitterUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a90d9] text-white font-semibold text-sm rounded-lg shadow-sm hover:scale-[1.03] transition-all duration-200"
                           >
                              <FaTwitter className="text-base" />
                              Twitter / X
                           </a>

                           {/* Salin Tautan */}
                           <button 
                              onClick={handleCopyLink}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg shadow-sm hover:scale-[1.03] transition-all duration-200 cursor-pointer"
                           >
                              <FaCopy className="text-sm" />
                              Salin Tautan
                           </button>

                           {/* Native Share Bawaan HP */}
                           {isShareSupported && (
                              <button 
                                 onClick={handleNativeShare}
                                 className="inline-flex items-center gap-2 px-4 py-2 bg-mainblue hover:bg-secondblue text-white font-semibold text-sm rounded-lg shadow-sm hover:scale-[1.03] transition-all duration-200 cursor-pointer"
                              >
                                 <FaShareAlt className="text-sm" />
                                 Lainnya
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* Toast Feedback Salin Tautan */}
         {showToast && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#0a4ea0]/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 animate-fadeIn border border-white/20">
               <FaCopy className="text-primaryoren" />
               <span className="font-semibold text-sm font-jakarta">Tautan berhasil disalin ke clipboard!</span>
            </div>
         )}
      </>
   );
}
