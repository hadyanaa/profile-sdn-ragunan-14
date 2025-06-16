import { useEffect, useState } from "react";

const ArticleContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data);

  const convertDriveUrl = (url) => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = url.match(regex);
    return match && match[1]
    ? `https://drive.google.com/thumbnail?id=${match[1]}`
    : null;
  };

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbw-Lfh15xbIRmQGYnZpLnsuiFiG8FfLgMBfjkCBV-Ed5yjcKj6L6MOq17OwRdxd4l1T8g/exec")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Data dari Google Sheet</h1>
      <div className="grid grid-cols-4 gap-4">
        {data.map((row, idx) => {
          const imgSrc = convertDriveUrl(row.url_image);
          return (
            <div className="flex flex-col p-4 border-2" key={idx}>
              <h1>{row.judul}</h1>
              <img src={imgSrc} alt={"gambar " + row.judul} width={100} />
            </div>
          )}
        )}
      </div>
    </div>
  );
};

export default ArticleContent;
