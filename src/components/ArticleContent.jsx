import { Box, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogContent, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ModalDetail from "./ModalDetail";
import convertDriveUrl from "../functions/DriveImage";
import ParagraphDivider from "../functions/ParagraphContent";

const ArticleContent = () => {
  const [data, setData] = useState([]);
  console.log(data)

  const [selectedArticle, setSelectedArticle] = useState(null);
  const openModal = (article) => {
    setSelectedArticle(article);
  }

  useEffect(() => {
    fetch("https://script.google.com/macros/s/AKfycbycOICEi7KSaZirIZVBXomzhPu6JVKdDgahXlGPDDuKqR-MVST8-vbtFwp9GxNFRnxN/exec")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="my-8">
      <div className="grid grid-cols-4 gap-4">
        {data.length > 0 ?
        data.map((row, idx) => {
          const imgSrc = convertDriveUrl(row.url_image);
          return (
            <Card 
              key={idx} 
              sx={{
                backgroundImage: "url(/assets/image/pattern.png)",
                backgroundColor: "#098fd1",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1) !important"
              }}
            >
              <CardActionArea onClick={() => openModal(row)}>
                <img src={imgSrc} className="h-40 object-cover mx-auto" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div"
                    sx={{ 
                      color: 'var(--color-secondary)',
                    }}
                  >
                    {row.judul}
                  </Typography>
                  <Typography className="truncate-multiline-2"
                  variant="body2"
                  sx={{ 
                    color: 'var(--color-whiteprime)',
                  }}
                  >
                    <ParagraphDivider text={row.content} />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )}
        ) :
        Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col p-4 items-center"
          >
            <Skeleton animation="wave" variant="overlay">
              <img
                className="rounded-lg w-auto h-40"
                alt=""
                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              />
            </Skeleton>
          </div>
        ))
        }
      </div>
      <ModalDetail
        selectedItem={selectedArticle}
        artikel
      />
    </div>
  );
};

export default ArticleContent;
