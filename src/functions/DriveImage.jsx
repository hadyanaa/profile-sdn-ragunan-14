export default function convertDriveUrl(url) {
  if (!url) return null; // atau return fallback image

  let regex = /\/d\/([a-zA-Z0-9_-]+)\//;
  let match = url.match(regex);
  if (!match) {
    regex = /[?&]id=([a-zA-Z0-9_-]+)/;
    match = url.match(regex);
  }
  return match && match[1]
    ? `https://drive.google.com/thumbnail?id=${match[1]}`
    : null;
}