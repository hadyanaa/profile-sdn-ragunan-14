import { Box, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ListPengumuman = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  console.log(data);

  const convertDriveUrl = (url) => {
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = url.match(regex);
    return match && match[1]
    ? `https://drive.google.com/thumbnail?id=${match[1]}`
    : null;
  };

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbyUa3X4iUR4VTK9COpDchzOIE7xRla9nov8Y-qTW1s3a7VRBh9Z7q6Ex-K8NcV_8Ltz/exec")
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
    <div className="my-8">
      <div className="grid grid-cols-4 gap-4">
        {data.map((row, idx) => {
          const imgSrc = convertDriveUrl(row.url_image);
          return (
            <Card key={idx}>
              <CardActionArea onClick={handleOpen}>
                {/* <CardMedia
                component="img"
                image={imgSrc}
                sx={{ height: 150, objectFit: 'cover'}}
                /> */}
                <img src={imgSrc} className="h-40 object-cover mx-auto" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {row.judul}
                  </Typography>
                  <Typography className="truncate-multiline-2"
                  variant="body2"
                  sx={{ 
                    color: 'text.secondary',

                  }}
                  >
                    {row.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        )}
      </div>
    </div>
  );
};

export default ListPengumuman;
