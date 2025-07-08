import LogoSD from "../../components/LogoSD";

export default function VisiMisi() {
  return(
    <>
      <LogoSD titlePage="Visi Misi" isTitlePage />
      <div className="flex flex-col gap-8 px-28 font-jakarta">
        <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mt-8 w-full p-8 bg-[url(/assets/image/pattern.png)]">
          <h1 className="font-bold text-2xl">VISI</h1>
          <p>
          Terwujudnya peserta didik yang Berakhlak Mulia, Berprestasi, Berkarakter dan Peduli Lingkungan.
          </p>
        </div>
        <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto w-full p-8 bg-[url(/assets/image/pattern.png)]">
          <h1 className="font-bold text-2xl">MISI</h1>
          <ol type="1">
          <li>Membiasakan siswa untuk melaksanakan ajaran agama sesuai keyakinannya, memperingati hari keagamaan</li>
          <li>Mencapai Lulusan 100% Negeri</li>
          <li>Mengikuti ajang prestasi berjenjang;</li>
          <li>Mengoptimalkan potensi ekskul melalui lomba berjenjang;</li>
          <li>Membiasakan siswa melakukan 5 S (Salam, Sapa, Senyum, Sopan, Santun);</li>
          <li>Membiasakan siswa melakukan PSN, Jumantik, Operasi Semut.</li>
          </ol>
        </div>
        <div className="bg-secondblue rounded-lg text-center text-whiteprime mx-auto mb-8 w-full p-8 bg-[url(/assets/image/pattern.png)]">
          <h1 className="font-bold text-2xl">KURIKULUM MERDEKA</h1>
          <p>
          Kurikulum Merdeka memiliki tujuan untuk mewujudkan
pembelajaran yang bermakna dan efektif dalam meningkatkan
keimanan, ketakwaan kepada Tuhan Yang Maha Esa, dan akhlak
mulia serta menumbuhkembangkan cipta, rasa, dan karsa Peserta
Didik sebagai pelajar sepanjang hayat yang berkarakter Pancasila.
          </p>
        </div>
      </div>
    </>

  ) 
}