export default function convertDriveUrl(url, type) {
  if (!url) return null;

  // Ambil fileId
  let regex = /\/d\/([a-zA-Z0-9_-]+)\//;
  let match = url.match(regex);

  if (!match) {
    regex = /[?&]id=([a-zA-Z0-9_-]+)/;
    match = url.match(regex);
  }

  if (!match || !match[1]) return null;

  const fileId = match[1];

  // Ambil ekstensi file (jika ada di URL)
  const extensionMatch = url.match(/\.([a-zA-Z0-9]+)(\?|$)/);
  const ext = extensionMatch ? extensionMatch[1].toLowerCase() : "";

  // Kalau user kasih type manual → ikuti
  if (type === "preview") {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  if (type === "download") {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  if (type === "thumbnail") {
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  }

  // Auto detect
  if (ext === "pdf") {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  }

  // Fallback default
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
