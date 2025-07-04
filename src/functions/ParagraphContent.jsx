export default function ParagraphDivider({text}){
   if (typeof text !== "string") return null;
   const paragraphs = text?.split('\n')
   return paragraphs.map((para,index) => (
      <>
      <p key={index}>{para}</p> <br />
      </>
   ))
}