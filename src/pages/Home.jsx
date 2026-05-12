import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { FaAngleRight, FaAngleLeft, FaTrophy, FaBarsProgress, FaRegNewspaper } from "react-icons/fa6";
import convertDriveUrl from "../functions/DriveImage";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/useAppStore";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import idLocale from "@fullcalendar/core/locales/id";

const heroSlides = [
  { id: 1, text: "Sekolah Ramah dan Berprestasi di Ragunan", bg: "/assets/image/banner/banner-1.png" },
  { id: 2, text: "Belajar Bermakna, Wujudkan Profil Pelajar Pancasila", bg: "/assets/image/banner/banner-2.JPG" },
  { id: 3, text: "Kolaborasi Sekolah dan Masyarakat untuk Masa Depan Gemilang", bg: "/assets/image/banner/banner-3.jpg" },
];

const exploreCards = [
  {
    title: "Prestasi Siswa",
    description: "Lihat capaian akademik dan non-akademik warga sekolah.",
    icon: <FaTrophy />,
    href: "/profile/prestasi-sekolah",
    cta: "Lihat Prestasi",
  },
  {
    title: "Agenda Sekolah",
    description: "Pantau kegiatan dan agenda penting sekolah setiap bulan.",
    icon: <FaBarsProgress />,
    href: "/informasi/agenda",
    cta: "Lihat Agenda",
  },
  {
    title: "Informasi",
    description: "Temukan pengumuman dan informasi terbaru untuk orang tua.",
    icon: <FaRegNewspaper />,
    href: "/informasi/pengumuman",
    cta: "Jelajahi Informasi",
  },
];

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-7 max-[900px]:flex-col max-[900px]:items-start">
      <div>
        {eyebrow ? (
          <p className="text-secondblue text-[0.82rem] font-extrabold tracking-normal mb-[10px] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-mainblue text-[clamp(1.7rem,3vw,2.6rem)] font-extrabold leading-[1.15] max-w-[760px]">
          {title}
        </h2>
        {description ? (
          <p className="text-textgray text-base leading-[1.75] mt-3 max-w-[720px]">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

function BrandButton({ to, children, variant = "primary" }) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg text-[0.94rem] font-extrabold transition-all duration-[180ms] ease-in-out hover:-translate-y-[2px] whitespace-nowrap";
  
  const variants = {
    primary: "min-h-[46px] px-[18px] bg-mainblue text-white shadow-[0_14px_30px_rgba(8,66,132,0.24)] hover:shadow-[0_18px_34px_rgba(8,66,132,0.28)]",
    secondary: "min-h-[46px] px-[18px] bg-white/90 border border-mainblue/30 text-mainblue hover:bg-white hover:border-mainblue/50 hover:shadow-[0_12px_26px_rgba(8,64,128,0.18)]",
    compact: "min-h-[40px] px-4 bg-mainblue text-white",
    text: "min-h-0 p-0 text-mainblue justify-start after:content-['→'] after:ml-2 after:transition-transform after:duration-[180ms] hover:after:translate-x-1"
  };

  return (
    <Link className={`${baseClasses} ${variants[variant]}`} to={to}>
      {children}
    </Link>
  );
}

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
  }, [
    agenda,
    ekskul,
    fetchAgenda,
    fetchEkskul,
    fetchKalender,
    fetchSDM,
    fetchSiswa,
    kalender,
    sdm,
    siswa,
  ]);

  // const jumlahRombel = siswa.nama.length;
  const dataRombel = siswa.filter(items => items.no < 13)
  const totalLk = dataRombel.reduce((sum, item) => sum + item.lk, 0);
  const totalPr = dataRombel.reduce((sum, item) => sum + item.pr, 0);
  const totalSiswa = totalLk + totalPr;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  //INDEX AGENDA 
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (agenda.length === 0) return;
    setCurrentIndex((currentIndex + 1) % agenda.length);
  };

  const prevSlide = () => {
    if (agenda.length === 0) return;
    setCurrentIndex((currentIndex - 1 + agenda.length) % agenda.length);
  };

  const stats = [
    {
      value: sdm.length,
      label: "Pendidik dan Tenaga Kependidikan",
    },
    {
      value: siswa.filter(item => item.nama && item.nama.trim() !== "").length,
      label: "Rombel",
    },
    {
      value: totalSiswa,
      label: "Siswa",
    },
    {
      value: ekskul.filter(item => item.nama !== "vmt").length,
      label: "Ekstrakurikuler",
    },
  ];

  return(
    <>
      { loading ? (
        <div className="fixed right-4 bottom-4 z-[60] flex items-center gap-3 p-3 px-4 bg-white/95 backdrop-blur-md rounded-lg shadow-[0_24px_54px_rgba(5,47,94,0.15)] text-mainblue text-[0.9rem] font-extrabold max-[767px]:left-3 max-[767px]:right-3 max-[767px]:bottom-3 max-[767px]:justify-center">
          <img className="h-8 w-8" src="/assets/video/Rippletransparent.gif" alt="" />
          <span>Memuat data terbaru...</span>
        </div>
      ) : (
        <></>
      )}
      <section id="top">
        <div className="relative min-h-screen overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000
                ${index === current ? "opacity-100" : "opacity-0"}`}
            >
              <img
                src={slide.bg}
                alt="Kegiatan siswa SDN Ragunan 14 Pagi"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(249,250,250,0.96)_0%,rgba(249,250,250,0.82)_38%,rgba(249,250,250,0.2)_68%),linear-gradient(180deg,rgba(5,34,70,0.28)_0%,rgba(5,34,70,0.05)_42%,rgba(249,250,250,0.86)_100%)] max-[640px]:bg-[linear-gradient(180deg,rgba(249,250,250,0.88)_0%,rgba(249,250,250,0.58)_45%,rgba(249,250,250,0.94)_100%),linear-gradient(90deg,rgba(249,250,250,0.96),rgba(249,250,250,0.2))]"></div>
          <div className="relative z-[3] flex flex-col justify-center min-h-screen w-full max-w-[980px] px-6 md:px-[max(24px,calc((100vw-1120px)/2))] pt-24 pb-[132px] max-[640px]:justify-end max-[640px]:min-h-[92svh] max-[640px]:pt-[104px] max-[640px]:pb-[92px]">
            <p className="text-mainblue font-extrabold mb-4 text-[clamp(1rem,2vw,1.25rem)]">SDN Ragunan 14 Pagi</p>
            <h1 className="max-w-[820px] text-mainblue text-[clamp(2.35rem,4vw,4rem)] font-black leading-[1.08] [overflow-wrap:normal] max-[640px]:max-w-[340px] max-[640px]:text-[clamp(2rem,9.2vw,2.55rem)]">{heroSlides[current].text}</h1>
            <p className="text-[#32443d] leading-[1.8] mt-[22px] max-w-[620px] text-[clamp(1rem,2vw,1.18rem)] max-[640px]:text-[0.98rem] max-[640px]:max-w-[340px]">
              Lingkungan belajar yang ramah, tertib, dan kolaboratif untuk
              menumbuhkan karakter, prestasi, serta rasa percaya diri peserta didik.
            </p>
            <div className="flex flex-wrap gap-[14px] mt-8 max-[640px]:w-full">
              <BrandButton to="/profile/tentang-sekolah">Lihat Profil Sekolah</BrandButton>
              <BrandButton to="/informasi/agenda" variant="secondary">Lihat Kegiatan Terbaru</BrandButton>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="py-[72px] max-[900px]:py-[56px] -mt-16 md:-mt-20 relative z-10">
        <div className="w-full max-w-[1120px] mx-auto px-4 max-[640px]:px-3">
          <div className="bg-white/90 border border-mainblue/10 rounded-lg shadow-[0_24px_70px_rgba(8,57,115,0.14)] p-5 md:p-9 max-[640px]:p-[18px]">
            <SectionHeading
              eyebrow="Agenda dan kegiatan"
              title="Aktivitas Terkini"
              description="Ringkasan kegiatan sekolah dan kalender akademik yang mudah dipantau."
              action={<BrandButton to="/informasi/agenda" variant="compact">Lihat Selengkapnya</BrandButton>}
            />
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
              <div className="relative aspect-[16/11] min-h-[380px] max-[900px]:min-h-[320px] max-[640px]:aspect-[4/5] max-[640px]:min-h-[360px]">
              { agenda.length > 0 ? 
              agenda.map((agenda, index) => {
                const imgSrc = convertDriveUrl(agenda.url_image, "thumbnail");
                return(
                  <div
                    key={agenda.no}
                    className={`absolute inset-0 transition-opacity duration-1000
                      ${index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"}`}
                  >
                    <div className="relative h-full overflow-hidden bg-[#eef6fc] rounded-lg shadow-[inset_0_0_0_1px_rgba(10,78,160,0.08)]">
                      <img
                        src={imgSrc ? imgSrc : '/assets/image/agenda-no-image.png'}
                        alt={"gambar " + agenda.judul}
                        className="h-full w-full object-cover" 
                        onError={(e) => {e.currentTarget.src = "/assets/image/agenda-no-image.png";}}
                      />
                      <div className="agenda-caption">
                        <h3 className="text-[clamp(1.15rem,2vw,1.55rem)] font-extrabold">{agenda.judul}</h3>
                        <p className="line-clamp-2 text-white/80 mt-2">{agenda.content}</p>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <>
                <div className="agenda-slide">
                  <div className="agenda-media-card">
                    <Skeleton 
                      animation="wave"
                      loading={agenda.length === 0} 
                      sx={{ height: 700, top: -200}}
                    />
                  </div>
                </div>
              </>
            }
              <button
                onClick={prevSlide}
                aria-label="Agenda sebelumnya"
                className="absolute top-1/2 -translate-y-1/2 z-[21] left-4 flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white/90 border border-mainblue/10 text-mainblue cursor-pointer transition-all duration-[180ms] hover:bg-white hover:scale-[1.06] shadow-[0_10px_26px_rgba(5,47,94,0.16)]"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Agenda berikutnya"
                className="absolute top-1/2 -translate-y-1/2 z-[21] right-4 flex items-center justify-center w-[42px] h-[42px] rounded-full bg-white/90 border border-mainblue/10 text-mainblue cursor-pointer transition-all duration-[180ms] hover:bg-white hover:scale-[1.06] shadow-[0_10px_26px_rgba(5,47,94,0.16)]"
              >
                <FaAngleRight />
              </button>
            </div>
            <div className="bg-white border border-mainblue/10 rounded-lg shadow-[0_18px_46px_rgba(8,57,115,0.1)] p-[18px] min-w-0">
              <FullCalendar
                plugins={[dayGridPlugin, listPlugin]}
                initialView="listMonth"
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
        </div>
      </section>

      <section id="profil" className="py-[72px] max-[900px]:py-[56px]">
        <div className="w-full max-w-[1120px] mx-auto px-4 max-[640px]:px-3">
          <div className="max-w-[960px]">
            <SectionHeading
              eyebrow="Profil singkat"
              title="Sekolah dasar negeri yang tumbuh bersama warga Ragunan"
              description="SD Negeri Ragunan 14 Pagi merupakan salah satu sekolah dasar negeri
yang memiliki reputasi baik di lingkungan Kecamatan Pasar Minggu. Sekolah ini
dikenal aktif dalam mengikuti berbagai program peningkatan mutu pendidikan
yang diselenggarakan oleh Dinas Pendidikan Provinsi DKI Jakarta."
              action={<BrandButton to="/profile/tentang-sekolah" variant="compact">Lihat Profil Sekolah</BrandButton>}
            />
          </div>
        </div>

      <div className="mt-[18px] py-16 bg-[linear-gradient(135deg,rgba(10,78,160,0.96),rgba(9,143,209,0.94)),url('/assets/image/pattern.png')]"> 
        <div className="w-full max-w-[1120px] mx-auto px-4 max-[640px]:px-3 text-whiteprime">
          <SectionHeading
            eyebrow="Data sekolah"
            title="Informasi sekolah dalam angka"
            description="Gambaran singkat sumber daya, rombongan belajar, siswa, dan kegiatan pengembangan minat."
          />
          <div className="grid gap-[18px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div className="flex flex-col min-h-[154px] p-6 text-white bg-white/10 border border-white/20 rounded-lg transition-all duration-[180ms] hover:bg-white/20 hover:border-primaryoren/70 hover:-translate-y-1" key={stat.label}>
                <p className="text-primaryoren font-[900] leading-none text-[clamp(2rem,4vw,3.2rem)]">
                  {loading ? <Skeleton animation="wave" variant="text" /> : stat.value}
                </p>
                <span className="block mt-3.5 text-[0.95rem] font-bold leading-[1.5]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      <section id="lebih-lanjut" className="py-[72px] max-[900px]:py-[56px]">
        <div className="w-full max-w-[1120px] mx-auto px-4 max-[640px]:px-3">
          <SectionHeading
            eyebrow="Jelajahi informasi"
            title="Akses cepat untuk warga sekolah"
            description="Navigasi utama dibuat lebih jelas agar orang tua, siswa, dan masyarakat cepat menemukan informasi penting."
          />
          <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
            {exploreCards.map((card) => (
              <article className="bg-white border border-mainblue/10 rounded-lg shadow-[0_16px_42px_rgba(8,57,115,0.08)] p-7 transition-all duration-[180ms] hover:-translate-y-1 hover:border-secondblue/30 hover:shadow-[0_24px_58px_rgba(8,57,115,0.13)] max-[640px]:p-[18px]" key={card.title}>
                <div className="flex items-center justify-center w-[52px] h-[52px] mb-[22px] bg-mainblue text-white text-[1.35rem] rounded-lg">{card.icon}</div>
                <h3 className="text-darknavy text-xl font-extrabold">{card.title}</h3>
                <p className="text-textgray leading-[1.7] my-3 mb-6">{card.description}</p>
                <BrandButton to={card.href} variant="text">{card.cta}</BrandButton>
              </article>
            ))}
          </div>
          <div className="flex items-center justify-between gap-6 mt-9 p-6 md:p-9 bg-[linear-gradient(135deg,#f5faff,#ffffff)] border border-mainblue/10 rounded-lg shadow-[0_16px_48px_rgba(8,57,115,0.08)] max-[900px]:flex-col max-[900px]:items-start">
            <div className="max-w-2xl">
              <h2 className="text-darknavy text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-tight">Bersama membangun sekolah yang ramah dan berprestasi.</h2>
              <h2>Bersama membangun sekolah yang ramah dan berprestasi.</h2>
              <p>Kenali profil, program, dan kegiatan terbaru SDN Ragunan 14 Pagi.</p>
            </div>
            <BrandButton to="/informasi/pengumuman">Jelajahi Informasi</BrandButton>
          </div>
        </div>
      </section>
    </>

  );
};
export default Home;
