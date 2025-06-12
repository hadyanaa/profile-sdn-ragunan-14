import ArticleContent from "../components/ArticleContent";
import InstagramFeed from "../components/InstagramFeed";

export default function Artikel() {
  return(
    <>
      <div className="flex flex-col gap-4 px-28">
        <InstagramFeed username="sdnragunan14" />
        <ArticleContent />
      </div>
    </>

  ) 
}