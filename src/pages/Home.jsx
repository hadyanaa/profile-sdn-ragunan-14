import { useEffect, useState } from "react";
import PreviewPage from "../components/PreviewPage";

function Home() {
  const [ListGuru, setListGuru] = useState([]);

  useEffect(() => {
    fetch('/api/data-guru.json')
      .then(res => res.json())
      .then(data => setListGuru(data))
      .catch(err => console.error("Gagal mengambil data:", err));
  }, []);
  return(
    <>
      <section id="top">
        <div className="max-h-screen overflow-hidden mb-7 -m-6">
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
        title="Staf Guru" 
        desc="Staf guru pada SDN Ragunan 14 Pagi"
        items={ListGuru}
      />
      <PreviewPage 
        title="Staf Tenaga Kependidikan" 
        desc="Staf tenaga kependidikan pada SDN Ragunan 14 Pagi"
      />
      <div>

      </div>
    
    </>

  );
};
export default Home;