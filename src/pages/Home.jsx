import { useEffect, useState } from "react";
import PreviewPage from "../components/PreviewPage";
import { Button, Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import { FaAngleRight, FaAngleLeft, FaTrophy, FaBarsProgress, FaRegNewspaper } from "react-icons/fa6";
import convertDriveUrl from "../functions/DriveImage";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import idLocale from "@fullcalendar/core/locales/id";

function Home() {
  const { 
    agenda, sdm, kalender, siswa, ekskul,
    fetchAgenda, fetchSDM, fetchKalender, fetchSiswa, fetchEkskul,
    loading
  } = useAppStore();

  useEffect(() => {
    if (!agenda || agenda?.length === 0) {
      // hanya fetch kalau data belum ada
      fetchAgenda();
    }
    if (!sdm || sdm?.length === 0) {
      // hanya fetch kalau data belum ada
      fetchSDM();
    }
    if (!kalender || kalender?.length === 0) {
      // hanya fetch kalau data belum ada
      fetchKalender();
    }
    if (!siswa || siswa?.length === 0) {
      // hanya fetch kalau data belum ada
      fetchSiswa();
    }
    if (!ekskul || ekskul?.length === 0) {
      // hanya fetch kalau data belum ada
      fetchEkskul();
    }
  }, []);

  // const jumlahRombel = siswa.nama.length;
  const dataRombel = siswa.filter(items => items.no < 13)
  const totalLk = dataRombel.reduce((sum, item) => sum + item.lk, 0);
  const totalPr = dataRombel.reduce((sum, item) => sum + item.pr, 0);
  const totalSiswa = totalLk + totalPr;
  const slides = [
    { id: 1, text: "Sekolah Ramah dan Berprestasi di Ragunan", bg: "/assets/image/banner/banner-1.png" },
    { id: 2, text: "Belajar Bermakna, Wujudkan Profil Pelajar Pancasila", bg: "/assets/image/banner/banner-2.JPG" },
    { id: 3, text: "Kolaborasi Sekolah dan Masyarakat untuk Masa Depan Gemilang", bg: "/assets/image/banner/banner-3.jpg" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000); // ganti setiap 3 detik
    return () => clearInterval(interval);
  }, [slides.length]);

  //INDEX AGENDA 
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % agenda.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + agenda.length) % agenda.length);
  };

  const styleStat = "text-base md:text-lg border-2 rounded-lg p-2 md:p-4 flex flex-col items-center text-justify gap-x-2 hover:scale-105 hover:border-primaryoren hover:bg-mainblue/40 hover:text-primaryoren transition-all duration-300 ease-in-out"
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
      <section id="top">
        <div className="relative w-full h-screen overflow-hidden rounded-lg z-[3]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000
                ${index === current ? "opacity-100" : "opacity-0"}`}
            >
              {/* Gambar background */}
              <img
                src={slide.bg}
                alt=""
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gelap sedikit supaya teks lebih jelas */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-[3]"></div>
              
              {/* Teks di atas image */}
              <div className="absolute top-60 md:top-80 left-0 w-full h-full flex flex-col text-center text-2xl md:text-4xl font-bold text-white z-[3]">
                SDN Ragunan 14 Pagi
                <br/>
                <br/>
                {slide.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="agenda" >
        <div className="relative pt-6 md:pt-12 p-4 md:p-8 -top-96 md:-top-60 -mb-72 md:-mb-40 w-11/12 md:w-8/12 mx-auto min-h-[500px] bg-whiteprime shadow-2xl rounded-xl z-[5]">
          <div className="">
            <div className="flex flex-row justify-between mb-4">
              <h1 className="font-bold text-xl md:text-2xl text-mainblue">Aktivitas Terkini</h1>
              <Link to="/informasi/agenda">
                <Button variant="contained" size="small" sx={{ color: "var(--color-white)", fontSize: "12px"}}>
                  Lihat Selengkapnya
                </Button>
              </Link>
            </div>
            <div className="relative h-80 cursor-pointer">
              { agenda.length > 0 ? 
              agenda.map((agenda, index) => {
                const imgSrc = convertDriveUrl(agenda.url_image, "thumbnail");
                return(
                  <div
                    key={agenda.no}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000
                      ${index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"}`}
                  >
                    <div className="relative w-full bg-gray-500 rounded-lg overflow-hidden h-80 shadow">
                      <img
                        src={imgSrc ? imgSrc : '/assets/image/agenda-no-image.png'}
                        alt={"gambar " + agenda.judul}
                        className="w-full h-full mx-auto object-contain" 
                        onError={(e) => {e.currentTarget.src = "/assets/image/agenda-no-image.png";}}
                      />
                      <div className="absolute top-8/12 left-0 w-full h-full flex flex-col justify-start items-center p-6 z-30 bg-black/30">
                        <h3 className="text-xl font-semibold mb-2 text-white">{agenda.judul}</h3>
                        <p className="text-gray-100">{agenda.content}</p>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <>
                <div
                  className={`absolute top-0 left-0 w-full h-full`}
                >
                  <div className="relative w-full rounded-lg overflow-hidden h-80 shadow">
                    <Skeleton 
                      animation="wave"
                      loading={agenda.length === 0} 
                      sx={{ height: 700, top: -200}}
                    />
                  </div>
                </div>
              </>
            }
              {/* tombol prev & next */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-primaryoren text-3xl px-3 py-1 rounded hover:bg-blue-700 z-[21] cursor-pointer"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-primaryoren text-3xl px-3 py-1 rounded hover:bg-blue-700 z-[21] cursor-pointer"
              >
                <FaAngleRight />
              </button>
            </div>
            <div className="flex justify-center p-4 mt-4 w-full text-xs md:text-lg">
              <FullCalendar
                plugins={[dayGridPlugin, listPlugin]}
                initialView="listMonth" // langsung tampil agenda bulanan
                locales={[idLocale]}
                locale="id" 
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "listWeek,listMonth",
                }}
                buttonText={{
                  today: "Hari Ini",
                  listWeek: "Minggu",
                  listMonth: "Bulan",
                }}
                views={{
                  listWeek: { buttonText: "Agenda Pekanan" },
                  listMonth: { buttonText: "Agenda Bulanan" },
                }}
                events={kalender}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="profil">
        <div className="px-2 sm:px-12 md:px-28">
          <h1 className="font-bold text-center text-xl md:text-2xl text-mainblue">Profil Singkat</h1>
          <p className="text-center my-4 text-sm md:text-base px-4 ">SD Negeri Ragunan 14 Pagi merupakan salah satu sekolah dasar negeri
yang memiliki reputasi baik di lingkungan Kecamatan Pasar Minggu. Sekolah ini
dikenal aktif dalam mengikuti berbagai program peningkatan mutu pendidikan
yang diselenggarakan oleh Dinas Pendidikan Provinsi DKI Jakarta.</p>
        </div>

      <div className="bg-secondblue bg-[url(/assets/image/pattern.png)] py-4 mt-8"> 
        <div className="px-2 sm:px-12 md:px-28">
          <h1 className="font-bold text-center text-xl md:text-2xl text-whiteprime">Data Sekolah</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white my-4">
            <div className={styleStat}>
              <p className="font-extrabold text-3xl md:text-4xl">
                  {loading ?
                    <Skeleton animation="wave" variant="overlay">
                    </Skeleton>
                  : sdm.length}
              </p>
              <span className="text-sm text-center">
                Pendidik dan Tenaga Kependidikan
              </span>
            </div>
            <div className={styleStat}>
              <p className="font-extrabold text-3xl md:text-4xl">
                  {loading ?
                    <Skeleton animation="wave" variant="overlay">
                    </Skeleton>
                  : siswa.filter(item => item.nama && item.nama.trim() !== "").length}
              </p>
              <span className="text-sm text-center">
                Rombel
              </span>
            </div>
            <div className={styleStat}>
              <p className="font-extrabold text-3xl md:text-4xl">
                  {loading ?
                    <Skeleton animation="wave" variant="overlay">
                    </Skeleton>
                  : totalSiswa}
              </p>
              <span className="text-sm text-center">
                Siswa
              </span>
            </div>
            <div className={styleStat}>
              <p className="font-extrabold text-3xl md:text-4xl">
                  {loading ?
                    <Skeleton animation="wave" variant="overlay">
                    </Skeleton>
                  : ekskul.filter(item => item.nama !== "vmt").length}
              </p>
              <span className="text-sm text-center">
                Ekstrakurikuler
              </span>
            </div>
          </div>
        </div>
      </div>
      </section>
      <section id="lebih-lanjut">
        <div className="px-2 sm:px-12 md:px-28 py-12">
          <h1 className="font-bold text-center text-xl md:text-2xl text-mainblue mb-4">Jelajahi Lebih Lanjut</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-4 justify-center bg-[url(/assets/image/pattern.png)] bg-secondblue rounded-lg p-4">
              <div className="text-white flex justify-center"> <FaTrophy /></div>
              <h2 className="text-center text-white font-semibold text-lg">Prestasi Siswa</h2>
              <Link to="/profile/prestasi-sekolah">
                <Button variant="contained" size="small" sx={{ color: "var(--color-white)", fontSize: "12px"}}>
                  Lihat Prestasi
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-4 justify-center bg-[url(/assets/image/pattern.png)] bg-secondblue rounded-lg p-4">
              <div className="text-white flex justify-center"> <FaBarsProgress /></div>
              <h2 className="text-center text-white font-semibold text-lg">Agenda Sekolah</h2>
              <Link to="/informasi/agenda">
                <Button variant="contained" size="small" sx={{ color: "var(--color-white)", fontSize: "12px"}}>
                  Lihat Agenda
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-4 justify-center bg-[url(/assets/image/pattern.png)] bg-secondblue rounded-lg p-4">
              <div className="text-white flex justify-center"> <FaRegNewspaper /></div>
              <h2 className="text-center text-white font-semibold text-lg">Informasi</h2>
              <Link to="/informasi/pengumuman">
                <Button variant="contained" size="small" sx={{ color: "var(--color-white)", fontSize: "12px"}}>
                  Lihat Informasi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>

  );
};
export default Home;