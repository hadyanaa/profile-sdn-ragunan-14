import { useEffect, useState } from "react";

const ArticleContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <table border="1">
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleContent;
