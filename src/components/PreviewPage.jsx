import { Button, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";

export default function PreviewPage({ title, desc, items = [], pattern, drive }) {

  const convertDriveUrl = (url) => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = url.match(regex);
    return match && match[1]
    ? `https://drive.google.com/thumbnail?id=${match[1]}`
    : null;
  };

  const LinkSelengkapnya = title == "Artikel" ? "/artikel" :
  title == "Staf Guru" ? "/profile/staf-guru" : "/profile/sdm-sekolah"

  return (
    <div className={pattern ? "panel-card-blue my-8" : "panel-card my-8"}>
      <div className="mb-6 flex flex-row justify-between gap-4 font-jakarta">
        <div>
          <h1 className={pattern ? "text-base font-extrabold text-white lg:text-xl" : "panel-title"}>{title}</h1>
          <h3 className={pattern ? "text-xs font-medium leading-6 text-white/80 lg:text-base" : "panel-subtitle"}>{desc}</h3>
        </div>
        <Link to={`${LinkSelengkapnya}`}>
          <Button className="text-xs font-light lg:font-semibold lg:text-lg" variant="contained" size="small">
            Lihat Selengkapnya
          </Button>
        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.length > 0 ?
        items.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className={pattern ? "rounded-lg border border-white/15 bg-white/10 p-4 text-center transition duration-200 hover:-translate-y-1" : "info-card flex flex-col p-4 items-center"}
          >
            <img className="rounded-lg w-auto h-auto" src={drive ? convertDriveUrl(item.url_image) : item.url_image} alt={"foto " + item.nama} />
            <h4 className={`font-semibold text-lg mt-4 ${pattern ? "text-white" : 'text-mainblue'}`}>{drive ? item.judul : item.nama}</h4>
            <p className={`text-sm ${pattern ? "text-white/80" : 'text-gray-500'}`}>{drive ? item.category : item.status}</p>
          </div>
        ))
        :
        Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col p-4 items-center"
          >
            <Skeleton animation="wave" variant="overlay">
              <img
                className="rounded-lg w-auto h-auto"
                alt=""
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              />
            </Skeleton>
            <h4 className={`font-semibold text-lg mt-4 ${pattern ? "text-secondary" : ''}`}></h4>
            <p className={`text-sm ${pattern ? "text-whiteprime" : 'text-gray-500'}`}></p>
          </div>
        ))
      }
      </div>
    </div>
  );
}
