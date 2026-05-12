export default function LogoSD({titlePage, isTitlePage}){
   return (
      <div className={isTitlePage ? "page-hero" : ""}>
         <div className={isTitlePage ? "page-hero-inner" : "flex content-center items-center my-auto gap-2"}>
            { titlePage ? '' 
            : <img src="/assets/image/logo-kawan-belajar-bged.png" alt="Logo Kawan Belajar" className='w-auto h-8' />}
            <p className={isTitlePage ? "section-eyebrow !mb-0 !text-primaryoren" : "hidden"}>
               SDN Ragunan 14 Pagi
            </p>
            <h1 className={isTitlePage ? "page-hero-title" : "text-lg md:text-xl font-medium text-center font-jakarta"}>
               <span className={isTitlePage ? "" : "text-whiteprime mr-1"}>{titlePage}</span>
               {!isTitlePage ? <span className='text-primaryoren font-bold'>SDN</span> : null}
               {!isTitlePage ? <span className='text-whiteprime ml-1'>Ragunan 14 Pagi</span> : null}
            </h1>
         </div>
      </div>
   )
}
