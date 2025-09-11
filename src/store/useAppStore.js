// store/useAppStore.js
import { create } from "zustand";
import axios from "axios";

export const useAppStore = create((set) => ({
   visiMisi: [],
   sdm: [],
   prestasi: [],
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

   fetchPrestasi: async () => {
      set({ loading: true, error: null });
      try {
         const res = await axios.get("http://localhost:8000/api/prestasi");
         set({ prestasi: res.data.data });
      } catch (err) {
         set({ error: "Gagal fetch prestasi" });
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
