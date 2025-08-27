import { useEffect, useState } from "react";
import PreviewPage from "../components/PreviewPage";
import { Button, Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import convertDriveUrl from "../functions/DriveImage";
import { Link } from "react-router-dom";

function Home() {
  const [dataArtikel, setDataArtikel] = useState([]);
  const [dataAgenda, setDataAgenda] = useState([]);
  const [dataPengumuman, setDataPengumuman] = useState([]);
  const [ListGuru, setListGuru] = useState([]);
  const [ListTendik, setListTendik] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data-guru.json')
      .then(res => res.json())
      .then(data => setListGuru(data))
      .catch(err => console.error("Gagal mengambil data:", err));
  }, []);

  useEffect(() => {
    fetch('/api/data-tendik.json')
      .then(res => res.json())
      .then(data => setListTendik(data))
      .catch(err => console.error("Gagal mengambil data:", err));
  }, []);

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbycOICEi7KSaZirIZVBXomzhPu6JVKdDgahXlGPDDuKqR-MVST8-vbtFwp9GxNFRnxN/exec")
      .then((res) => res.json())
      .then((result) => {
        setDataArtikel(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const slides = [
    { id: 1, text: "Slide Pertama", bg: "/assets/image/banner/banner-1.png" },
    { id: 2, text: "Slide Kedua", bg: "/assets/image/banner/banner-2.JPG" },
    { id: 3, text: "Slide Ketiga", bg: "/assets/image/banner/banner-3.jpg" },
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
  // auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % dataAgenda.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [dataAgenda.length]);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % dataAgenda.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + dataAgenda.length) % dataAgenda.length);
  };

  // hit api agenda atau aktivitas terkini
  useEffect(() => {
    // setLoadingAgenda(true);
    fetch("https://script.google.com/macros/s/AKfycbwHZTdj2DdUzOQ-CSxKkXL7hgiCSppYoOvoRd20GfIwvXnQdtpuQ72l7LnQsTxX0y3a/exec")
      .then((res) => res.json())
      .then((result) => {
        setDataAgenda(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return(
    <>
      <section id="top">
        <div className="relative w-full h-screen overflow-hidden rounded-lg z-[3]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute -top-14 left-0 w-full h-full transition-opacity duration-1000
                ${index === current ? "opacity-100" : "opacity-0"}`}
            >
              {/* Gambar background */}
              <img
                src={slide.bg}
                alt=""
                className="w-full h-full object-cover"
              />
              
              {/* Overlay gelap sedikit supaya teks lebih jelas */}
              <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-[3]"></div>
              
              {/* Teks di atas image */}
              <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-4xl font-bold text-white z-[3]">
                {slide.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="agenda" >
        <div className="relative pt-12 p-8 -top-40 -mb-16 w-8/12 mx-auto min-h-[500px] bg-whiteprime shadow-2xl rounded-xl z-[5]">
        <div className="">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="font-bold text-2xl text-mainblue">Aktivitas Terkini</h1>
            <Link to="/informasi/agenda">
              <Button variant="plain" size="small" sx={{ color: "var(--color-mainblue)"}}>
                Lihat Selengkapnya
              </Button>
            </Link>
          </div>
          <div className="relative h-80 cursor-pointer">
            { dataAgenda.length > 0 ? 
            dataAgenda.map((agenda, index) => {
              const imgSrc = convertDriveUrl(agenda.url_image);
              return(
                <div
                  key={agenda.no}
                  className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000
                    ${index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"}`}
                >
                  <div className="relative w-full bg-gray-500 rounded-lg overflow-hidden h-80 shadow">
                    <img
                      src={imgSrc}
                      alt={"gambar " + agenda.judul}
                      className="w-full h-full mx-auto object-contain"
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
                    loading={dataAgenda.length === 0} 
                    sx={{ height: 700, top: -200}}
                  />
                </div>
              </div>
            </>
          }
            {/* tombol prev & next */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 z-[21] cursor-pointer"
            >
              Prev
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 z-[21] cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>

        </div>
      </section>
      <PreviewPage 
        title="Artikel" 
        desc="List artikel sekolah"
        items={dataArtikel}
        drive
      />
      <PreviewPage 
        title="Staf Guru" 
        desc="Staf guru pada SDN Ragunan 14 Pagi"
        items={ListGuru}
        pattern
      />
      <PreviewPage 
        title="Staf Tenaga Kependidikan" 
        desc="Staf tenaga kependidikan pada SDN Ragunan 14 Pagi"
        items={ListTendik}
      />
    </>

  );
};
export default Home;