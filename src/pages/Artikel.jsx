import ArticleContent from "../components/ArticleContent";
import LogoSD from "../components/LogoSD";
// import InstagramFeed from "../components/InstagramFeed";

export default function Artikel() {
  return(
    <>
      <div className="flex flex-col gap-4">
        <LogoSD titlePage="Artikel" isTitlePage />
        <div className="px-28">
          <ArticleContent />
        </div>
      </div>
    </>

  ) 
}