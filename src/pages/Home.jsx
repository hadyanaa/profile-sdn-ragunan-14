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
    <div className="section-heading">
      <div>
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

function BrandButton({ to, children, variant = "primary" }) {
  return (
    <Link className={`brand-button brand-button--${variant}`} to={to}>
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
        <div className="loading-toast">
          <img className="h-8 w-8" src="/assets/video/Rippletransparent.gif" alt="" />
          <span>Memuat data terbaru...</span>
        </div>
      ) : (
        <></>
      )}
      <section id="top">
        <div className="hero-shell">
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
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <p className="hero-school">SDN Ragunan 14 Pagi</p>
            <h1>{heroSlides[current].text}</h1>
            <p className="hero-subtitle">
              Lingkungan belajar yang ramah, tertib, dan kolaboratif untuk
              menumbuhkan karakter, prestasi, serta rasa percaya diri peserta didik.
            </p>
            <div className="hero-actions">
              <BrandButton to="/profile/tentang-sekolah">Lihat Profil Sekolah</BrandButton>
              <BrandButton to="/informasi/agenda" variant="secondary">Lihat Kegiatan Terbaru</BrandButton>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="section-band -mt-16 md:-mt-20 relative z-10">
        <div className="section-container">
          <div className="feature-panel">
            <SectionHeading
              eyebrow="Agenda dan kegiatan"
              title="Aktivitas Terkini"
              description="Ringkasan kegiatan sekolah dan kalender akademik yang mudah dipantau."
              action={<BrandButton to="/informasi/agenda" variant="compact">Lihat Selengkapnya</BrandButton>}
            />
            <div className="agenda-grid">
              <div className="agenda-showcase">
              { agenda.length > 0 ? 
              agenda.map((agenda, index) => {
                const imgSrc = convertDriveUrl(agenda.url_image, "thumbnail");
                return(
                  <div
                    key={agenda.no}
                    className={`agenda-slide transition-opacity duration-1000
                      ${index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"}`}
                  >
                    <div className="agenda-media-card">
                      <img
                        src={imgSrc ? imgSrc : '/assets/image/agenda-no-image.png'}
                        alt={"gambar " + agenda.judul}
                        className="h-full w-full object-cover" 
                        onError={(e) => {e.currentTarget.src = "/assets/image/agenda-no-image.png";}}
                      />
                      <div className="agenda-caption">
                        <h3>{agenda.judul}</h3>
                        <p className="truncate-multiline-2">{agenda.content}</p>
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
                className="carousel-button left-4"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Agenda berikutnya"
                className="carousel-button right-4"
              >
                <FaAngleRight />
              </button>
            </div>
            <div className="calendar-card">
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

      <section id="profil" className="section-band">
        <div className="section-container">
          <div className="profile-intro">
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

      <div className="stats-band"> 
        <div className="section-container">
          <SectionHeading
            eyebrow="Data sekolah"
            title="Informasi sekolah dalam angka"
            description="Gambaran singkat sumber daya, rombongan belajar, siswa, dan kegiatan pengembangan minat."
          />
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <p>
                  {loading ? <Skeleton animation="wave" variant="text" /> : stat.value}
                </p>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      <section id="lebih-lanjut" className="section-band">
        <div className="section-container">
          <SectionHeading
            eyebrow="Jelajahi informasi"
            title="Akses cepat untuk warga sekolah"
            description="Navigasi utama dibuat lebih jelas agar orang tua, siswa, dan masyarakat cepat menemukan informasi penting."
          />
          <div className="explore-grid">
            {exploreCards.map((card) => (
              <article className="explore-card" key={card.title}>
                <div className="explore-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <BrandButton to={card.href} variant="text">{card.cta}</BrandButton>
              </article>
            ))}
          </div>
          <div className="closing-cta">
            <div>
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
