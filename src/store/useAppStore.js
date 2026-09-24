// store/useAppStore.js
import { create } from "zustand";
import axios from "axios";

// Base URL backend API (mengambil dari VITE_API_URL jika ada, default ke domain produksi)
const API_URL = import.meta.env.VITE_API_URL || "https://api.sdnragunan14pagi.sch.id";

export const useAppStore = create((set) => ({
   visiMisi: [],
   sdm: [],
   siswa: [],
   alumni: [],
   prestasi: [],
   ekskul: [],
   pengumuman: [],
   agenda: [],
   kalender: [],
   loading: false,
   error: null,

   // 1. FETCH VISI & MISI
   fetchVisiMisi: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get(`${API_URL}/public/visi-misi`);
         const vm = res.data.data;
         if (!vm) {
            set({ visiMisi: [] });
            return;
         }

         // Format baris misi & tujuan menjadi array terpisah agar sesuai struktur UI
         const misiLines = vm.misi
            ? vm.misi.split("\n").map((l) => l.replace(/^\d+[\.\)]\s*/, "").trim()).filter(Boolean)
            : [];
         const tujuanLines = vm.tujuan
            ? vm.tujuan.split("\n").map((l) => l.replace(/^\d+[\.\)]\s*/, "").trim()).filter(Boolean)
            : [];
         const maxLen = Math.max(misiLines.length, tujuanLines.length, 1);

         const formatted = [];
         for (let i = 0; i < maxLen; i++) {
            formatted.push({
               no: i + 1,
               visi: i === 0 ? vm.visi : "",
               misi: misiLines[i] || "",
               tujuan: tujuanLines[i] || ""
            });
         }
         set({ visiMisi: formatted });
      } catch (err) {
         console.error("Gagal fetch visi misi:", err);
         set({ error: "Gagal fetch visi misi" });
      } finally {
         set({ loading: false });
      }
   },

   // 2. FETCH SDM (Guru, Kepala Sekolah, Staf TU)
   fetchSDM: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get(`${API_URL}/public/sdm`);
         const sdm = (res.data.data || []).map((item, idx) => ({
            ...item,
            no: item.id || idx + 1,
            nip_nikki: item.nipNikki || "",
            deskripsi_jabatan: item.deskripsiJabatan || item.jabatan || "",
            foto: item.fotoUrl || "",
            keaktifan: "Aktif"
         }));
         set({ sdm });
      } catch (err) {
         console.error("Gagal fetch SDM:", err);
         set({ error: "Gagal fetch SDM" });
      } finally {
         set({ loading: false });
      }
   },

   // 3. FETCH PRESTASI
   fetchPrestasi: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get(`${API_URL}/public/prestasi`);
         const prestasi = (res.data.data || []).map((item, idx) => ({
            ...item,
            no: item.id || idx + 1,
            foto: item.linkFoto || "",
            tahun: item.tanggal ? String(new Date(item.tanggal).getFullYear()) : ""
         }));
         set({ prestasi });
      } catch (err) {
         console.error("Gagal fetch prestasi:", err);
         set({ error: "Gagal fetch prestasi" });
      } finally {
         set({ loading: false });
      }
   },

   // 4. FETCH EKSTRAKURIKULER
   fetchEkskul: async () => {
      set({ loading: true, error: null });
      try {
         const [resEkskul, resVm] = await Promise.all([
            axios.get(`${API_URL}/public/ekskul`),
            axios.get(`${API_URL}/public/visi-misi`)
         ]);

         const vm = resVm.data.data || {};
         const misiEkskulList = vm.misiEkskul
            ? vm.misiEkskul.split("\n").map((l) => l.replace(/^\d+[\.\)]\s*/, "").trim()).filter(Boolean)
            : [];
         const tujuanEkskulList = vm.tujuanEkskul
            ? vm.tujuanEkskul.split("\n").map((l) => l.replace(/^\d+[\.\)]\s*/, "").trim()).filter(Boolean)
            : [];
         const fungsiEkskulList = vm.fungsiEkskul
            ? vm.fungsiEkskul.split("\n\n").map((l) => l.trim()).filter(Boolean)
            : [];

         // Baris index 0 'vmt' untuk tab Visi Misi Tujuan Ekskul
         const vmtRows = [];
         const maxVmt = Math.max(misiEkskulList.length, tujuanEkskulList.length, fungsiEkskulList.length, 1);
         for (let i = 0; i < maxVmt; i++) {
            vmtRows.push({
               id: i === 0 ? 0 : `vmt-${i}`,
               nama: "vmt",
               visi: i === 0 ? vm.visiEkskul || "" : "",
               misi: misiEkskulList[i] || "",
               tujuan_ekskul: tujuanEkskulList[i] || "",
               fungsi_ekskul: fungsiEkskulList[i] || ""
            });
         }

         // Klub ekstrakurikuler aktual (Pramuka, Futsal, Tari, dsb.)
         const clubs = (resEkskul.data.data || []).map((item, idx) => ({
            ...item,
            id: item.id || idx + 1,
            nama_pembina: item.pembina || "",
            foto: item.linkFoto || ""
         }));

         set({ ekskul: [...vmtRows, ...clubs] });
      } catch (err) {
         console.error("Gagal fetch Ekskul:", err);
         set({ error: "Gagal fetch Ekskul" });
      } finally {
         set({ loading: false });
      }
   },

   // 5. FETCH AGENDA
   fetchAgenda: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get(`${API_URL}/public/agenda`);
         const agenda = (res.data.data || []).map((item, idx) => ({
            ...item,
            no: item.id || idx + 1,
            url_image: item.linkFoto || "",
            tahun: item.tanggal ? String(new Date(item.tanggal).getFullYear()) : ""
         }));
         set({ agenda });
      } catch (err) {
         console.error("Gagal fetch agenda:", err);
         set({ error: "Gagal fetch agenda" });
      } finally {
         set({ loading: false });
      }
   },

   // 6. FETCH PENGUMUMAN
   fetchPengumuman: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get(`${API_URL}/public/pengumuman`);
         const pengumuman = (res.data.data || []).map((item, idx) => ({
            ...item,
            no: item.id || idx + 1,
            url: item.urlFile || ""
         }));
         set({ pengumuman });
      } catch (err) {
         console.error("Gagal fetch pengumuman:", err);
         set({ error: "Gagal fetch pengumuman" });
      } finally {
         set({ loading: false });
      }
   },

   // 7. FETCH KALENDER AKADEMIK
   fetchKalender: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get(`${API_URL}/public/kalender-akademik`);
         const kalender = (res.data.data || []).map((item) => ({
            title: item.title,
            start: item.start,
            end: item.end,
            deskripsi: item.deskripsi || item.title,
            kategori: item.kategori || "Event",
            extendedProps: {
               deskripsi: item.deskripsi || item.title,
               kategori: item.kategori || "Event"
            }
         }));
         set({ kalender });
      } catch (err) {
         console.error("Gagal fetch kalender:", err);
         set({ error: "Gagal fetch kalender" });
      } finally {
         set({ loading: false });
      }
   },

   // 8. DATA SISWA (Fallback Google Apps Script jika data agregasi statistik belum ada di database)
   fetchSiswa: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbw8n9B5o98Wzv8cm6LbBj1suN3dK6KDK2RM9UtcCnGGsRUsrO-y-EZXs6pfj8Bltpd4/exec");
         set({ siswa: res.data });
      } catch (err) {
         console.error("Gagal fetch Siswa:", err);
         set({ error: "Gagal fetch Siswa" });
      } finally {
         set({ loading: false });
      }
   },

   // 9. DATA ALUMNI (Fallback Google Apps Script jika data alumni belum ada di database)
   fetchAlumni: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbycOcTioD5vi8BHeyh0Wcbrd-KDSzQwYOrMJUSmtZ99rXTnm8K4Npnu53fSiS7Lvgdf/exec");
         set({ alumni: res.data });
      } catch (err) {
         console.error("Gagal fetch Alumni:", err);
         set({ error: "Gagal fetch Alumni" });
      } finally {
         set({ loading: false });
      }
   }
}));

