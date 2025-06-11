import { useEffect, useState } from 'react';

export default function InstagramFeed({ username }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`/api/ig/${username}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [username]);

  if (!data) return <p>Loading Instagram profile…</p>;
  if (data.error) return <p>Error: {data.error}</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={data.profilePic}
          alt={data.fullName}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="font-bold">{data.username}</h2>
          <p className="text-sm text-gray-600">{data.fullName}</p>
        </div>
      </div>
      <p className="mb-4 text-gray-700">{data.bio}</p>
      <div className="grid grid-cols-3 gap-2">
        {data.media.slice(0, 6).map(item => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={item.thumbnail}
              alt=""
              className="w-full h-full object-cover"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
