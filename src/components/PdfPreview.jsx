import convertDriveUrl from "../functions/DriveImage";

export default function PDFViewer({ fileId, height = "600px" }) {
   let previewUrl = convertDriveUrl(fileId, "preview")
   let downloadUrl = convertDriveUrl(fileId, "download")

  return (
   <div className="flex w-full flex-col overflow-hidden rounded-lg border border-mainblue/10 bg-white shadow-[0_16px_42px_rgba(8,57,115,0.08)]" style={{ height }}>
      {/* Toolbar */}
      <div className="flex justify-end border-b border-mainblue/10 bg-mainblue/5 p-2">
      <a
         href={downloadUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="brand-button brand-button--compact !min-h-9"
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
