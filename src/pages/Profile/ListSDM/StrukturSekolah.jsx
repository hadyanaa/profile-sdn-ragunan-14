import { useEffect, useState } from "react";
import { useAppStore } from "../../../store/useAppStore";

export default function StrukturOrganisasi() {
   const [value, setValue] = useState(0);
   const { sdm, loading, error, fetchSDM } = useAppStore();
   
   useEffect(() => {
      if (sdm.length === 0) {
         // hanya fetch kalau data belum ada
         fetchSDM();
      }
   }, [sdm, fetchSDM]);
   
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const kepalaSekolah = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase() === "kepala sekolah") ?? "Belum ada Kepala Sekolah"
   const wakilKepalaSekolah = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("wakil kepala sekolah")) ?? "Belum ada Wakil Kepala Sekolah"
   const pengurusBarang = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("pengurus barang")) ?? "Belum ada Pengurus Barang"
   const bendahara = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("bendahara")) ?? "Belum ada Bendahara"
   const tenagaAdministrasi = sdm?.filter((item) => item.deskripsi_jabatan.toLowerCase().includes("tenaga administrasi")) ?? "Belum ada Tenaga Administrasi"
   const guruKelasIA = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas i a")) ?? "Belum ada Guru Kelas I A"
   const guruKelasIB = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas i b")) ?? "Belum ada Guru Kelas I B"
   const guruKelasIIA = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas ii a")) ?? "Belum ada Guru Kelas II A"
   const guruKelasIIB = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas ii b")) ?? "Belum ada Guru Kelas II B"
   const guruKelasIIIA = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas iii a")) ?? "Belum ada Guru Kelas III A"
   const guruKelasIIIB = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas iii b")) ?? "Belum ada Guru Kelas III B"
   const guruKelasIVA = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas iv a")) ?? "Belum ada Guru Kelas IV A"
   const guruKelasIVB = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas iv b")) ?? "Belum ada Guru Kelas IV B"
   const guruKelasVA = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas v a")) ?? "Belum ada Guru Kelas V A"
   const guruKelasVB = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas v b")) ?? "Belum ada Guru Kelas V B"
   const guruKelasVIA = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas vi a")) ?? "Belum ada Guru Kelas VI A"
   const guruKelasVIB = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("kelas vi b")) ?? "Belum ada Guru Kelas VI B"
   const guruPJOK = sdm?.filter((item) => item.deskripsi_jabatan.toLowerCase().includes("pjok")) ?? "Belum ada Guru PJOK"
   const guruPAI = sdm?.filter((item) => item.deskripsi_jabatan.toLowerCase().includes("pai")) ?? "Belum ada Guru PAI"
   const penjagaSekolah = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("penjaga sekolah")) ?? "Belum ada Penjaga Sekolah"
   const tenagaKebersihan = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("tenaga kebersihan")) ?? "Belum ada Tenaga Kebersihan"
   const tenagaSatpam = sdm?.find((item) => item.deskripsi_jabatan.toLowerCase().includes("tenaga satpam")) ?? "Belum ada Tenaga Satpam"
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
      <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-4 w-full px-4 sm:px-8 p-8 bg-[url(/assets/image/pattern.png)]">
      <div className="flex flex-col mx-auto gap-4">
         <div className="mx-auto p-4 bg-gradient-to-r from-cyan-300 to-cyan-500 w-3/4 sm:w-1/2 md:w-1/4 h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
            <h1 className="text-blue-900 font-extrabold">{kepalaSekolah.nama}</h1>
            <hr className="text-blue-900" />
            <p className="text-emerald-900 font-bold">Kepala Sekolah</p>
         </div>
         <div className="flex justify-center">
            <div className="w-1.5 h-8 bg-whiteprime rounded-full"></div>
         </div>
         <div className="mx-auto p-4 bg-gradient-to-r from-rose-300 to-rose-500 w-3/4 sm:w-1/2 md:w-1/4 h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
            <h1 className="text-blue-900 font-extrabold">{wakilKepalaSekolah.nama}</h1>
            <hr className="text-blue-900" />
            <p className="text-emerald-900 font-bold">Wakil Kepala Sekolah</p>
         </div>
         <div className="flex justify-center">
            <div className="w-1.5 h-8 bg-whiteprime rounded-full"></div>
         </div>
         <div className="mx-auto px-4 py-2 bg-whiteprime text-blue-900 font-semibold rounded-full">Tim Administrasi</div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
            <div className="mx-auto p-4 bg-gradient-to-r from-amber-300 to-amber-500 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
               <h1 className="text-blue-900 font-extrabold">{pengurusBarang.nama}</h1>
               <hr className="text-blue-900" />
               <p className="text-emerald-900 font-bold">Pengurus Barang</p>
            </div>
            {tenagaAdministrasi.map((item) => {
               return (
                  <div className="mx-auto p-4 bg-gradient-to-r from-amber-300 to-amber-500 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                     <h1 className="text-blue-900 font-extrabold">{item.nama}</h1>
                     <hr className="text-blue-900" />
                     <p className="text-emerald-900 font-bold">Tenaga Administrasi</p>
                  </div>
               )
            })}
            <div className="mx-auto p-4 bg-gradient-to-r from-amber-300 to-amber-500 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
               <h1 className="text-blue-900 font-extrabold">{bendahara.nama}</h1>
               <hr className="text-blue-900" />
               <p className="text-emerald-900 font-bold">Bendahara</p>
            </div>
         </div>
         {/* GURU KELAS */}
         <div className="mx-auto px-4 py-2 bg-whiteprime text-blue-900 font-semibold rounded-full">Guru Kelas</div>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-4">
            <div className="flex flex-col gap-4">
               <h1>Kelas I</h1>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasIA.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas I A</p>
               </div>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasIB.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas I B</p>
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <h1>Kelas II</h1>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasIIA.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas II A</p>
               </div>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasIIB.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas II B</p>
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <h1>Kelas III</h1>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasIIIA.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas III A</p>
               </div>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasIIIB.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas III B</p>
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <h1>Kelas IV</h1>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasIVA.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas IV A</p>
               </div>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasIVB.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas IV B</p>
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <h1>Kelas V</h1>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasVA.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas V A</p>
               </div>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasVB.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas V B</p>
               </div>
            </div>
            <div className="flex flex-col gap-4">
               <h1>Kelas VI</h1>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasVIA.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas VI A</p>
               </div>
               <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] lg:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                  <h1 className="text-blue-900 font-extrabold">{guruKelasVIB.nama}</h1>
                  <hr className="text-blue-900" />
                  <p className="text-emerald-900 font-bold">Guru Kelas VI B</p>
               </div>
            </div>
         </div>
         {/* GURU MATA PELAJARAN */}
         <div className="mx-auto px-4 py-2 bg-whiteprime text-blue-900 font-semibold rounded-full">Guru Mata Pelajaran</div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
            {guruPJOK.map((item) => {
               return (
                  <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                     <h1 className="text-blue-900 font-extrabold">{item.nama}</h1>
                     <hr className="text-blue-900" />
                     <p className="text-emerald-900 font-bold">Guru PJOK</p>
                  </div>
               )
            })}
            {guruPAI.map((item) => {
               return (
                  <div className="mx-auto p-4 bg-gradient-to-r from-emerald-300 to-emerald-500 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
                     <h1 className="text-blue-900 font-extrabold">{item.nama}</h1>
                     <hr className="text-blue-900" />
                     <p className="text-emerald-900 font-bold">Guru PAI</p>
                  </div>
               )
            })}
         </div>
         {/* TENAGA PENDUKUNG */}
         <div className="mx-auto px-4 py-2 bg-whiteprime text-blue-900 font-semibold rounded-full">Tenaga Pendukung</div>
         <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-4 w-[80%]">
            <div className="mx-auto p-4 bg-gradient-to-r from-amber-300 to-amber-500 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
               <h1 className="text-blue-900 font-extrabold">{penjagaSekolah.nama}</h1>
               <hr className="text-blue-900" />
               <p className="text-emerald-900 font-bold">Penjaga Sekolah</p>
            </div>
            <div className="mx-auto p-4 bg-gradient-to-r from-amber-300 to-amber-500 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
               <h1 className="text-blue-900 font-extrabold">{tenagaKebersihan.nama}</h1>
               <hr className="text-blue-900" />
               <p className="text-emerald-900 font-bold">Tenaga Kebersihan</p>
            </div>
            <div className="mx-auto p-4 bg-gradient-to-r from-amber-300 to-amber-500 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
               <h1 className="text-blue-900 font-extrabold">{tenagaSatpam.nama}</h1>
               <hr className="text-blue-900" />
               <p className="text-emerald-900 font-bold">Tenaga Satpam</p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
            <div></div>
            <div className="mx-auto p-4 bg-gradient-to-r from-orange-400 to-orange-600 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
               <h1 className="text-blue-900 font-extrabold">SISWA-SISWI</h1>
               <hr className="text-blue-900" />
               <p className="text-emerald-900 font-bold">Peserta Didik</p>
            </div>
            <div className="mx-auto p-4 bg-gradient-to-r from-orange-400 to-orange-600 w-[80%] sm:w-[60%] md:w-full h-auto rounded-lg hover:scale-105 transition-all duration-300 ease-in-out">
               <h1 className="text-blue-900 font-extrabold">WARGA SEKITAR</h1>
               <hr className="text-blue-900" />
               <p className="text-emerald-900 font-bold">Masyarakat</p>
            </div>
            <div></div>
         </div>
         <div className="flex flex-col border mt-6 w-[80%] p-4 gap-y-4 h-auto mx-auto rounded-lg bg-white">
            <h1 className="font-semibold text-lg text-mainblue">Keterangan Warna</h1>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-xs">
               <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 py-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-900 mx-auto "></div>
                  <h2 className="text-blue-900">Pimpinan</h2>
               </div>
               <div className="bg-gradient-to-r from-rose-300 to-rose-500 py-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-900 mx-auto "></div>
                  <h2 className="text-blue-900">Wakil</h2>
               </div>
               <div className="bg-gradient-to-r from-emerald-300 to-emerald-500 py-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-900 mx-auto "></div>
                  <h2 className="text-blue-900">Guru</h2>
               </div>
               <div className="bg-gradient-to-r from-amber-300 to-amber-500 py-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-900 mx-auto "></div>
                  <h2 className="text-blue-900">T. Pendukung</h2>
               </div>
               <div className="bg-gradient-to-r from-lime-300 to-lime-500 py-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-900 mx-auto "></div>
                  <h2 className="text-blue-900">Komite</h2>
               </div>
               <div className="bg-gradient-to-r from-orange-400 to-orange-600 py-2 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-900 mx-auto "></div>
                  <h2 className="text-blue-900">Komunitas</h2>
               </div>
            </div>
         </div>
      </div>
      </div>
    </>

  ) 
}