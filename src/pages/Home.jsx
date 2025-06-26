import { useEffect, useState } from "react";
import PreviewPage from "../components/PreviewPage";

function Home() {
  const [dataArtikel, setDataArtikel] = useState([]);
  const [dataAgenda, setDataAgenda] = useState([]);
  const [dataPengumuman, setDataPengumuman] = useState([]);
  const [ListGuru, setListGuru] = useState([]);
  const [ListTendik, setListTendik] = useState([]);

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

  return(
    <>
      <section id="top">
        <div className="max-h-screen overflow-hidden mb-7">
          <video autoPlay muted loop
            className="h-screen w-screen object-cover opacity-80 -mt-12"
          >
            <source src="assets/video/video-profile.mp4" type="video/mp4"></source>
          </video>
        </div>
      </section>
      <section id="why" className="bg-">
        <div className="bg ">

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
      <PreviewPage 
        title="Agenda" 
        desc="List Agenda SDN Ragunan 14 Pagi"
        items={dataAgenda}
        pattern
      />
      <PreviewPage 
        title="Pengumuman" 
        desc="List Pengumuman SDN Ragunan 14 Pagi"
        items={dataPengumuman}
      />
      <div>

      </div>
    
    </>

  );
};
export default Home;