import ArticleContent from "../components/ArticleContent";
import LogoSD from "../components/LogoSD";
// import InstagramFeed from "../components/InstagramFeed";

export default function Artikel() {
  return(
    <>
      <div className="flex flex-col gap-4 px-28">
        <div className="flex justify-center bg-secondblue bg-[url(/assets/image/pattern.png)] p-4 rounded-lg w-full mt-8">
          <LogoSD titlePage="Artikel" />
        </div>
        <ArticleContent />
      </div>
    </>

  ) 
}