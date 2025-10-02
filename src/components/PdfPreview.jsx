import convertDriveUrl from "../functions/DriveImage";

export default function PDFViewer({ fileId, height = "600px" }) {
   let previewUrl = convertDriveUrl(fileId, "preview")
   let downloadUrl = convertDriveUrl(fileId, "download")

  return (
   <div className="w-full h-[600px] border rounded-lg overflow-hidden flex flex-col">
      {/* Toolbar */}
      <div className="flex justify-end p-2 bg-[url(/assets/image/pattern.png)] bg-secondblue border-b">
      <a
         href={downloadUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="px-3 py-1 text-sm bg-blue-700 text-white rounded hover:bg-blue-800"
      >
         Download
      </a>
      </div>

      {/* PDF Preview */}
      <iframe src={previewUrl} className="flex-1 w-full h-full" allow="autoplay" />
   </div>
  );
}

export function DownloadPdf({ fileId, }) {
   let srcPdf = convertDriveUrl(fileId, "download")
   return(
      <div>
         <a href={srcPdf}>
            Download
         </a>
      </div>
   )
}
