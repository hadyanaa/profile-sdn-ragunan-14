// store/useAppStore.js
import { create } from "zustand";
import axios from "axios";

export const useAppStore = create((set) => ({
   visiMisi: [],
   sdm: [],
   siswa: [],
   prestasi: [],
   ekskul: [],
   pengumuman: [],
   agenda: [],
   loading: false,
   error: null,

   fetchVisiMisi: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("https://script.google.com/macros/s/AKfycbymbySyX9CBn74tgENUNc8bPXNXNFTTsokzBlay9Pys6Umg5SntwvXKTh5es1cLOiim/exec");
         set({ visiMisi: res.data });
      } catch (err) {
         set({ error: "Gagal fetch visi misi" });
      } finally {
         set({ loading: false });
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
         const res = await axios.get("http://localhost:8000/api/agenda");
         set({ agenda: res.data.data });
      } catch (err) {
         set({ error: "Gagal fetch agenda" });
      } finally {
         set({ loading: false });
      }
   },
}));
