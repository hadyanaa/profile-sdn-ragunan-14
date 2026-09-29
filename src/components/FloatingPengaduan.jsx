import { useState, useRef, useEffect } from 'react';

const pengaduanLinks = [
  {
    label: 'Form Pengaduan',
    description: 'Sampaikan pengaduan di lingkungan SDN Ragunan 14 Pagi',
    url: 'https://forms.gle/uSiygxPbuccWa6vT7',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  // Tambahkan pilihan lain di sini nanti, contoh:
  // {
  //   label: 'Hubungi Sekolah',
  //   description: 'Chat langsung via WhatsApp',
  //   url: 'https://wa.me/628xxxx',
  //   icon: <svg>...</svg>,
  // },
];

export default function FloatingPengaduan() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Tutup card ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup Card */}
      <div
        className={`
          bg-white rounded-2xl shadow-2xl ring-1 ring-black/5
          w-[300px] sm:w-[340px]
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
          }
        `}
      >
        {/* Header Card */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-mainblue/10 flex items-center justify-center text-mainblue">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 leading-tight">Pengaduan</h3>
              <p className="text-[11px] text-slate-400">SDN Ragunan 14 Pagi</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-5 border-t border-slate-100"></div>

        {/* Links */}
        <div className="p-3">
          {pengaduanLinks.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-mainblue/5 transition-colors duration-200 group no-underline"
            >
              <div className="w-10 h-10 rounded-lg bg-mainblue/10 text-mainblue flex items-center justify-center flex-shrink-0 group-hover:bg-mainblue group-hover:text-white transition-colors duration-200">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700 group-hover:text-mainblue transition-colors leading-tight">
                  {item.label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-300 group-hover:text-mainblue mt-1 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Pengaduan"
        className={`
          group relative w-14 h-14 rounded-full
          bg-mainblue text-white
          shadow-lg shadow-blue-900/30
          hover:shadow-xl hover:shadow-blue-900/40
          hover:scale-105 active:scale-95
          transition-all duration-300 ease-out
          cursor-pointer border-none
          flex items-center justify-center
        `}
      >
        {/* Icon: megaphone / exclamation saat tertutup, X saat terbuka */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Pulse animation ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-mainblue/40 animate-ping pointer-events-none" style={{ animationDuration: '2s' }}></span>
        )}
      </button>
    </div>
  );
}
