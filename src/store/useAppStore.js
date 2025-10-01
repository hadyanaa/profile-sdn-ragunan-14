// store/useAppStore.js
import { create } from "zustand";
import axios from "axios";

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
   progress: 0,

   fetchVisiMisi: async () => {
      set({ loading: true, error: null, progress: 0 });
      let fakeProgress = 0;
      const interval = setInterval(() => {
         fakeProgress += 10;
         if (fakeProgress < 90) {
            set({ progress: fakeProgress });
         } else {
            clearInterval(interval);
         }
      }, 200);
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbymbySyX9CBn74tgENUNc8bPXNXNFTTsokzBlay9Pys6Umg5SntwvXKTh5es1cLOiim/exec");
         set({ visiMisi: res.data, progress: 100 });
      } catch (err) {
         set({ error: "Gagal fetch visi misi" });
      } finally {
         clearInterval(interval);
         setTimeout(()=> set({ loading: false, progress: 0 }), 500);
      }
   },

   fetchSDM: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbw_-N7YydFlgBTNA7oBVnfl-zgHyo8vivk-IEYL-OPdBvpyqOfgFYAeXv-EKfnY3to/exec");
         set({ sdm: res.data });
      } catch (err) {
         set({ error: "Gagal fetch SDM" });
      } finally {
         set({ loading: false });
      }
   },

   fetchSiswa: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbw8n9B5o98Wzv8cm6LbBj1suN3dK6KDK2RM9UtcCnGGsRUsrO-y-EZXs6pfj8Bltpd4/exec");
         set({ siswa: res.data });
      } catch (err) {
         set({ error: "Gagal fetch Siswa" });
      } finally {
         set({ loading: false });
      }
   },

   fetchAlumni: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbycOcTioD5vi8BHeyh0Wcbrd-KDSzQwYOrMJUSmtZ99rXTnm8K4Npnu53fSiS7Lvgdf/exec");
         set({ alumni: res.data });
      } catch (err) {
         set({ error: "Gagal fetch Alumni" });
      } finally {
         set({ loading: false });
      }
   },

   fetchPrestasi: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycby_dTOVeJ0JYJgLY0Yv6_mX6uek2lEK1oyT9fQD_Rzz12vzX1UqnFAKQdGFeD7HvM3q/exec");
         set({ prestasi: res.data });
      } catch (err) {
         set({ error: "Gagal fetch prestasi" });
      } finally {
         set({ loading: false });
      }
   },

   fetchEkskul: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbwHeGGbcQYmvpmKDJBObmUzDNm7JGQfvjbbHv5W0sv0yKtpktkgYQyNw1gtYRUxkD1a/exec");
         set({ ekskul: res.data });
      } catch (err) {
         set({ error: "Gagal fetch Ekskul" });
      } finally {
         set({ loading: false });
      }
   },

   fetchPengumuman: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("http://localhost:8000/api/pengumuman");
         set({ pengumuman: res.data.data });
      } catch (err) {
         set({ error: "Gagal fetch pengumuman" });
      } finally {
         set({ loading: false });
      }
   },

   fetchAgenda: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbwHZTdj2DdUzOQ-CSxKkXL7hgiCSppYoOvoRd20GfIwvXnQdtpuQ72l7LnQsTxX0y3a/exec");
         set({ agenda: res.data });
      } catch (err) {
         set({ error: "Gagal fetch agenda" });
      } finally {
         set({ loading: false });
      }
   },

   fetchAgenda: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbzCEd3f16F513Z3TmfUNEG1Dk7F4D-SCpYjg-wj-c79yNmNVLZ8V1bn0u5t0-Qu-K0/exec");
         set({ kalender: res.data });
      } catch (err) {
         set({ error: "Gagal fetch kalender" });
      } finally {
         set({ loading: false });
      }
   },
}));
