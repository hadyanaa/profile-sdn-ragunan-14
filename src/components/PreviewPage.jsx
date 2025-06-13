export default function PreviewPage({ title, desc, items = [], pattern }) {
  return (
    <div className={`px-28 py-8 ${pattern ? "bg-[url(/assets/image/pattern.png)] bg-main" : ""}`}>
      <div className={`flex flex-row justify-between font-jakarta mb-4 ${pattern ? "text-primaryoren" : ""}`}>
        <div>
          <h1 className="font-bold text-xl">{title}</h1>
          <h3 className={`${pattern ? "text-whiteprime" : "text-gray-600"}`}>{desc}</h3>
        </div>
        <div className="text-blue-600 cursor-pointer hover:underline">
          Lihat Selengkapnya
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {items.slice(0, 4).map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-4 border items-center rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            <img className="rounded-lg w-auto h-80" src={item.url_foto} alt={"foto " + item.nama} />
            <h4 className="font-semibold text-lg">{item.nama}</h4>
            <p className="text-sm text-gray-500">{item.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
