export default function LogoSD({titlePage, isTitlePage}){
   return (
      <div className={`
      ${isTitlePage ? "flex justify-center scrolled-header p-4 rounded-b-4xl w-full pt-24" : ""}
      `}>
         <div className='flex content-center items-center my-auto gap-2'>
            { titlePage ? '' 
            : <img src="/assets/image/logo-kawan-belajar-bged.png" alt="Logo Kawan Belajar" className='w-auto h-8' />}
            <h1 className="text-xl font-medium font-jakarta">
               <span className='text-whiteprime mr-1'>{titlePage}</span>
               <span className='text-primaryoren font-bold'>SDN</span>
               <span className='text-whiteprime ml-1'>Ragunan 14 Pagi</span>
            </h1>
         </div>
      </div>
   )
}