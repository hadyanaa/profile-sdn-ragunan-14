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
  title == "Staf Guru" ? "/profile/staf-guru" : "/profile/staf-tendik"

  return (
    <div className={`px-28 py-8 ${pattern ? "bg-[url(/assets/image/pattern.png)] bg-secondblue" : ""}`}>
      <div className={`flex flex-row justify-between font-jakarta mb-4 ${pattern ? "text-primaryoren" : ""}`}>
        <div>
          <h1 className="font-bold text-xl">{title}</h1>
          <h3 className={`${pattern ? "text-whiteprime" : "text-gray-600"}`}>{desc}</h3>
        </div>
        <Link to={`${LinkSelengkapnya}`}>
          <Button variant="contained" size="small">
            Lihat Selengkapnya
          </Button>
        </Link>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.length > 0 ?
        items.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 items-center"
          >
            <img className="rounded-lg w-auto h-80" src={drive ? convertDriveUrl(item.url_image) : item.url_image} alt={"foto " + item.nama} />
            <h4 className={`font-semibold text-lg mt-4 ${pattern ? "text-secondary" : ''}`}>{drive ? item.judul : item.nama}</h4>
            <p className={`text-sm ${pattern ? "text-whiteprime" : 'text-gray-500'}`}>{drive ? item.category : item.status}</p>
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
                className="rounded-lg w-auto h-80"
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
