import { Button } from "@mui/material";

export default function PreviewPage({ title, desc, items = [], pattern, drive }) {

  const convertDriveUrl = (url) => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = url.match(regex);
    return match && match[1]
    ? `https://drive.google.com/thumbnail?id=${match[1]}`
    : null;
  };

  return (
    <div className={`px-28 py-8 ${pattern ? "bg-[url(/assets/image/pattern.png)] bg-main" : ""}`}>
      <div className={`flex flex-row justify-between font-jakarta mb-4 ${pattern ? "text-primaryoren" : ""}`}>
        <div>
          <h1 className="font-bold text-xl">{title}</h1>
          <h3 className={`${pattern ? "text-whiteprime" : "text-gray-600"}`}>{desc}</h3>
        </div>
        <Button variant="contained" size="small">
          Lihat Selengkapnya
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 border items-center rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            <img className="rounded-lg w-auto h-80" src={drive ? convertDriveUrl(item.url_image) : item.url_image} alt={"foto " + item.nama} />
            <h4 className="font-semibold text-lg">{drive ? item.judul : item.nama}</h4>
            <p className="text-sm text-gray-500">{drive ? item.category : item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
