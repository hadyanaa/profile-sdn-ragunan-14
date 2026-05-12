import { Link } from "react-router-dom";

const quickLinks = [
   { label: "Beranda", href: "/" },
   { label: "Profil Sekolah", href: "/profile/tentang-sekolah" },
   { label: "SDM Sekolah", href: "/profile/sdm-sekolah" },
   { label: "Prestasi Sekolah", href: "/profile/prestasi-sekolah" },
   { label: "Agenda", href: "/informasi/agenda" },
   { label: "Informasi", href: "/informasi/pengumuman" },
   { label: "Kontak", href: "/kontak" },
];

export default function Footer() {
   return(
      <footer className="footer-shell">
         <div className="footer-container">
            <div className="footer-brand">
               <div className="flex items-center gap-3">
                  <img src="/assets/image/LOGO-SDN-14-PAGI-NEW.png" alt="Logo SDN Ragunan 14 Pagi" className="h-16 w-auto" />
                  <div>
                     <h2><span>SDN</span> Ragunan 14 Pagi</h2>
                     <p className="footer-tagline">Bersih, berilmu, berprestasi</p>
                  </div>
               </div>
               <p>
                  SD Negeri Ragunan 14 Pagi berkomitmen menghadirkan pendidikan
                  yang ramah, tertib, dan berkualitas untuk peserta didik di
                  lingkungan Kecamatan Pasar Minggu.
               </p>
            </div>

            <div>
               <h3>Navigasi</h3>
               <ul className="footer-links">
                  {quickLinks.map((item) => (
                     <li key={item.href}>
                        <Link to={item.href}>{item.label}</Link>
                     </li>
                  ))}
               </ul>
            </div>

            <div>
               <h3>Alamat</h3>
               <p>
                  Jl. Kebagusan Raya RT.001/007, Kelurahan Ragunan,
                  Kecamatan Pasar Minggu, Jakarta Selatan.
               </p>
            </div>

            <div>
               <h3>Kontak Sekolah</h3>
               <ul className="footer-contact">
                  <li>Jam layanan: Senin - Jumat</li>
                  <li>Wilayah II Kota Administrasi Jakarta Selatan</li>
                  <li>Dinas Pendidikan Provinsi DKI Jakarta</li>
               </ul>
            </div>
         </div>

         <div className="footer-bottom">
            <p>© 2025 SDN Ragunan 14 Pagi. All rights reserved.</p>
         </div>
      </footer>
   );
};
