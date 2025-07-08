import ArticleContent from "../components/ArticleContent";
import LogoSD from "../components/LogoSD";
// import InstagramFeed from "../components/InstagramFeed";

export default function Artikel() {
  return(
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center bg-secondblue p-4 rounded-lg w-full pt-20">
          <LogoSD titlePage="Artikel" />
        </div>
        <div className="px-28">
          <ArticleContent />
        </div>
      </div>
    </>

  ) 
}